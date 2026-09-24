import Image from "next/image";
import styled from "styled-components";

const ContainerRow = styled.div`
    --margin-size: var(--gap);
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: calc(var(--margin-size) * -1);
    margin-left: calc(var(--margin-size) * -1);
    max-width: calc(100% + var(--margin-size));
    width: calc(100% + var(--margin-size));
`;

const ContainerColumn = styled.div`
    align-items: stretch;
    box-sizing: border-box;
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-bottom: var(--margin-size);
    margin-left: var(--margin-size);
    min-width: 0;
`;

const Caption = styled.div`
    text-align: left;
    color: #070707;
    font-family: var(--title-font);
    text-decoration: none;
    vertical-align: middle;
`;

const CaptionHdr = styled.h1`
    font-size: 30px;
    line-height: 38px;
    font-weight: 700;
    margin-bottom: 17px;
`;

const CategoryRow = styled.div`
    display: flex;
    flex: auto;
    flex-direction: column;
    margin-bottom: 24px;
    margin-top: 24px;
`;

const CategoryItems = styled.div`
    align-items: stretch;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    :not(:last-child) {
        margin-right: 24px;
    }
`;

const CategoryItem = styled.div`
    width: calc(var(--category-width) - 20px);
    align-items: stretch;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    flex-grow: 0;
    flex-shrink: 0;
    justify-content: stretch;

    --category-width: 16.66667%;

    @media ${({ theme }) => theme.media.lg} {
        --category-width: 20%;
    }

    @media ${({ theme }) => theme.media.md} {
        --category-width: 30%;
    }

    @media ${({ theme }) => theme.media.sm} {
        --category-width: 47%;
    }

    @media ${({ theme }) => theme.media.xs} {
        --category-width: 97%;
    }
`;

const CategoryItemBox = styled.a`
    cursor: pointer;
    justify-content: space-between;
    position: relative;
    text-decoration: none;
    z-index: 3;
    align-items: stretch;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    transition: var(--transition);
    transition-property: color;
`;

const ItemImgBox = styled.div`
    border-radius: 3px;
    box-sizing: border-box;
    margin-bottom: 8px;
    overflow: visible;
    position: relative;
    width: 100%;

    :before {
        content: "";
        display: block;
        padding-top: 100%;
    }

    :after {
        background-color: rgba(0, 48, 120, 0.039);
        border-radius: 12px;
        content: "";
        display: block;
        height: 100%;
        left: 0;
        opacity: 0;
        position: absolute;
        top: 0;
        transition: var(--transition);
        transition-property: opacity;
        width: 100%;
        will-change: opacity;
        z-index: 4;
    }
`;

const ItemImgDiv = styled.div`
    overflow: hidden;
    box-sizing: border-box;
    display: block;
    line-height: 0;
    margin: 0 auto;
    position: relative;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 20px;
    background-color: #f7f7f7;

    &:hover {
        opacity: 0.9;
    }
`;

const ItemImgWrapper = styled.div`
    align-content: center;
    align-items: center;
    bottom: 0;
    display: flex;
    justify-content: center;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
`;

const ItemImg = styled(Image)`
    bottom: 0;
    flex: 0 0 auto;
    left: 0;
    margin: auto;
    max-height: 100%;
    max-width: 100%;
    position: absolute;
    right: 0;
    top: 0;
    border-radius: 12px;
    border: none;
    outline: none;
`;

const TitleDiv = styled.div`
    flex-grow: 1;
`;

const Title = styled.div`
    text-align: center;
    color: #070707;
    display: -webkit-box;
    margin-bottom: 6px;
    overflow: hidden;
    padding: 0;
    text-overflow: ellipsis;
    transition: var(--transition);
    transition-property: color;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;

export const Styled = {
    ContainerRow,
    ContainerColumn,
    Caption,
    CaptionHdr,
    CategoryRow,
    CategoryItems,
    CategoryItem,
    CategoryItemBox,
    ItemImgBox,
    ItemImgDiv,
    ItemImgWrapper,
    ItemImg,
    TitleDiv,
    Title,
};
