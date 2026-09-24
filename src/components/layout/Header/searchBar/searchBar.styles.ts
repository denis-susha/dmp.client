import Button from "@/components/common/Button";
import Image from "next/image";
import styled, { css } from "styled-components";

const Container = styled.div`
    margin-top: 8px;
`;

const ItemContainer = styled.div`
    display: flex;
    overflow: hidden;
    padding: 10px 0;
    position: relative;

    padding-left: 8px;
    border-radius: 12px;

    &:hover {
        background-color: rgba(0, 48, 120, 0.039);
    }
`;

const ImgContainer = styled.div`
    border-radius: 16px;
    cursor: pointer;
    height: 52px;
    width: 52px;
    align-items: center;
    background-color: #fff;
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    overflow: hidden;
    position: relative;
    align-self: center;
`;

const Img = styled(Image)`
    object-fit: contain;
    max-height: 100%;
    max-width: 100%;
`;

const ImgBg = styled.div`
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    background: rgba(0, 48, 120, 0.039);
`;

const DescriptionCpntainer = styled.div`
    align-items: center;
    flex-wrap: wrap;
    margin-left: 16px;
    display: flex;
    flex-grow: 1;
`;

const DescriptionWraper = styled.div`
    display: flex;
    width: 100%;
`;

const DescriptionColumn = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    margin-right: 16px;
`;

const DescriptionPriceRow = styled.div`
    margin-bottom: 2px;
    color: #070707;
    display: inline-flex;
    position: relative;
    max-width: 100%;
`;

const DescriptionPriceWrapper = styled.div`
    overflow: hidden;
    display: inline-flex;
    position: relative;
`;

const DescriptionPriceValue = styled.span`
    margin-right: 4px;
    color: rgba(7, 7, 7, 1);
    display: inline;
    white-space: nowrap;
`;

const DescriptionNameRow = styled.div`
    color: rgba(7, 7, 7, 1);
    cursor: pointer;
    margin-bottom: 2px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    word-break: break-word;
`;

const DescriptionDetailsRow = styled.div`
    color: rgba(0, 26, 52, 0.6);
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    word-break: break-word;
`;

const RelativeContainer = styled.div`
    position: relative;
`;

const CategoryWrapper = styled.div`
    padding-left: 8px;
    border-radius: 12px;
    cursor: pointer;
    display: flex;
    width: auto;

    &:hover {
        background-color: rgba(0, 48, 120, 0.039);
    }
`;

const CategoryIconWrapper = styled.div`
    padding-top: 8px;
    padding-bottom: 8px;
    padding-right: 10px;
    align-items: center;
    display: flex;
`;

const CategoryIconContainer = styled.div`
    display: flex;
    align-items: center;
`;

const CategoryIcon = styled.div`
    color: rgb(7, 7, 7);
    background: rgba(0, 48, 120, 0.04);
    height: 32px;
    padding: 0 4px;
    width: 32px;
    border-radius: 8px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    align-items: center;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    position: relative;
    vertical-align: top;

    svg {
        color: rgba(0, 26, 52, 0.4);
    }
`;

const CategoryTitleWrapper = styled.div`
    padding-top: 8px;
    padding-bottom: 8px;
    overflow: hidden;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    display: flex;
    margin-right: 10px;
`;

const CategoryTitleConteiner = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    cursor: pointer;
`;

const CategoryTitle = styled.div`
    color: rgb(7, 7, 7);
`;

const RootCategoryTitle = styled.span`
    color: rgba(0, 26, 52, 0.6);
`;

const ActiveBg = styled.div`
    background-color: rgba(3, 8, 13, 0.32);
    height: 100vh;
    left: 0;
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: calc(var(--z-index-popover) + 1);
`;

const SearchBar = styled.div<{ $active: boolean; $isMobile: boolean }>`
    background-color: white;
    border-radius: 1rem;
    box-sizing: border-box;
    min-height: 3.75rem;
    min-width: ${(props) => (props.$isMobile ? "100%" : "589px")};
    padding: 0.5rem;
    position: relative;
    z-index: 10;

    ${({ $active }) =>
        $active &&
        css`
            & {
                z-index: calc(var(--z-index-popover) + 2);
            }
        `}
`;

const Form = styled.form<{ $active: boolean }>`
    background-color: #005bff;
    border-radius: 12px;
    box-sizing: border-box;
    display: flex;
    height: 44px;
    justify-content: flex-start;
    position: relative;
    z-index: 1;

    ${({ $active }) =>
        $active &&
        css`
            & {
                z-index: calc(var(--z-index-popover) + 2);
            }
        `}
`;

const InputContainer = styled.div`
    background-color: white;
    border-style: solid;
    border-width: 2px;
    border-color: #005bff;
    border-radius: 12px;
    display: flex;
    flex-grow: 1;
`;

const InputWrapper = styled.div`
    border-radius: 6px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    display: flex;
    flex: 1;
    height: 2.5rem;
    position: relative;
`;

const Input = styled.input`
    appearance: none;
    background-color: transparent;
    border: none;
    color: #070707;
    flex: 1;
    height: 100%;
    outline: none;
    padding: 0;
    padding-left: 0.5rem;
    vertical-align: middle;
    width: 100%;
    z-index: 1;
`;

const CrossBtn = styled.div`
    display: flex;
    align-items: center;
    color: rgba(0, 26, 52, 0.4);
    height: 100%;
    justify-content: center;
    width: 40px;

    &:hover {
        color: rgba(0, 26, 52, 0.6);
        cursor: pointer;
    }
`;

const SearchBtn = styled(Button)`
    & {
        background-color: #005bff;
        border-radius: 0.5rem;
        height: 2.5rem;
        margin: 0.125rem;
        margin-right: 0;
        width: 72px;
    }

    svg {
        color: rgba(245, 247, 250, 0.9);
    }
`;

const SearchBtnBg = styled.div`
    background-color: rgba(245, 247, 250, 0.9);
    border-radius: inherit;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    opacity: 0;
    z-index: 1;

    &:hover {
        opacity: 0.1;
    }
`;

const SearchResult = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
`;

const SearchResultTopMarger = styled.div<{ $active: boolean }>`
    background-color: white;
    border-radius: 20px;
    padding-top: 60px;
    position: relative;

    ${({ $active }) =>
        $active &&
        css`
            & {
                z-index: calc(var(--z-index-popover) + 1);
            }
        `}
`;

const SearchResultData = styled.div<{ $show: boolean }>`
    background-color: white;
    border-radius: 20px;
    max-height: calc(100vh - 165px);
    min-height: 0;
    overflow: hidden;
    padding-left: 8px;
    padding-right: 8px;
    pointer-events: auto;
    position: relative;
    top: 8px;
    z-index: calc(var(--z-index-popover) + 2);

    ${({ $show }) =>
        !$show &&
        css`
            & {
                display: none;
            }
        `}
`;

const SearchResultBox = styled.div<{ $isMobile: boolean }>`
    --margin-size: ${(props) => (props.$isMobile ? "6px" : "24px")};
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: calc(var(--margin-size) * - 1);
    margin-left: calc(var(--margin-size) * - 1);
    max-width: calc(100% + var(--margin-size));
    width: calc(100% + var(--margin-size));
`;

const SearchResultDiv = styled.div<{ $isMobile: boolean }>`
    display: block;
    max-height: calc(100vh - 165px);
    overflow-y: auto;
    box-sizing: border-box;
    flex: 1;
    margin-bottom: var(--margin-size);
    margin-left: ${(props) => (props.$isMobile ? "0" : "var(--margin-size)")};
    min-width: 0;
`;

const SearchResultItems = styled.div`
    padding-top: 8px;
    padding-bottom: 8px;
`;

export const Styled = {
    Container,
    ItemContainer,
    ImgContainer,
    Img,
    ImgBg,
    DescriptionCpntainer,
    DescriptionWraper,
    DescriptionColumn,
    DescriptionPriceRow,
    DescriptionPriceWrapper,
    DescriptionPriceValue,
    DescriptionNameRow,
    DescriptionDetailsRow,
    RelativeContainer,
    CategoryWrapper,
    CategoryIconWrapper,
    CategoryIconContainer,
    CategoryIcon,
    CategoryTitleWrapper,
    CategoryTitleConteiner,
    CategoryTitle,
    RootCategoryTitle,
    ActiveBg,
    SearchBar,
    Form,
    InputContainer,
    InputWrapper,
    Input,
    CrossBtn,
    SearchBtn,
    SearchBtnBg,
    SearchResult,
    SearchResultTopMarger,
    SearchResultData,
    SearchResultBox,
    SearchResultDiv,
    SearchResultItems,
};
