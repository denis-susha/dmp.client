import { type FC } from "react";
import { Styled } from "./styles";
import { IMenuCategory } from "@/services/models/catalog/menuCategory";
import { appConfig } from "@/appConfig";

export interface CategoryItemProps {
    menuCategory: IMenuCategory;
}

export const CategoryItem: FC<CategoryItemProps> = ({ menuCategory }) => {
    return (
        <Styled.CategoryItem>
            <Styled.CategoryItemBox target="_self" href={`/${menuCategory.url}`}>
                <Styled.ItemImgBox>
                    <Styled.ItemImgDiv>
                        <Styled.ItemImgWrapper>
                            <Styled.ItemImg
                                width={216}
                                height={216}
                                src={`${appConfig.staticUrl}categories/${menuCategory.menuCategoryId}.png`}
                                alt={menuCategory.title}
                            />
                        </Styled.ItemImgWrapper>
                    </Styled.ItemImgDiv>
                </Styled.ItemImgBox>
                <Styled.TitleDiv>
                    <Styled.Title className="tsBody500Large tsBody500Medium">{menuCategory.title}</Styled.Title>
                </Styled.TitleDiv>
            </Styled.CategoryItemBox>
        </Styled.CategoryItem>
    );
};
