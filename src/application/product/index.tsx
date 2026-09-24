import { useEffect, useRef, useState, useCallback, type FC } from "react";
import { useTranslation } from "next-i18next/pages";
import { Grid } from "@/components/grid/grid.styles";
import { Styled } from "./styles";
import BreadCrumbs from "@/components/common/BreadCrumbs";
import Icon from "@/components/common/Icon";
import { BuyComponent } from "./buy/buyComponent";
import { ProductPaginator } from "./paginator";
import { IProductData } from "@/services/models/product/productData";
import { useAppNotificationStore } from "@/components/common/Notification/stores/appNotificationStoreProvider";
import { ProductGallery } from "./productGallery";
import { ProductInfo } from "./productInfo/productInfo";
import LazyHydrate from "@/components/common/LazyHydrate";
import Spinner from "@/components/common/Spinner";
import { useMainStore } from "@/contexts/mainStoreProvider";
import { AddToFavoriteComponent } from "./addToFavorite/addToFavoriteComponent";
import { useRouter } from "next/router";
import { IAddToCartRequest } from "@/services/models/cart/addToCartRequest";
import { UpdateCartStatusEnum } from "@/services/models/cart/updateCartStatusEnum";
import { postData } from "@/utils/api/apiAxious";
import { MobileAddToCart } from "./mobileAddToCart/mobileAddToCart";

const viewedKey = "viewed";

export interface ProductIndexProps {
    productData: IProductData;
}

export const ProductIndex: FC<ProductIndexProps> = ({ productData }) => {
    const { t } = useTranslation(["product", "common"]);
    const { isMobile } = useMainStore((state) => state);
    const { addNotification } = useAppNotificationStore((state) => state);
    const [isLoading, setIsLoading] = useState(false);
    const descriptionRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();
    const { isAuthValid } = useMainStore((state) => state);
    const { getDynamicInfo } = useMainStore((state) => state);

    useEffect(() => {
        if (productData) {
            const id = productData.product.productId;

            let newViewed: number[] = [];
            const item = window.localStorage.getItem(viewedKey);
            if (item !== null) {
                const valueFromStorage = JSON.parse(item) as number[];
                if (!valueFromStorage.includes(id)) {
                    newViewed = [id, ...valueFromStorage];
                } else {
                    newViewed = [id, ...valueFromStorage.filter((p) => p !== id)];
                }
            } else {
                newViewed = [id];
            }

            window.localStorage.setItem(viewedKey, JSON.stringify(newViewed.slice(0, 8)));
        }
    }, [productData]);

    const addToCart = useCallback(
        async (request: IAddToCartRequest) => {
            try {
                setIsLoading(true);

                const result: UpdateCartStatusEnum = await postData<UpdateCartStatusEnum>("/cart/", request);
                return result;
            } finally {
                setIsLoading(false);
            }
        },
        [setIsLoading]
    );

    const onBuyBtnClick = useCallback(
        (oneClickBuying: boolean) => {
            if (!isAuthValid) {
                router.push(`/login?redirect=${encodeURIComponent(router.asPath)}`);
                return;
            }

            const request: IAddToCartRequest = {
                productId: productData.product.productId,
                quantity: 1,
                oneClickBuying: oneClickBuying,
            };

            addToCart(request)
                .then((result) => {
                    if (result === UpdateCartStatusEnum.InternalError || result === UpdateCartStatusEnum.OutdatedData) {
                        addNotification(t("errors.common", { ns: "common" }), "error");
                    } else {
                        if (oneClickBuying) {
                            router.push(`/gocheckout`);
                        } else {
                            getDynamicInfo();
                        }
                    }
                })
                .catch((error) => {
                    console.error("Error adding to cart:", error);
                    addNotification(t("errors.common", { ns: "common" }), "error");
                });
        },
        [addNotification, addToCart, getDynamicInfo, isAuthValid, productData.product.productId, router, t]
    );

    if (productData == null) {
        return null;
    }

    const product = productData.product;

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(product.productId.toString());
        addNotification(t("productIdCopied"), "success");
    };

    const handleLinkCopyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href);
        addNotification(t("productLinkCopied"), "success");
    };

    const goToDescription = () => {
        if (descriptionRef.current) {
            window.scrollTo({ left: 0, top: descriptionRef.current.offsetTop - 64, behavior: "smooth" });
        }
    };

    return (
        <>
            {isLoading && <Spinner full />}
            <Grid.Container $isMobile={isMobile}>
                <Grid.Row>
                    <Grid.Column>
                        <Styled.PageTopRowContainer $isMobile={isMobile}>
                            <Styled.PageTopRowWrapper $isMobile={isMobile}>
                                <Styled.TopColumnContainer $isMobile={isMobile}>
                                    <BreadCrumbs
                                        first={{
                                            link: productData.category.parent!.url,
                                            title: productData.category.parent!.title,
                                        }}
                                        second={
                                            productData.category.parent?.parent
                                                ? {
                                                      link: productData.category.parent?.parent.url,
                                                      title: productData.category.parent?.parent.title,
                                                  }
                                                : undefined
                                        }
                                    />
                                </Styled.TopColumnContainer>
                                <Styled.ShareActionsContainer $isMobile={isMobile}>
                                    <Styled.ShareActionBtn onClick={handleCopyToClipboard}>
                                        <Icon
                                            icon="copy-buffer"
                                            width={16}
                                            height={16}
                                            className={
                                                "text-[rgba(0,26,52,0.4)] mr-[8px] shrink-0 antialiased cursor-pointer text-inherit font-inherit whitespace-nowrap"
                                            }
                                            viewBox="0 0 16 16"
                                        />
                                        <Styled.ShareActionBtnTitle className="tsBodyControl400Small">{`${t("productNumberTitle")}${product?.productId}`}</Styled.ShareActionBtnTitle>
                                    </Styled.ShareActionBtn>
                                    <Styled.ShareBtnContainer>
                                        <Styled.ShareActionBtn onClick={handleLinkCopyToClipboard}>
                                            <Icon
                                                icon="share"
                                                size={16}
                                                className={
                                                    "text-[rgba(0,26,52,0.4)] mr-[8px] shrink-0 antialiased cursor-pointer text-inherit font-inherit whitespace-nowrap"
                                                }
                                                viewBox="0 0 16 16"
                                            ></Icon>
                                            <Styled.ShareActionBtnTitle className="tsBodyControl400Small">
                                                {t("share")}
                                            </Styled.ShareActionBtnTitle>
                                        </Styled.ShareActionBtn>
                                    </Styled.ShareBtnContainer>
                                    {isMobile && (
                                        <Styled.ShareBtnContainer>
                                            <AddToFavoriteComponent productId={product.productId} />
                                        </Styled.ShareBtnContainer>
                                    )}
                                </Styled.ShareActionsContainer>
                            </Styled.PageTopRowWrapper>
                        </Styled.PageTopRowContainer>
                    </Grid.Column>
                </Grid.Row>
                <Styled.ProductContainer>
                    <Styled.ProductInfoContainer $isMobile={isMobile}>
                        <Grid.Row>
                            <Styled.ProductVisualInfoColumn $isMobile={isMobile}>
                                <ProductGallery product={product} />
                            </Styled.ProductVisualInfoColumn>
                            <Grid.Column>
                                <ProductInfo productData={productData} goToDescription={goToDescription} />
                            </Grid.Column>
                        </Grid.Row>
                    </Styled.ProductInfoContainer>
                    {!isMobile && <BuyComponent product={product} onBuyBtnClick={onBuyBtnClick} />}
                </Styled.ProductContainer>
            </Grid.Container>
            <Grid.Container $isMobile={isMobile}>
                <Grid.Row>
                    <Grid.Column>
                        <Styled.ShortDescriptionContainer ref={descriptionRef}>
                            <Styled.ShortDescriptionWrapper>
                                <div>
                                    <Styled.ShortDescriptionHdrRow>
                                        <Styled.ShortDescriptionHdrTitle>
                                            {t("descriptionHeader")}
                                        </Styled.ShortDescriptionHdrTitle>
                                    </Styled.ShortDescriptionHdrRow>
                                    <Styled.ShortDescriptionContantRow>
                                        <Styled.ShortDescriptionContant>
                                            {product.userFeatures?.description}
                                        </Styled.ShortDescriptionContant>
                                    </Styled.ShortDescriptionContantRow>
                                </div>
                            </Styled.ShortDescriptionWrapper>
                        </Styled.ShortDescriptionContainer>
                    </Grid.Column>
                </Grid.Row>
            </Grid.Container>
            {isMobile && <MobileAddToCart onBuyBtnClick={onBuyBtnClick} />}
            <LazyHydrate whenIdle>{<ProductPaginator product={productData.product} />}</LazyHydrate>
        </>
    );
};
