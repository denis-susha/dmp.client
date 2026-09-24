import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import Icon from "@/components/common/Icon";
import { SearchProduct } from "./searchProduct";
import { SearchCategory } from "./searchCategory";
import { useTranslation } from "next-i18next/pages";
import { useMainStore } from "@/contexts/mainStoreProvider";
import { Styled } from "./searchBar.styles";
import { useRouter } from "next/router";

export const SearchBar: FC = () => {
    const { t } = useTranslation(["common"]);
    const { searchProductsResult, searchProducts, clearSearchProducts, isMobile } = useMainStore((state) => state);

    const router = useRouter();
    const [isActive, setIsActive] = useState(false);
    const [value, setValue] = useState("");
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (value.length >= 3) {
            searchProducts(value);
        }
    }, [searchProducts, value]);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (isActive && triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
                setIsActive(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isActive]);

    const onChangeHandle = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const onClearBtnClick = () => {
        setValue("");
        clearSearchProducts();
    };

    const handleTriggerEvents = {
        onClick: () => setIsActive(true),
    };

    const onSearch = (formData: FormData) => {
        const query = formData.get("text");
        if (query) {
            router.push(`/search?query=${query}`);
        }
    };

    return (
        <>
            {isActive && <Styled.ActiveBg />}
            <Styled.SearchBar ref={triggerRef} {...handleTriggerEvents} $active={isActive} $isMobile={isMobile}>
                <Styled.Form $active={isActive} action={onSearch}>
                    <Styled.InputContainer>
                        <Styled.InputWrapper>
                            <Styled.Input
                                className="tsBody500Medium"
                                placeholder={t("searchBarPlaceholder")}
                                type="text"
                                name="text"
                                autoCapitalize="off"
                                autoComplete="off"
                                autoCorrect="off"
                                spellCheck={false}
                                maxLength={255}
                                value={value}
                                onChange={onChangeHandle}
                            />
                            {value && (
                                <Styled.CrossBtn onClick={onClearBtnClick}>
                                    <Icon icon="cross-small" size={24}></Icon>
                                </Styled.CrossBtn>
                            )}
                        </Styled.InputWrapper>
                    </Styled.InputContainer>
                    <Styled.SearchBtn type="submit">
                        <Icon icon="search" size={24} />
                        <Styled.SearchBtnBg />
                    </Styled.SearchBtn>
                </Styled.Form>
                <Styled.SearchResult>
                    <Styled.SearchResultTopMarger $active={isActive} />
                    <div>
                        <Styled.SearchResultData
                            $show={
                                isActive &&
                                !!searchProductsResult &&
                                (!!(searchProductsResult.categories && searchProductsResult.categories.length) ||
                                    !!(searchProductsResult.products && searchProductsResult.products.length))
                            }
                        >
                            <Styled.SearchResultBox $isMobile={isMobile}>
                                <Styled.SearchResultDiv $isMobile={isMobile}>
                                    <Styled.SearchResultItems>
                                        {searchProductsResult?.categories?.map((category, idx) => (
                                            <SearchCategory key={idx} category={category} />
                                        ))}
                                        {searchProductsResult?.products?.map((product, idx) => (
                                            <SearchProduct key={idx} product={product} />
                                        ))}
                                    </Styled.SearchResultItems>
                                </Styled.SearchResultDiv>
                            </Styled.SearchResultBox>
                        </Styled.SearchResultData>
                    </div>
                </Styled.SearchResult>
            </Styled.SearchBar>
        </>
    );
};
