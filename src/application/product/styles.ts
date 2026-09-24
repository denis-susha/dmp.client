import Icon from "@/components/common/Icon";
import { Grid } from "@/components/grid/grid.styles";
import styled from "styled-components";

const PageTopRowContainer = styled.div<{ $isMobile: boolean }>`
    width: auto;
    row-gap: 12px;
    flex-direction: column;
    column-gap: 12px;
    align-items: stretch;
    justify-content: space-between;
    display: flex;
    flex-wrap: nowrap;
    margin-bottom: ${(props) => (props.$isMobile ? "0.5rem" : "0")};
`;

const PageTopRowWrapper = styled.div<{ $isMobile: boolean }>`
    width: auto;
    column-gap: 20px;
    align-items: center;
    justify-content: space-between;
    display: flex;
    flex-direction: row;
    flex-wrap: ${(props) => (props.$isMobile ? "wrap" : "nowrap")};
`;

const TopColumnContainer = styled.div<{ $isMobile: boolean }>`
    width: ${(props) => (props.$isMobile ? "100%" : "auto")};
    column-gap: 12px;
    flex-wrap: wrap;
    align-items: flex-start;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
`;

const ShareActionsContainer = styled(TopColumnContainer)<{ $isMobile: boolean }>`
    padding: ${(props) => (props.$isMobile ? "0" : "0px 12px")};
`;

const ShareActionBtn = styled.button`
    color: rgba(0, 26, 52, 0.6);
    -webkit-touch-callout: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    align-items: center;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: transparent;
    border: none;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-flex;
    font-family: var(--mainFont);
    font-size: inherit;
    font-weight: inherit;
    margin: 0;
    overflow: hidden;
    padding: 0;
    position: relative;
    text-decoration: none;
    transition: transform 0.1s cubic-bezier(0.55, 0, 1, 0.45);
    white-space: nowrap;
`;

const ShareActionBtnTitle = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
`;

const ShareBtnContainer = styled.div`
    display: inline-flex;
`;

const ProductContainer = styled.div`
    width: 100%;
    column-gap: 32px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
`;

const ProductInfoContainer = styled.div<{ $isMobile: boolean }>`
    width: ${(props) => (props.$isMobile ? "100%" : "calc(100% - 420px)")};
    row-gap: 24px;
    flex-direction: column;
    column-gap: 24px;
    align-items: flex-start;
    background: transparent;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
`;

const ProductVisualInfoColumn = styled(Grid.Column)<{ $isMobile: boolean }>`
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: ${(props) => (props.$isMobile ? "100%" : "calc(47.3333% - var(--margin-size))")};
    max-width: ${(props) => (props.$isMobile ? "100%" : "calc(47.3333% - var(--margin-size))")};
    padding-right: ${(props) => (props.$isMobile ? "var(--margin-size-grid)" : "initial")};
    align-items: center;
`;

const ProductVisualInfoColumnCarousel = styled.div`
    max-width: 350px;
    width: 100%;
`;

const ProductInfo = styled.div`
    width: auto;
    row-gap: 12px;
    flex-direction: column;
    column-gap: 12px;
    align-items: stretch;
    background: transparent;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
`;

const ProductHeading = styled.div<IProductHdrTitleProps>`
    cursor: ${(props) => (props.$showFull ? "default" : "pointer")};
    margin: ${(props) => (props.$isMobile ? "0" : "0 -15px")};
    padding: ${(props) => (props.$isMobile ? "0" : "0 15px")};
    position: relative;

    &:hover {
        span {
            color: #003acc;
        }
    }
`;

interface IProductHdrTitleProps {
    $showFull: boolean;
    $isMobile: boolean;
}

const ProductHdrTitle = styled.h1<IProductHdrTitleProps>`
    max-height: ${(props) => (props.$showFull ? "initial" : "60px")};
    -webkit-line-clamp: ${(props) => (props.$showFull ? "initial" : "2")};
    -webkit-box-orient: vertical;
    color: #070707;
    display: -webkit-box;
    overflow: hidden;
    transition-property: max-height;
    will-change: max-height;
    word-break: break-word;
    transition: none 0.3s ease-in-out;
`;

const ProductHdrTitleMore = styled.div<{ $isMobile: boolean }>`
    opacity: 1;
    align-items: end;
    bottom: 0;
    display: flex;
    height: 26px;
    position: absolute;
    right: ${(props) => (props.$isMobile ? "9px" : "15px")};
    transition-property: opacity;
    will-change: opacity;
    z-index: 10;
    transition: none 0.3s ease-in-out;

    &:before {
        background: linear-gradient(90deg, hsla(0, 0%, 100%, 0), hsla(0, 0%, 100%, 0) 0.01%, #fff 57.29%);
        content: "";
        height: 26px;
        width: 42px;
    }
`;

const ProductHdrTitleMoreSpan = styled.span`
    align-items: end;
    background: #fff;
    color: rgba(0, 26, 52, 0.4);
    display: flex;
    height: 100%;
    line-height: 18px;
    padding-bottom: 2px;
`;

const FeedBackRow = styled.div`
    width: auto;
    column-gap: 12px;
    flex-wrap: wrap;
    align-items: flex-start;
    background: transparent;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
`;

const ProductFeedbackLink = styled.div`
    color: rgba(0, 26, 52, 0.6);
    -webkit-touch-callout: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    align-items: center;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: transparent;
    border: none;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-flex;
    font-family: var(--mainFont);
    font-size: inherit;
    font-weight: inherit;
    margin: 0;
    overflow: hidden;
    padding: 0;
    position: relative;
    text-decoration: none;
    transition: transform 0.1s cubic-bezier(0.55, 0, 1, 0.45);
    white-space: nowrap;

    &:hover {
        color: #003acc;
    }
`;

const ProductFeedbackLinkReview = styled(ProductFeedbackLink)`
    &:hover {
        color: #003acc;

        svg {
            color: #ffc80e;
        }
    }
`;

const ProductFeedbackLinkQuestions = styled(ProductFeedbackLink)`
    &:hover {
        color: #003acc;

        svg {
            color: #003acc;
        }
    }
`;

const ReviewTitle = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
`;

const ProductFeedbackIcon = styled(Icon)`
    margin-right: 8px;
    flex-shrink: 0;
`;

const RatingStarIcon = styled(ProductFeedbackIcon)`
    color: rgb(255, 168, 0);
`;

const QuestionsIcon = styled(ProductFeedbackIcon)`
    color: rgba(0, 26, 52, 0.4);
`;

const AboutProductContainer = styled.div`
    width: auto;
    row-gap: 24px;
    flex-direction: column;
    column-gap: 24px;
    align-items: stretch;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
`;

const ShortCharacteristics = styled.div`
    display: flex;
    flex-flow: column;
`;

const ShortCharacteristicsHdrRow = styled.div<{ $isMobile: boolean }>`
    align-items: center;
    display: flex;
    height: ${(props) => (props.$isMobile ? "auto" : "32px")};
    justify-content: space-between;
`;

const AboutProductTitleContainer = styled.span`
    display: inline-block;
    color: rgba(7, 7, 7, 1);
`;

const ShortCharacteristicsItems = styled.div`
    display: flex;
    flex-flow: column;
`;

const LinkToProductDescrContainer = styled.div`
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    padding-right: 2px;
    cursor: pointer;
    transition: transform 0.1s cubic-bezier(0.55, 0, 1, 0.45);
    background-color: rgba(0, 48, 120, 0.039);
    color: #070707;
    -moz-osx-font-smoothing: grayscale;
    align-items: center;
    box-sizing: border-box;
    display: inline-flex;
    font-family: var(--mainFont);
    justify-content: center;
    max-width: 100%;
    padding: 2px 8px;
    position: relative;
`;

const LinkToProductDescrDiv = styled.div`
    align-items: center;
    display: flex;
    overflow: hidden;
`;

const LinkToProductDescrTitle = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const LinkToProductDescrIcon = styled(Icon)`
    color: #001a34;
    margin-left: 2px;
    min-width: 16px;
`;

const LinkToProductDescrBg = styled.div`
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    background-color: #070707;
    bottom: 0;
    left: 0;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;

    &:hover {
        opacity: 0.1;
    }
`;

const ShortItem = styled.div`
    display: flex;
    border-top: 0.5px solid rgba(204, 214, 228, 0.6);
`;

const ShortItemPropNameContainer = styled.div`
    overflow-wrap: anywhere;
    padding: 12px 0;
    width: 50%;
`;

const ShortItemPropName = styled.span`
    display: inline;
`;

const ShortItemPropNameTitle = styled.span`
    color: rgba(0, 26, 52, 0.6);
    font-weight: var(--fontNormal);
`;

const ShortItemPropValueContainer = styled.div`
    margin-left: 8px;
    overflow-wrap: anywhere;
    padding: 12px 0;
    width: 50%;
`;

const ShortItemPropTitle = styled.span`
    color: rgba(7, 7, 7, 1);
`;

const ShortDescriptionContainer = styled.div`
    display: block;
`;

const ShortDescriptionWrapper = styled.div`
    position: relative;
`;

const ShortDescriptionHdrRow = styled.div`
    margin-bottom: 8px;
    align-items: center;
    display: flex;
`;

const ShortDescriptionHdrTitle = styled.h2`
    font-size: 20px;
    line-height: 26px;
    margin-bottom: 8px;
    color: #070707;
    display: inline-block;
    font-weight: 700;
    outline: none;
`;

const ShortDescriptionContantRow = styled.div`
    font-size: 14px;
    line-height: 18px;
    position: relative;
`;

const ShortDescriptionContant = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    line-height: 18px;
    white-space: pre-wrap;
`;

const ShortDescrReadMoreContainer = styled.div`
    background-color: #fff;
    bottom: 0;
    position: absolute;
    right: 0;
    width: 50%;
`;

const ShortDescrReadMoreLink = styled.a`
    text-decoration: none;
    color: #005bff;

    &:hover {
        color: #003ead;
    }

    &:after {
        background: linear-gradient(90deg, hsla(0, 0%, 100%, 0) 0, hsla(0, 0%, 100%, 0) 22%, #fff);
        content: "";
        height: 20px;
        position: absolute;
        right: 100%;
        top: 0;
        width: 180px;
        z-index: 0;
    }
`;

export const Styled = {
    PageTopRowContainer,
    PageTopRowWrapper,
    TopColumnContainer,
    ShareActionsContainer,
    ShareActionBtn,
    ShareActionBtnTitle,
    ShareBtnContainer,
    ProductContainer,
    ProductInfoContainer,
    ProductVisualInfoColumn,
    ProductInfo,
    ProductHeading,
    ProductHdrTitle,
    ProductHdrTitleMore,
    ProductHdrTitleMoreSpan,
    FeedBackRow,
    ReviewTitle,
    RatingStarIcon,
    QuestionsIcon,
    ProductFeedbackLinkReview,
    ProductFeedbackLinkQuestions,
    AboutProductContainer,
    ShortCharacteristics,
    ShortCharacteristicsHdrRow,
    AboutProductTitleContainer,
    ShortCharacteristicsItems,
    LinkToProductDescrContainer,
    LinkToProductDescrDiv,
    LinkToProductDescrTitle,
    LinkToProductDescrIcon,
    LinkToProductDescrBg,
    ShortItem,
    ShortItemPropNameContainer,
    ShortItemPropName,
    ShortItemPropNameTitle,
    ShortItemPropValueContainer,
    ShortItemPropTitle,
    ShortDescriptionContainer,
    ShortDescriptionWrapper,
    ShortDescriptionHdrRow,
    ShortDescriptionHdrTitle,
    ShortDescriptionContantRow,
    ShortDescriptionContant,
    ShortDescrReadMoreContainer,
    ShortDescrReadMoreLink,
    ProductVisualInfoColumnCarousel,
};
