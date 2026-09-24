import { FC } from "react";
import Icon from "@/components/common/Icon";
import { Styled } from "./searchBar.styles";
import { ISearchCategory } from "@/services/models/search/searchCategory";

interface ISearchCategoryProps {
    category: ISearchCategory;
}

export const SearchCategory: FC<ISearchCategoryProps> = (props) => {
    const { category } = props;

    const onClick = () => {
        window.location.assign(`/${category.url}`);
    };

    return (
        <Styled.Container>
            <Styled.CategoryWrapper onClick={onClick}>
                <Styled.CategoryIconWrapper>
                    <Styled.CategoryIconContainer>
                        <Styled.CategoryIcon className="tsBodyControl400Small">
                            <Icon icon="right-arrow" size={24} viewBox="0 0 16 16"></Icon>
                        </Styled.CategoryIcon>
                    </Styled.CategoryIconContainer>
                </Styled.CategoryIconWrapper>
                <Styled.CategoryTitleWrapper>
                    <Styled.CategoryTitleConteiner>
                        <Styled.CategoryTitle className="tsCompact500Medium">
                            <span>
                                {category.title}
                                <Styled.RootCategoryTitle> &#8212; </Styled.RootCategoryTitle>
                                <Styled.RootCategoryTitle>{category.rootTitle}</Styled.RootCategoryTitle>
                            </span>
                        </Styled.CategoryTitle>
                    </Styled.CategoryTitleConteiner>
                </Styled.CategoryTitleWrapper>
            </Styled.CategoryWrapper>
        </Styled.Container>
    );
};
