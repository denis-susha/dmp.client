import { Grid } from "@/components/grid/grid.styles";
import Image from "next/image";
import styled, { css } from "styled-components";

const PageLayout = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    a {
        color: #005bff;
    }
`;

const PageHeaderContainer = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
`;

const PaymentInfoContainer = styled.div`
    background: #fff;
    border-radius: 2px;
    box-sizing: border-box;
    display: flex;
    flex: 1 0 auto;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
`;

const PaymentInfoWrapper = styled.div`
    height: 100%;
    padding: 24px;
`;

const PaymentInfoHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
`;

const PaymentInfoHeaderWrapper = styled.div`
    align-items: center;
    box-sizing: border-box;
    display: flex;
    width: 100%;
    word-break: break-word;
`;

const PaymentInfoMethods = styled.div`
    margin-left: -24px;
    margin-right: -24px;
`;

const PaymentInfoMethodsContainer = styled.div`
    display: flex;
    flex-direction: column;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    position: relative;
    transform: translateZ(0);
`;

const PaymentInfoMethodsWrapper = styled.div`
    flex-grow: 1;
    overflow: hidden;
`;

const PaymentInfoMethodsBox = styled.div`
    transition-duration: 300ms;
    transform: translateX(0px);
    display: flex;
    font-size: 0;
    position: relative;
    transition: all;
    white-space: nowrap;
    will-change: transform;
`;

const PaymentInfoMethodsItemContainer = styled.div`
    padding-left: 24px;
    padding-top: 10px;
    position: relative;
    transform: translateZ(0);
    flex-shrink: 0;
    font-size: medium;
    height: 100%;
    vertical-align: top;
    white-space: normal;
`;

const PaymentInfoMethodsItem = styled.div`
    align-items: stretch;
    border: 2px solid #005bff;
    border-radius: 6px;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-flex;
    flex-shrink: 0;
    height: 74px;
    min-width: 116px;
    padding: 4px;
    position: relative;
    white-space: normal;
`;

const PaymentInfoMethodsItemInner = styled.div`
    background-color: #ffffff;
    background-size: cover;
    border-radius: 3px;
    min-height: 46px;
    padding: 8px;
    width: 100%;
`;

const PaymentMethodIconContainer = styled.div`
    align-items: center;
    display: flex;
    height: 24px;
    justify-content: center;
`;

const PaymentMethodIconWrapper = styled.div`
    display: flex;
    height: 24px;
`;

const PaymentMethodTitleContainer = styled.div`
    color: #070707;
    display: flex;
    justify-content: center;
    margin-top: 6px;
    text-align: center;
`;

const PaymentMethodTitleWrapper = styled.div`
    color: #001a34;
    align-items: center;
    box-sizing: border-box;
    display: flex;
    width: 100%;
    word-break: break-word;
`;

const DeliverySection = styled.section`
    align-items: center;
    box-sizing: border-box;
    display: flex;
    min-height: 48px;
    padding: 12px 0;
`;

const DeliverySectionTitleContainer = styled.div`
    color: rgba(0, 26, 52, 0.6);
    align-items: center;
    box-sizing: border-box;
    display: flex;
    width: 100%;
    word-break: break-word;
`;

const DeliveryMethodSection = styled.section`
    background: #fff;
    display: flex;
    flex-direction: column;
    padding: 20px 0;
    position: relative;
`;

const DeliveryMethodHdrContainer = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 0 24px;
`;

const DeliveryMethodHdrWrapper = styled.div`
    color: rgba(0, 26, 52, 1);
    -webkit-line-clamp: 1;
    min-height: auto !important;
    word-break: break-all;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
`;

const DeliveryMethodTitle = styled.div`
    padding-left: 24px;
    display: flex;
    width: auto;
`;

const DeliveryMethodIcon = styled.div`
    padding-top: 10px;
    padding-bottom: 10px;
    padding-right: 8px;
    align-items: flex-start;
    display: flex;
`;

const DeliveryMethodIconWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const DeliveryMethodIconBox = styled.div`
    color: rgba(7, 7, 7, 1);
    height: 24px;
    width: 24px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    align-items: center;
    box-sizing: border-box;
    display: flex;
    font-family: var(--mainFont);
    justify-content: center;
    position: relative;
    vertical-align: top;
`;

const DeliveryMethodTitleText = styled.span`
    color: rgba(7, 7, 7, 1);
`;

const SeparatorColumn = styled(Grid.Column)<{ $isMobile: boolean }>`
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: ${(props) => (props.$isMobile ? "0" : "calc(8.3333% - var(--margin-size))")};
    max-width: ${(props) => (props.$isMobile ? "0" : "calc(8.3333% - var(--margin-size))")};
`;

const PaymentInfoColumn = styled(Grid.Column)<{ $isMobile: boolean }>`
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: ${(props) =>
        props.$isMobile ? "calc(100% - var(--margin-size-grid))" : "calc(58.3333% - var(--margin-size))"};
    max-width: ${(props) =>
        props.$isMobile ? "calc(100% - var(--margin-size-grid))" : "calc(58.3333% - var(--margin-size))"};
`;

const SummaryColumn = styled(Grid.Column)<{ $isMobile: boolean }>`
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: ${(props) =>
        props.$isMobile ? "calc(100% - var(--margin-size-grid))" : "calc(41.6666% - var(--margin-size))"};
    max-width: ${(props) =>
        props.$isMobile ? "calc(100% - var(--margin-size-grid))" : "calc(41.6666% - var(--margin-size))"};

    ${(props) =>
        props.$isMobile &&
        css`
            margin-bottom: 1rem;
        `};
`;

const Items = styled.div`
    background-color: #fff;
    border-radius: 2px;
    margin: 0 0 24px;
    position: relative;
`;

const ItemsHeader = styled.div`
    padding: 24px;
`;

const ItemsHeaderTitle = styled.div`
    align-items: flex-start;
    display: flex;
    justify-content: space-between;
`;

const ItemsHeaderTotal = styled.div`
    color: rgba(0, 26, 52, 0.6);
    margin-top: 4px;
    align-items: center;
    box-sizing: border-box;
    display: flex;
    width: 100%;
    word-break: break-word;
`;

const ItemsHeaderTitleBox = styled.div`
    display: flex;
`;

const ItemsHeaderTitleWrapper = styled.div`
    align-items: center;
    box-sizing: border-box;
    display: flex;
    width: 100%;
    word-break: break-word;
`;

const ItemsList = styled.div`
    display: flex;
    flex-direction: column;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    padding-bottom: 24px;
    margin: 0 24px;
`;

const ItemsListContainer = styled.div`
    flex-grow: 1;
    overflow: hidden;
`;

const ItemsListWrapper = styled.div`
    display: flex;
    font-size: 0;
    position: relative;
    transition: all;
    white-space: nowrap;
    will-change: transform;
    flex-wrap: wrap;
`;

const Item = styled.div`
    width: 116px;
    padding-right: 24px;
    position: relative;
    transform: translateZ(0);
    flex-shrink: 0;
    font-size: medium;
    height: 100%;
    vertical-align: top;
    white-space: normal;
`;

const ItemImgContainer = styled.div`
    width: 92px;
    height: 92px;
    border: none;
    align-items: center;
    cursor: pointer;
    display: flex;
    justify-content: center;
    position: relative;
`;

const ItemImg = styled(Image)`
    max-height: 100%;
    max-width: 100%;
    border: none;
    outline: none;
`;

const ItemPriceContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 8px;
`;

const ItemPriceWrapper = styled.div`
    color: rgba(0, 26, 52, 0.6);
    justify-content: center;
    text-align: center;
    align-items: center;
    box-sizing: border-box;
    display: flex;
    width: 100%;
    word-break: break-word;
`;

const ItemQuantity = styled.div`
    background: rgba(245, 247, 250, 1);
    color: rgba(0, 26, 52, 0.6);
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
    bottom: 0;
    left: 50%;
    position: absolute;
    transform: translateX(-50%);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    align-items: center;
    box-sizing: border-box;
    cursor: default;
    display: inline-flex;
    font-family: var(--mainFont);
    justify-content: center;
    max-width: 100%;
    padding: 2px 8px;
`;

const ItemQuantityContainer = styled.div`
    align-items: center;
    display: flex;
    overflow: hidden;
`;

const ItemQuantityText = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const Styled = {
    SeparatorColumn,
    PaymentInfoColumn,
    SummaryColumn,
    PageLayout,
    PageHeaderContainer,
    PaymentInfoContainer,
    PaymentInfoWrapper,
    PaymentInfoHeader,
    PaymentInfoHeaderWrapper,
    PaymentInfoMethods,
    PaymentInfoMethodsContainer,
    PaymentInfoMethodsWrapper,
    PaymentInfoMethodsBox,
    PaymentInfoMethodsItemContainer,
    PaymentInfoMethodsItem,
    PaymentInfoMethodsItemInner,
    PaymentMethodIconContainer,
    PaymentMethodIconWrapper,
    PaymentMethodTitleContainer,
    PaymentMethodTitleWrapper,
    DeliverySection,
    DeliverySectionTitleContainer,
    DeliveryMethodSection,
    DeliveryMethodHdrContainer,
    DeliveryMethodHdrWrapper,
    DeliveryMethodTitle,
    DeliveryMethodTitleText,
    DeliveryMethodIcon,
    DeliveryMethodIconWrapper,
    DeliveryMethodIconBox,
    Items,
    ItemsHeader,
    ItemsHeaderTitle,
    ItemsHeaderTitleBox,
    ItemsHeaderTitleWrapper,
    ItemsList,
    ItemsListContainer,
    ItemsListWrapper,
    Item,
    ItemImgContainer,
    ItemImg,
    ItemPriceContainer,
    ItemPriceWrapper,
    ItemsHeaderTotal,
    ItemQuantity,
    ItemQuantityContainer,
    ItemQuantityText,
};
