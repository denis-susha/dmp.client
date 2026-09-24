import { useCallback, type FC } from "react";
import { useTranslation } from "next-i18next/pages";
import { Styled } from "./styles";
import { Product } from "../common/ProductCard/product";
import PaginationComponent from "@/components/common/Pagination";
import BreadCrumbs from "@/components/common/BreadCrumbs";
import { Grid } from "@/components/grid/grid.styles";
import { ProductsEmpty } from "./productsEmpty";
import { getPluralizedItemWord } from "@/utils";
import { CategoryFilters } from "./filters/categoryFilters";
import { Sorting } from "./filters/sorting";
import { IMenuCategoryData } from "@/services/models/catalog/menuCategoryData";
import { useLocalStorage } from "@/hooks";
import { useMainStore } from "@/contexts/mainStoreProvider";
import { MobileFilters } from "./mobile/mobileFilters";

export interface CategoryProductsIndexProps {
    categoryData: IMenuCategoryData;
    withFilters: boolean;
    currentPage: number;
}

export const CategoryProductsIndex: FC<CategoryProductsIndexProps> = (props) => {
    const { categoryData, withFilters, currentPage } = props;
    const { isMobile } = useMainStore((state) => state);
    const { i18n } = useTranslation([]);
    const [favorites, setFavorites] = useLocalStorage<number[] | null>("favorites", null);

    const itemsPerPage = 12;

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

    if (!categoryData) {
        return null;
    }

    const showProducts = !!categoryData && !!categoryData?.products && !!categoryData?.products.length;

    return (
        <Grid.Container $isMobile={isMobile}>
            <Grid.Row>
                <Grid.Column>
                    {categoryData.category.parent && (
                        <BreadCrumbs
                            first={{
                                link: categoryData.category.parent.url,
                                title: categoryData.category.parent.title,
                            }}
                            second={
                                categoryData.category.parent.parent
                                    ? {
                                          link: categoryData.category.parent.parent.url,
                                          title: categoryData.category.parent.parent.title,
                                      }
                                    : undefined
                            }
                        />
                    )}
                    {showProducts && (
                        <Styled.ResultsHeader $isMobile={isMobile}>
                            <Styled.HeaderContent>
                                <Styled.Header>{categoryData?.category.title}</Styled.Header>
                                <Styled.HeaderCountContent>
                                    <span>{`${categoryData.totalCount} ${getPluralizedItemWord(categoryData.totalCount, i18n.language)}`}</span>
                                </Styled.HeaderCountContent>
                            </Styled.HeaderContent>
                        </Styled.ResultsHeader>
                    )}
                    {!showProducts && <ProductsEmpty withFilters={withFilters} />}
                </Grid.Column>
            </Grid.Row>
            {showProducts && (
                <Grid.Row>
                    {!isMobile && (
                        <Styled.FiltersColumn>
                            <CategoryFilters categoryData={categoryData} />
                        </Styled.FiltersColumn>
                    )}
                    <Grid.Column>
                        <Styled.SortingRow>
                            {isMobile && <MobileFilters categoryData={categoryData} />}
                            <Grid.Column>
                                <Sorting />
                            </Grid.Column>
                            {!isMobile && <Styled.AdditionalSortBlock />}
                        </Styled.SortingRow>
                        <Styled.RowFiltersRow>
                            <Grid.Column></Grid.Column>
                        </Styled.RowFiltersRow>
                        <Styled.MegaPaginator>
                            <div>
                                <Styled.SearchResultsContainer>
                                    <Styled.Products>
                                        {categoryData?.products.map((product) => {
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
                                            totalCount={categoryData?.totalCount ?? 0}
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
