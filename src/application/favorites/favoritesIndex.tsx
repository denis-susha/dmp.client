import { useEffect, useState, useCallback, type FC } from "react";
import { useTranslation } from "next-i18next/pages";
import { MyContainer } from "../common/my/myContainer";
import { useLocalStorage } from "@/hooks";
import { postData } from "@/utils/api/apiAxious";
import { IProduct } from "@/services/models/product/product";
import Spinner from "@/components/common/Spinner";
import { useAppNotificationStore } from "@/components/common/Notification/stores/appNotificationStoreProvider";
import { useSearchParams } from "next/navigation";
import { EmptyFavorites } from "./empty/emptyFavorites";
import { Styled } from "./favorites.styles";
import { Product } from "../common/ProductCard/product";
import Icon from "@/components/common/Icon";

const pageSize = 8;

export const FavoritesIndex: FC = () => {
    const { t } = useTranslation(["favorites", "common"]);
    const { addNotification } = useAppNotificationStore((state) => state);
    const [favorites, setFavorites] = useLocalStorage<number[] | null>("favorites", null);
    const [products, setProducts] = useState<IProduct[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number | null>(null);
    const searchParams = useSearchParams();

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
        if (searchParams && searchParams.has("page")) {
            const page = Number(searchParams.get("page"));
            setPage(page);
        } else {
            setPage(1);
        }
    }, [searchParams]);

    useEffect(() => {
        const fetchProducts = async (page: number, favorites: number[]) => {
            setIsLoading(true);
            try {
                const ids = favorites.slice((page - 1) * pageSize, pageSize);
                await postData<IProduct[]>("/product/favorites", ids).then((res) => {
                    setProducts(res);
                    if (res.length < ids.length) {
                        // Some products may no longer be on sale
                        const removeIds = ids.filter((id) => !res.some((r) => r.productId === id));
                        const newFavorites = favorites.filter((f) => !removeIds.includes(f));
                        setFavorites(newFavorites);
                    }
                });
            } catch (error) {
                console.log(error);
                addNotification(t("errors.common", { ns: "common" }), "error");
            } finally {
                setIsLoading(false);
            }
        };

        if (page && favorites && favorites.length) {
            fetchProducts(page, favorites);
        } else {
            setProducts(null);
        }
    }, [addNotification, favorites, page, setFavorites, t]);

    const leftColumn = (
        <>
            <Styled.LeftColumnBoxSelected>
                <Styled.LeftColumnIcon>
                    <Icon icon="wishlist" size={24} viewBox="0 0 24 24" />
                </Styled.LeftColumnIcon>
                <Styled.LeftColumnTitle>
                    <div className="tsBody500Medium">{t("products")}</div>
                </Styled.LeftColumnTitle>
            </Styled.LeftColumnBoxSelected>
            <Styled.LeftColumnBox>
                <Styled.LeftColumnIcon>
                    <Icon icon="supermarket" size={24} viewBox="0 0 24 24" />
                </Styled.LeftColumnIcon>
                <Styled.LeftColumnTitle>
                    <div className="tsBody500Medium">{t("sellers")}</div>
                </Styled.LeftColumnTitle>
            </Styled.LeftColumnBox>
        </>
    );

    return (
        <>
            {isLoading && <Spinner full />}
            <MyContainer
                leftColumn={leftColumn}
                pagination={{ page: 1, pageSize: pageSize }}
                totalCount={0}
                header={t("pageHeader")}
            >
                {products && (
                    <Styled.Container>
                        <Styled.Favorites>
                            {products.map((product, idx) => (
                                <Product
                                    key={idx}
                                    product={product}
                                    isFavorites={isFavorites(product.productId)}
                                    onFavoritesClick={() => onFavoritesClick(product.productId)}
                                />
                            ))}
                        </Styled.Favorites>
                    </Styled.Container>
                )}
                {!isLoading && (!products || !products.length) && <EmptyFavorites />}
            </MyContainer>
        </>
    );
};
