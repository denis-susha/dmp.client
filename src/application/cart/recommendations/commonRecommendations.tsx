import { useCallback, useEffect, useState, type FC } from "react";
import { useTranslation } from "next-i18next/pages";
import { Styled } from "./recommendations.styles";
import { Product } from "@/application/common/ProductCard/product";
import { useLocalStorage } from "@/hooks";
import { IProduct } from "@/services/models/product/product";
import { fetchData } from "@/utils/api/apiAxious";
import { useAppNotificationStore } from "@/components/common/Notification/stores/appNotificationStoreProvider";
import Spinner from "@/components/common/Spinner";
import { useRouter } from "next/router";

const CommonRecommendations: FC = () => {
    const { t } = useTranslation(["common"]);
    const router = useRouter();

    const { addNotification } = useAppNotificationStore((state) => state);

    const [favorites, setFavorites] = useLocalStorage<number[] | null>("favorites", null);
    const [products, setProducts] = useState<IProduct[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const isFavorites = useCallback(
        (productId: number) => {
            return !!favorites && favorites.includes(productId);
        },
        [favorites]
    );

    const onFavoritesClick = useCallback(
        (productId: number) => {
            if (favorites && favorites.includes(productId)) {
                setFavorites(favorites?.filter((p) => p !== productId));
            } else {
                setFavorites([...(favorites ?? []), productId]);
            }
        },
        [favorites, setFavorites]
    );

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                await fetchData<IProduct[]>("/catalog/recommendation").then((res) => {
                    setProducts(res);
                });
            } catch (error) {
                console.log(error);
                addNotification(t("errors.common", { ns: "common" }), "error");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [addNotification, t]);

    if (!products || !products.length) {
        return null;
    }

    if (isLoading) {
        return <Spinner full />;
    }

    const addToCartHandle = () => {
        router.reload();
    };

    return (
        <Styled.Viewed>
            <Styled.Header>
                <Styled.HeaderTitle className="tsHeadline600Medium">{t("recommended")}</Styled.HeaderTitle>
            </Styled.Header>
            <Styled.ProductListContainer>
                {products.map((product, idx) => (
                    <Product
                        key={idx}
                        product={product}
                        isFavorites={isFavorites(product.productId)}
                        onFavoritesClick={() => onFavoritesClick(product.productId)}
                        onCartUpdated={addToCartHandle}
                    />
                ))}
            </Styled.ProductListContainer>
        </Styled.Viewed>
    );
};

export default CommonRecommendations;
