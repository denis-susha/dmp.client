import { useState, type FC } from "react";
import { useTranslation } from "next-i18next/pages";
import { Styled } from "./styles";
import Icon from "@/components/common/Icon";
import styles from "../../../styles/font-styles.module.css";
import { useRouter } from "next/router";
import { appConfig } from "@/appConfig";
import { Constants } from "@/application/constants";
import { IProduct } from "@/services/models/product/product";
import { useMainStore } from "@/contexts/mainStoreProvider";
import { IAddToCartRequest } from "@/services/models/cart/addToCartRequest";
import { postData } from "@/utils/api/apiAxious";
import { UpdateCartStatusEnum } from "@/services/models/cart/updateCartStatusEnum";
import { useAppNotificationStore } from "@/components/common/Notification/stores/appNotificationStoreProvider";
import Button from "@/components/common/Button";
import Image from "next/image";
import Spinner from "@/components/common/Spinner";

export interface ProductProps {
    product: IProduct;
    isFavorites?: boolean;
    onFavoritesClick?: (productId: number) => void;
    onCartUpdated?: () => void;
}

export const Product: FC<ProductProps> = (props) => {
    const { product, onFavoritesClick, onCartUpdated, isFavorites } = props;
    const { t } = useTranslation(["product", "common"]);
    const { isAuthValid } = useMainStore((state) => state);
    const { addNotification } = useAppNotificationStore((state) => state);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const linkToProduct = `/product/${product.slug}-${product.productId}`;

    const addToCart = async (productId: number, qty: number) => {
        const request: IAddToCartRequest = {
            productId: productId,
            quantity: qty,
            oneClickBuying: false,
        };

        try {
            setIsLoading(true);
            const result: UpdateCartStatusEnum = await postData<UpdateCartStatusEnum>("/cart/", request);
            return result;
        } catch (error) {
            console.log(error);
            addNotification(t("errors.common", { ns: "common" }), "error");
        } finally {
            setIsLoading(false);
        }
    };

    const onBuyBtnClick = () => {
        if (!isAuthValid) {
            router.push(linkToProduct);
            return;
        }

        addToCart(product.productId, 1).then((result) => {
            if (result === UpdateCartStatusEnum.Success && onCartUpdated) {
                onCartUpdated();
            }
            if (result === UpdateCartStatusEnum.InternalError || result === UpdateCartStatusEnum.OutdatedData) {
                addNotification(t("errors.common", { ns: "common" }), "error");
            }
        });
    };

    const previewLink =
        appConfig.imagesHost +
        (product.imgLinks && product.imgLinks.length
            ? `/images/product/${product.productId}/original/${product.imgLinks[0]}`
            : Constants.noImagePath);

    const productPageLink = `/product/${product.slug}-${product.productId}`;

    return (
        <Styled.Wrapper className="product-card">
            {isLoading && <Spinner full />}
            <Styled.ImgContainer target="_blank" href={productPageLink}>
                <Styled.ImgInnerContainer>
                    <Styled.ImgDiv>
                        <Styled.Img
                            loading="eager"
                            src={previewLink}
                            alt={product.userFeatures?.name ?? ""}
                            fill
                        ></Styled.Img>
                    </Styled.ImgDiv>
                    <Styled.ImgBackground />
                </Styled.ImgInnerContainer>
            </Styled.ImgContainer>
            <Styled.DataContainer>
                <Styled.PriceDiv>
                    <Styled.CurrentPrice>
                        <Styled.CurrentPriceValue>{`${product.price} USD`}</Styled.CurrentPriceValue>
                    </Styled.CurrentPrice>
                </Styled.PriceDiv>
                <Styled.ProductName target="_blank" href={productPageLink}>
                    <Styled.ProductNameDiv>
                        <span className="tsBody500Medium">{product.userFeatures?.name}</span>
                    </Styled.ProductNameDiv>
                </Styled.ProductName>
                <Styled.ProductRatingContainer className={styles.tsBodyMBold}>
                    <Styled.SpanTitle>
                        <Icon size={20} viewBox="0 0 16 16" icon={"rating-star"} className="rating-star" />
                        <Styled.ProductRatingValue>{"0.0"}</Styled.ProductRatingValue>
                    </Styled.SpanTitle>
                    <Styled.SpanTitle>
                        <Icon size={20} viewBox="0 0 16 16" icon={"review"} className="review" />
                        <Styled.ProductReviewValue>{`0 ${t("reviews")}`}</Styled.ProductReviewValue>
                    </Styled.SpanTitle>
                </Styled.ProductRatingContainer>
                <Styled.BuyButtonContainer>
                    <Styled.BuyButtonWrapper>
                        <Styled.BuyButton onClick={onBuyBtnClick}>
                            <Styled.BuyButtonInnerContainer>
                                <Styled.BuyButtonTitle className="tsBodyControl500Medium">
                                    {isAuthValid ? t("buyButtonAuthenticatedTitle") : t("buyButtonAnonymusTitle")}
                                </Styled.BuyButtonTitle>
                                <Styled.BuyButtonShape />
                            </Styled.BuyButtonInnerContainer>
                        </Styled.BuyButton>
                    </Styled.BuyButtonWrapper>
                </Styled.BuyButtonContainer>
            </Styled.DataContainer>
            {onFavoritesClick && (
                <Styled.Favorites>
                    <Styled.FavoritesBox>
                        <Button
                            style="icon"
                            size="small"
                            onClick={() => onFavoritesClick && onFavoritesClick(product.productId)}
                        >
                            <Image
                                width={24}
                                height={24}
                                src={
                                    isFavorites
                                        ? "/images/icons/favorites-filled.svg"
                                        : "/images/icons/favorites-empty.svg"
                                }
                                loading="eager"
                                alt="favorites"
                            />
                        </Button>
                    </Styled.FavoritesBox>
                </Styled.Favorites>
            )}
        </Styled.Wrapper>
    );
};
