import styled from "styled-components";

const StickyContainer = styled.div`
    top: 32px;
    position: sticky;
`;

const Section = styled.section`
    border-radius: 24px;
    background-color: #fff;
    position: relative;
    width: 100%;
`;

const CartOrderContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const CartOrderWrapper = styled.div`
    border-bottom: 1px solid rgba(204, 214, 228, 0.6);
    padding: 24px;
`;

const BtnOrderInnerContainer = styled.div`
    display: flex;
    height: 24px;
    white-space: nowrap;
    width: 100%;
    align-items: center;
    justify-content: center;
`;

const BtnOrderInnerBg = styled.div<{ disabled: boolean }>`
    background-color: ${(props) => (props.disabled ? "#070707" : "#ffffff")};
    border-radius: inherit;
    bottom: 0;
    left: 0;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
`;

const BtnOrderInnerTitle = styled.div<{ disabled: boolean }>`
    opacity: ${(props) => (props.disabled ? "0.4" : "initial")};
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
`;

const AnnotationContainer = styled.div`
    margin-top: 12px;
`;

const AnnotationContent = styled.p`
    color: rgba(0, 26, 52, 0.6);
`;

const OrderBtnFooter = styled.div`
    margin-top: 12px;
`;

const OrderBtnFooterContainer = styled.div`
    align-items: flex-start;
    display: flex;
    font-size: 14px;
    line-height: 18px;
`;

const OrderBtnFooterWrapper = styled.div`
    display: flex;
    width: 100%;
    min-width: 0;
`;

const OrderBtnFooterBox = styled.div`
    color: #707f8d;
    align-items: flex-start;
    justify-content: space-between;
    display: flex;
    width: 100%;
`;

const OrderBtnFooterTitle = styled.span``;

const Summary = styled.div`
    padding: 24px;
`;

const SummaryHdrRow = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding-bottom: 16px;
`;

const SummaryHdrTitle = styled.span`
    color: #070707;
    font-size: 20px;
    font-weight: 700;
    line-height: 1.4em;
`;

const SummaryHdrInfo = styled.span`
    color: rgba(0, 26, 52, 0.6);
    font-size: 14px;
    line-height: 1.29em;
    text-align: end;
`;

const SummaryItemsRow = styled.div`
    display: flex;
    font-size: 14px;
    justify-content: space-between;
    line-height: 18px;
    margin-bottom: 12px;
`;

const SummaryItemsTitleContainer = styled.div`
    align-items: flex-start;
    display: flex;
    flex-direction: column;
`;

const SummaryItemsTitle = styled.span`
    align-items: center;
    display: flex;
`;

const SummaryItemsValue = styled.span`
    font-weight: 700;
`;

const SummaryValueRow = styled.div`
    border-top: 1px solid rgba(204, 214, 228, 0.6);
    color: #070707;
    display: flex;
    font-size: 20px;
    font-weight: 700;
    justify-content: space-between;
    line-height: 1.4em;
    margin-top: 16px;
    padding-top: 16px;
`;

export const Styled = {
    StickyContainer,
    Section,
    CartOrderContainer,
    CartOrderWrapper,
    BtnOrderInnerContainer,
    BtnOrderInnerBg,
    BtnOrderInnerTitle,
    AnnotationContainer,
    AnnotationContent,
    OrderBtnFooter,
    OrderBtnFooterContainer,
    OrderBtnFooterWrapper,
    OrderBtnFooterBox,
    OrderBtnFooterTitle,
    Summary,
    SummaryHdrRow,
    SummaryHdrTitle,
    SummaryHdrInfo,
    SummaryItemsRow,
    SummaryItemsTitleContainer,
    SummaryItemsTitle,
    SummaryItemsValue,
    SummaryValueRow,
};
