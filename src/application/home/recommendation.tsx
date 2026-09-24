import { useCallback, type FC } from "react";
import { Product } from "../common/ProductCard/product";
import { IProduct } from "@/services/models/product/product";
import { Styled } from "./home.styles";
import { useLocalStorage } from "@/hooks";
import { useTranslation } from "next-i18next/pages";
import { useMainStore } from "@/contexts/mainStoreProvider";

interface IRecommendationProps {
    recommendedProducts: IProduct[];
}

export const Recommendation: FC<IRecommendationProps> = ({ recommendedProducts }) => {
    const { t } = useTranslation(["common"]);
    const { getDynamicInfo, isMobile } = useMainStore((state) => state);
    const [favorites, setFavorites] = useLocalStorage<number[] | null>("favorites", null);

    const isFavorites = useCallback(
        (productId: number) => {
            return favorites?.some((f) => f === productId);
        },
        [favorites]
    );

    const onFavoritesToggle = useCallback(
        (productId: number) => {
            if (favorites && favorites.includes(productId)) {
                setFavorites(favorites.filter((p) => p !== productId));
            } else {
                setFavorites((prev) => [...(prev ?? []), productId]);
            }
        },
        [favorites, setFavorites]
    );

    const addToCartHandle = () => {
        getDynamicInfo();
    };

    return (
        <Styled.Recommendation>
            <Styled.RecommendationHdr className="tsHeadline600Medium">
                <span>{t("recommended")}</span>
            </Styled.RecommendationHdr>
            <Styled.RecommendationItems>
                <Styled.RecommendationItemsWrapper>
                    {recommendedProducts.map((product) => (
                        <Styled.RecommendationProduct key={product.productId} $isMobile={isMobile}>
                            <Product
                                product={product}
                                isFavorites={isFavorites(product.productId)}
                                onFavoritesClick={onFavoritesToggle}
                                onCartUpdated={addToCartHandle}
                            />
                        </Styled.RecommendationProduct>
                    ))}
                </Styled.RecommendationItemsWrapper>
            </Styled.RecommendationItems>
        </Styled.Recommendation>
    );
};
