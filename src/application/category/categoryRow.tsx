import { type FC } from "react";
import { Styled } from "./styles";
import { CategoryItem } from "./categoryItem";
import { IMenuCategory } from "@/services/models/catalog/menuCategory";

export interface CategoryRowProps {
    menuCategoryRow: IMenuCategory[];
}

export const CategoryRow: FC<CategoryRowProps> = ({ menuCategoryRow }) => {
    return (
        <Styled.CategoryRow>
            <Styled.CategoryItems>
                {menuCategoryRow.map((menuCategory, i) => (
                    <CategoryItem
                        key={`CategoryItem_${menuCategory.menuCategoryId}_${i}`}
                        menuCategory={menuCategory}
                    />
                ))}
            </Styled.CategoryItems>
        </Styled.CategoryRow>
    );
};
