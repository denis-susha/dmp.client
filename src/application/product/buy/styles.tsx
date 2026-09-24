import { Grid } from "@/components/grid/grid.styles";
import styled from "styled-components";

const ProductBuyColumn = styled(Grid.Column)`
    margin-bottom: 0px;
    margin-left: 0px;
`;

const ProductBuyInfoContainer = styled.div`
    position: sticky;
    top: 72px;
    width: 388px;
    row-gap: 2px;
    flex-direction: column;
    column-gap: 2px;
    align-items: stretch;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
`;

const CartPriceContainer = styled.div`
    padding: 8px 0px;
    width: 388px;
    row-gap: 4px;
    flex-direction: column;
    column-gap: 4px;
    align-items: stretch;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
`;

const CartPriceWrapper = styled.div`
    width: 100%;
    background-color: #f5f7fa;
    border-radius: 20px;
    font-size: 14px;
    line-height: 18px;
    position: relative;
`;

const CartPriceDiv = styled.div`
    border: none;
    box-shadow:
        0 20px 12px -16px rgba(0, 30, 85, 0.1),
        0 8px 24px 18px rgba(0, 30, 85, 0.05);
    background-color: #fff;
    border-radius: 20px;
    box-sizing: border-box;
    min-height: 66px;
    padding: 20px;
    position: relative;
    width: 100%;
`;

const PriceRow = styled.div`
    margin-bottom: 12px;
    width: 100%;
`;

const EmptyRow = styled.div`
    margin-top: 12px;
    width: 100%;
`;

const PriceDiv = styled.div`
    flex-direction: column;
    display: flex;
`;

const PriceBox = styled.div`
    align-items: baseline;
    display: flex;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const PriceWrapper = styled.div`
    align-items: baseline;
    display: flex;
    flex: 0 1 auto;
    flex-direction: row;
    min-width: 0;
`;

const PriceValueWrapper = styled.div`
    color: rgba(0, 26, 52, 0.6);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    align-items: baseline;
    display: flex;
`;

const PriceValue = styled.span`
    font-size: 30px;
    letter-spacing: 0.4px;
    line-height: 38px;
    font-weight: 700;
    color: #070707;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const PopupWrapper = styled.div`
    flex-shrink: 0;
    margin-bottom: 6px;
    margin-left: 4px;
    margin-top: auto;
`;

const Popup = styled.div`
    display: inline-flex;

    svg {
        color: rgba(204, 214, 228, 0.6);
    }
`;

const AddToCartRow = styled.div`
    margin-top: 12px;
    width: 100%;
`;

const AddToCartContainer = styled.div`
    width: auto;
    column-gap: 8px;
    align-items: flex-start;
    background: transparent;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
`;

const AddToCart = styled.div`
    width: 100%;
    position: relative;
`;

const AddToCartBtnContainer = styled.div`
    position: relative;
`;

const AddToCartBtnWrapper = styled.div`
    width: 100%;
    display: inline-flex;
`;

const AddToCartBtnBox = styled.div`
    width: 100%;
`;

const AddToCartBtnBoxContainer = styled.div`
    width: 100%;
    display: inline-flex;
`;

const AddToCartBtnBasementContainer = styled.div`
    padding-top: 8px;
    text-align: center;
`;

const AddToCartBtnBasementWrapper = styled.div`
    display: flex;
    flex-shrink: 0;
    font-size: 12px;
    justify-content: center;
    letter-spacing: 0.2px;
    line-height: 16px;
`;

const AddToCartBtnBasementTitle = styled.span`
    display: inline-block;
`;

const AddToCartBtn = styled.button`
    background: rgba(0, 91, 255, 1);
    color: rgba(255, 255, 255, 1);
    border-radius: 12px;
    padding: 16px 24px;
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
    box-sizing: border-box;
    cursor: pointer;
    display: inline-flex;
    font-family: var(--mainFont);
    font-size: inherit;
    font-weight: inherit;
    margin: 0;
    overflow: hidden;
    position: relative;
    text-align: center;
    text-decoration: none;
`;

const AddToCartBtnTitleContainer = styled.div`
    display: flex;
    height: 24px;
    white-space: nowrap;
    width: 100%;
    align-items: center;
    justify-content: center;
`;

const AddToCartBtnBackground = styled.div`
    background-color: rgba(255, 255, 255, 1);
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

const AddToCartBtnTitle = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
`;

const BuyInOneClickContainer = styled.div`
    padding: 12px 0px;
    width: auto;
    row-gap: 24px;
    flex-direction: column;
    column-gap: 24px;
    align-items: stretch;
    background: transparent;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
`;

const BuyInOneClickWrapper = styled.div`
    width: auto;
    column-gap: 4px;
    align-items: flex-start;
    background: transparent;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
`;

const OneClickButton = styled.button`
    color: #005bff;
    background-color: rgba(0, 150, 255, 0.078);
    border-radius: 12px;
    padding: 16px 24px;
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
    box-sizing: border-box;
    cursor: pointer;
    display: inline-flex;
    font-family: var(--mainFont);
    font-size: inherit;
    font-weight: inherit;
    margin: 0;
    overflow: hidden;
    position: relative;
    text-align: center;
    text-decoration: none;
`;

const OneClickButtonTitleContainer = styled.div`
    display: flex;
    height: 24px;
    white-space: nowrap;
    width: 100%;
    align-items: center;
    justify-content: center;
`;

const OneClickButtonTitle = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
`;

const OneClickButtonBg = styled.div`
    background-color: #005bff;
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

export const Styled = {
    ProductBuyInfoContainer,
    CartPriceContainer,
    CartPriceWrapper,
    CartPriceDiv,
    PriceRow,
    PriceDiv,
    PriceBox,
    PriceWrapper,
    PriceValueWrapper,
    PriceValue,
    PopupWrapper,
    Popup,
    EmptyRow,
    AddToCartRow,
    AddToCartContainer,
    AddToCart,
    AddToCartBtnContainer,
    AddToCartBtnWrapper,
    AddToCartBtnBox,
    AddToCartBtnBoxContainer,
    AddToCartBtn,
    AddToCartBtnTitleContainer,
    AddToCartBtnTitle,
    AddToCartBtnBasementContainer,
    AddToCartBtnBasementWrapper,
    AddToCartBtnBasementTitle,
    AddToCartBtnBackground,
    BuyInOneClickContainer,
    BuyInOneClickWrapper,
    OneClickButton,
    OneClickButtonTitleContainer,
    OneClickButtonTitle,
    OneClickButtonBg,
    ProductBuyColumn,
};
