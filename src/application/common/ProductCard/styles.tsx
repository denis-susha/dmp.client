import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    left: 0;
    overflow: hidden;
    right: 0;
    top: 0;
    transform: translateZ(0);
    transition: none;
`;

const ImgContainer = styled(Link)`
    text-decoration: none;
    color: #005bff;
`;

const ImgInnerContainer = styled.div`
    align-items: center;
    display: flex;
    margin: 16px;
    position: relative;
    transform: translateZ(0);

    &:before {
        padding-top: 100%;
        content: "";
        display: block;
        width: 100%;
    }
`;

const ImgDiv = styled.div`
    align-items: center;
    background-color: #fff;
    border-radius: 12px;
    bottom: 0;
    display: flex;
    height: 100%;
    justify-content: center;
    left: 0;
    overflow: hidden;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
`;

const Img = styled(Image)`
    height: 100%;
    object-fit: contain;
    width: 100%;
    max-height: 100%;
    max-width: 100%;
    border: none;
    outline: none;
`;

const ImgBackground = styled.div`
    background: rgba(0, 48, 120, 0.039);
    border-radius: 12px;
    pointer-events: none;
    right: 0;
    top: 0;
    bottom: 0;
    left: 0;
    position: absolute;
`;

const DataContainer = styled.div`
    align-items: flex-start;
    box-sizing: border-box;
    display: flex;
    flex: 1 0 auto;
    flex-direction: column;
    justify-content: flex-start;
    padding: 0 16px 16px;
    width: 100%;
`;

const PriceDiv = styled.div`
    padding-bottom: 4px;
    margin-bottom: 0;
    width: 100%;
    display: inline-flex;
    position: relative;
    align-items: end;
    max-width: 100%;
`;

const CurrentPrice = styled.div`
    align-items: baseline;
    overflow: hidden;
    display: inline-flex;
    position: relative;
`;

const CurrentPriceValue = styled.span`
    margin-right: 4px;
    background-image: linear-gradient(225deg, rgb(248, 17, 85) 0%, rgb(248, 17, 85) 100%);
    -webkit-text-fill-color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    display: inline;
    white-space: nowrap;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 0.4px;
    line-height: 24px;
`;

const ProductName = styled(Link)`
    color: #070707;
    max-width: 100%;
    margin-bottom: 4px;
    text-decoration: none;
`;

const ProductNameDiv = styled.div`
    margin-bottom: 4px;
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

const ProductRatingContainer = styled.div`
    text-align: left;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    box-sizing: border-box;
    cursor: default;
    width: 100%;
    word-break: break-word;
`;

const SpanTitle = styled.span`
    margin-right: 4px;
    white-space: pre-wrap;

    svg {
        display: inline;
        flex-shrink: 0;
        margin-right: 2px;
        vertical-align: text-top;
    }

    .rating-star {
        color: rgb(255, 168, 0);
    }

    .review {
        color: rgba(0, 26, 52, 0.4);
    }
`;

const ProductRatingValue = styled.span`
    color: rgb(7, 7, 7);
    white-space: pre-wrap;
`;

const ProductReviewValue = styled.span`
    color: rgba(0, 26, 52, 0.6);
    white-space: pre-wrap;
`;

const BuyButtonContainer = styled.div`
    display: flex;
    align-items: stretch;
    flex-direction: column;
    justify-content: flex-end;
    margin-top: auto;
    padding-top: 12px;
    width: 100%;
`;

const BuyButtonWrapper = styled.div`
    flex-grow: 1;
    justify-content: space-between;
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
`;

const BuyButton = styled.button`
    background-color: #005bff;
    color: #fff;
    width: 100%;
    align-items: center;
    justify-content: center;
    -webkit-touch-callout: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    border-radius: 8px;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-flex;
    font-family: var(--mainFont);
    font-size: inherit;
    font-weight: inherit;
    margin: 0;
    overflow: hidden;
    padding: 10px 16px;
    position: relative;
    text-align: center;
    text-decoration: none;
`;

const BuyButtonInnerContainer = styled.div`
    display: flex;
    height: 24px;
    white-space: nowrap;
    width: 100%;
    align-items: center;
    justify-content: center;
`;

const BuyButtonTitle = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
`;

const BuyButtonShape = styled.div`
    background-color: rgb(255, 255, 255);
    border-radius: inherit;
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

const Favorites = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 20px;
    top: 20px;
    z-index: 4;
`;

const FavoritesBox = styled.div`
    border-radius: 6px;
    display: inline-flex;
`;

export const Styled = {
    Wrapper,
    ImgContainer,
    ImgInnerContainer,
    ImgDiv,
    Img,
    ImgBackground,
    DataContainer,
    PriceDiv,
    CurrentPrice,
    CurrentPriceValue,
    ProductName,
    ProductNameDiv,
    ProductRatingContainer,
    SpanTitle,
    ProductRatingValue,
    ProductReviewValue,
    BuyButtonContainer,
    BuyButtonWrapper,
    BuyButton,
    BuyButtonInnerContainer,
    BuyButtonTitle,
    BuyButtonShape,
    Favorites,
    FavoritesBox,
};
