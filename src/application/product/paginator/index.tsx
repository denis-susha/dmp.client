import { useEffect, useState, type FC } from "react";
import { Styled } from "./styles";
import { Grid } from "@/components/grid/grid.styles";
import { IProduct } from "@/services/models/product/product";
import { useAppNotificationStore } from "@/components/common/Notification/stores/appNotificationStoreProvider";
import { IProductStoreInfo } from "@/services/models/product/productStoreInfo";
import { fetchData } from "@/utils/api/apiAxious";
import Image from "next/image";
import { appConfig } from "@/appConfig";
import Icon from "@/components/common/Icon";
import { useTranslation } from "next-i18next/pages";
import Tooltip from "@/components/common/Tooltip";
import { Recommendations } from "./recommendations";
import { useMainStore } from "@/contexts/mainStoreProvider";

export const ProductPaginator: FC<{ product: IProduct }> = ({ product }) => {
    const { t } = useTranslation(["product", "common"]);
    const { isMobile } = useMainStore((state) => state);
    const { addNotification } = useAppNotificationStore((state) => state);
    const [storeInfo, setStoreInfo] = useState<IProductStoreInfo | null>(null);

    useEffect(() => {
        const getProductStoreInfo = async () => {
            const result = await fetchData<IProductStoreInfo>(`/product/store?productId=${product.productId}`);
            return result;
        };

        getProductStoreInfo()
            .then((result) => {
                setStoreInfo(result);
            })
            .catch((error) => {
                console.log(error);
                addNotification(t("errors.common", { ns: "common" }), "error");
            });
    }, [addNotification, product, t]);

    return (
        <Styled.Paginator>
            <div>
                <Grid.Container $isMobile={isMobile}>
                    <Styled.SeparatorContainer>
                        <Styled.Separator />
                    </Styled.SeparatorContainer>
                    {storeInfo && (
                        <Grid.Row>
                            <Styled.StoresColumn $isMobile={isMobile}>
                                <Styled.CurrentSeller>
                                    <Styled.CurrentSellerContainer $isMobile={isMobile}>
                                        <Styled.CurSellerCommonInfoContainer $isMobile={isMobile}>
                                            <Styled.CurSellerCommonInfoBox>
                                                <Styled.StoreInfo>
                                                    <Styled.StoreAvatar>
                                                        {!storeInfo.coverPath ? (
                                                            <Image
                                                                fill
                                                                alt={storeInfo.name}
                                                                src={`${appConfig.imagesHost}/images/store/${storeInfo.storeId}/original/${storeInfo.coverPath}`}
                                                            />
                                                        ) : (
                                                            <Icon icon="supermarket" size={40} viewBox="0 0 24 24" />
                                                        )}
                                                    </Styled.StoreAvatar>
                                                    <div>
                                                        <div>{t("seller")}</div>
                                                        <div className="tsHeadline500Medium">{storeInfo.name}</div>
                                                    </div>
                                                </Styled.StoreInfo>
                                            </Styled.CurSellerCommonInfoBox>
                                        </Styled.CurSellerCommonInfoContainer>
                                        <Styled.StoreRatingContainer $isMobile={isMobile}>
                                            <Styled.StoreRating>
                                                <Styled.StoreRatingItem>
                                                    <Tooltip content={t("ratingTooltip")}>
                                                        <Styled.StoreRatingItemBox>
                                                            <Styled.StoreRatingIcon icon="star" size={24} />
                                                            <div>
                                                                <Styled.StoreRatingTitle>
                                                                    <Styled.StoreRatingTitleDigitals>
                                                                        {"0.0"}
                                                                    </Styled.StoreRatingTitleDigitals>
                                                                    <span>{t("productsRating")}</span>
                                                                </Styled.StoreRatingTitle>
                                                            </div>
                                                        </Styled.StoreRatingItemBox>
                                                    </Tooltip>
                                                </Styled.StoreRatingItem>
                                            </Styled.StoreRating>
                                        </Styled.StoreRatingContainer>
                                    </Styled.CurrentSellerContainer>
                                </Styled.CurrentSeller>
                            </Styled.StoresColumn>
                        </Grid.Row>
                    )}
                    <Styled.Separator />
                    <Recommendations categoryId={product.menuCategoryId} />
                </Grid.Container>
            </div>
        </Styled.Paginator>
    );
};
