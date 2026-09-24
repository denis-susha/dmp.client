import styled from "styled-components";

const StickyContainer = styled.div`
    position: sticky;
    top: 76px;
`;

const SummationContainer = styled.div`
    background-color: rgba(255, 255, 255, 1);
    border-radius: 24px;
    margin-bottom: 12px;
    padding: 4px 0px 24px 0px;
`;

const OrderDoneTotal = styled.div<{ $isMobile: boolean }>`
    min-width: ${(props) => (props.$isMobile ? "100%" : "365px")};
    padding: 4px 8px 8px;
`;

const OrderDoneTotalInfoContainer = styled.div`
    background-color: rgba(245, 247, 250, 1);
    border-radius: 16px;
    padding: 16px;

    > div {
        &:last-child {
            margin-bottom: 0;
        }
    }
`;

const OrderDoneTotalInfoOrderRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
`;

const OrderDoneTotalTitleContainer = styled.div`
    display: flex;
    gap: 4px;
    padding-right: 18px;
`;

const OrderDoneTotalValueContainer = styled.div`
    flex-shrink: 0;
`;

const OrderDoneTotalYourOrderTitle = styled.div`
    color: rgba(7, 7, 7, 1);
    align-items: center;
    box-sizing: border-box;
    display: flex;
    width: 100%;
    word-break: break-word;
`;

const OrderDoneTotalYourOrderValue = styled.div`
    color: rgba(0, 26, 52, 0.6);
    align-items: center;
    box-sizing: border-box;
    display: flex;
    width: 100%;
    word-break: break-word;
`;

const OrderDoneTotalValue = styled(OrderDoneTotalYourOrderValue)`
    color: #070707;

    span {
        margin-right: 4px;
    }
`;

const OrderDoneTotalAmountContainer = styled.div`
    margin-bottom: 4px;
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
    padding: 0 16px;
`;

const OrderDoneTotalAmountTitleWrapper = styled.div`
    padding-right: 18px;
`;

const OrderDoneTotalAmountTitleSum = styled.div`
    display: flex;
`;

const OrderDoneTotalAmountSubtitleSum = styled.div`
    color: rgba(0, 26, 52, 0.6);
    align-items: center;
    box-sizing: border-box;
    display: flex;
    width: 100%;
    word-break: break-word;
`;

export const Styled = {
    StickyContainer,
    SummationContainer,
    OrderDoneTotal,
    OrderDoneTotalInfoContainer,
    OrderDoneTotalInfoOrderRow,
    OrderDoneTotalTitleContainer,
    OrderDoneTotalYourOrderTitle,
    OrderDoneTotalValueContainer,
    OrderDoneTotalYourOrderValue,
    OrderDoneTotalValue,
    OrderDoneTotalAmountContainer,
    OrderDoneTotalAmountTitleWrapper,
    OrderDoneTotalAmountTitleSum,
    OrderDoneTotalAmountSubtitleSum,
};
