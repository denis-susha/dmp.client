import { useCallback, type FC } from "react";
import { useTranslation } from "next-i18next/pages";
import { Styled } from "../categoryProducts/styles";
import { Product } from "../common/ProductCard/product";
import PaginationComponent from "@/components/common/Pagination";
import { Grid } from "@/components/grid/grid.styles";
import { ProductsEmpty } from "../categoryProducts/productsEmpty";
import { getPluralizedItemWord } from "@/utils";
import { useLocalStorage } from "@/hooks";
import { ISearchNextPageProps } from "@/pages/search";
import { useMainStore } from "@/contexts/mainStoreProvider";

export const SearchIndex: FC<ISearchNextPageProps> = (props) => {
    const { searchData, currentPage, query } = props;
    const { t, i18n } = useTranslation(["search", "common"]);
    const { isMobile } = useMainStore((state) => state);
    const [favorites, setFavorites] = useLocalStorage<number[] | null>("favorites", null);

    const itemsPerPage = 20;

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

    const showProducts = !!searchData?.products && !!searchData?.products.length;

    return (
        <Grid.Container $isMobile={isMobile}>
            <Grid.Row>
                <Grid.Column>
                    {showProducts && (
                        <Styled.ResultsHeader $isMobile={isMobile}>
                            <Styled.HeaderContent>
                                <Styled.Header>
                                    {t("pageHeader", {
                                        query: query,
                                        countText: `${searchData.totalCount} ${getPluralizedItemWord(searchData.totalCount, i18n.language)}`,
                                    })}
                                </Styled.Header>
                            </Styled.HeaderContent>
                        </Styled.ResultsHeader>
                    )}
                    {!showProducts && <ProductsEmpty withFilters={false} />}
                </Grid.Column>
            </Grid.Row>
            {showProducts && (
                <Grid.Row>
                    <Grid.Column>
                        <Styled.RowFiltersRow>
                            <Grid.Column></Grid.Column>
                        </Styled.RowFiltersRow>
                        <Styled.MegaPaginator>
                            <div>
                                <Styled.SearchResultsContainer>
                                    <Styled.Products>
                                        {searchData.products &&
                                            searchData.products.map((product) => {
                                                return (
                                                    <Styled.ProductItem key={product.productId}>
                                                        <Product
                                                            product={product}
                                                            isFavorites={isFavorites(product.productId)}
                                                            onFavoritesClick={onFavoritesToggle}
                                                        />
                                                    </Styled.ProductItem>
                                                );
                                            })}
                                    </Styled.Products>
                                </Styled.SearchResultsContainer>
                            </div>
                            <Styled.Paging>
                                <Styled.PagingWrapper>
                                    <Styled.PagingBox>
                                        <PaginationComponent
                                            currentPage={currentPage}
                                            itemsPerPage={itemsPerPage}
                                            totalCount={searchData.totalCount}
                                        />
                                    </Styled.PagingBox>
                                </Styled.PagingWrapper>
                            </Styled.Paging>
                        </Styled.MegaPaginator>
                    </Grid.Column>
                </Grid.Row>
            )}
        </Grid.Container>
    );
};
