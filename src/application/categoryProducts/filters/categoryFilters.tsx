import { type FC } from "react";
import { Styled } from "../styles";
import { FilterParentLinks } from "./filterParentLinks";
import { Filters } from "./filters";
import { IMenuCategoryData } from "@/services/models/catalog/menuCategoryData";
import { useMainStore } from "@/contexts/mainStoreProvider";

export interface ICategoryFiltersProps {
    categoryData: IMenuCategoryData;
}

export const CategoryFilters: FC<ICategoryFiltersProps> = (props) => {
    const { categoryData } = props;
    const { isMobile } = useMainStore((state) => state);

    return (
        <Styled.FiltersDesktop $isMobile={isMobile}>
            <Styled.FiltersAside>
                <FilterParentLinks categoryData={categoryData} />
                {categoryData.category.features && <Filters features={categoryData.category.features} />}
            </Styled.FiltersAside>
        </Styled.FiltersDesktop>
    );
};
