import styled from "styled-components";

const OrderDetailsContainer = styled.div<{ $isMobile: boolean }>`
    grid-gap: 12px;
    display: grid;
    grid-template-columns: ${(props) => (props.$isMobile ? "100%" : "calc(100% - 412px) 400px")};
    padding: 12px 0;
`;

const OrderContainer = styled.div`
    position: relative;
    z-index: 1;
`;

const MainOrderInfoContainer = styled.div`
    background-color: rgba(255, 255, 255, 1);
    border-radius: 24px;
    margin-bottom: 12px;
    padding: 24px 0px 24px 0px;
`;

const MainOrderInfoHdrContainer = styled.div`
    padding: 0px 24px 0px 24px;
`;

const InfoHdrWrapper = styled.div`
    color: rgba(7, 7, 7, 1);
    margin-bottom: 4px;
    width: auto;
    align-items: center;
    box-sizing: border-box;
    display: flex;
    word-break: break-word;
`;

const DeliveryInfoContainer = styled.div`
    margin-top: 1em;
    padding: 0px 24px 0px 24px;
`;

const DeliveryInfoBox = styled.div`
    display: flex;
    width: auto;
`;

const Divider = styled.div`
    &::after {
        content: "";
        display: block;
        border-top: 1px solid #333;
        margin: 20px 0;
    }
`;

const Download = styled.div`
    width: 100%;
    border: 2px dashed rgba(7, 7, 7, 1);
    border-radius: 8px;
    padding: 15px 10px;

    > div {
        &:last-child {
            margin-bottom: 0;
        }
    }
`;

const DownloadItem = styled.div`
    align-items: center;
    display: flex;
    margin-bottom: 10px;
`;

const DownloadItemIconContainer = styled.div`
    display: flex;
    height: 32px;
    margin-right: 10px;
    width: 32px;
`;

const DownloadItemInfoContainer = styled.div`
    flex: 1;
    margin-right: 10px;
    overflow: hidden;
`;

const DownloadItemInfoTitle = styled.div`
    color: #24282d;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-word;
`;

const LineItemInfoTitle = styled(DownloadItemInfoTitle)`
    white-space: initial;
`;

const DownloadItemInfoSubtitle = styled.div`
    color: #6d7883;
    font-size: 12px;
`;

export const Styled = {
    OrderDetailsContainer,
    OrderContainer,
    MainOrderInfoContainer,
    MainOrderInfoHdrContainer,
    InfoHdrWrapper,
    DeliveryInfoContainer,
    DeliveryInfoBox,
    Download,
    DownloadItem,
    DownloadItemIconContainer,
    DownloadItemInfoContainer,
    DownloadItemInfoTitle,
    DownloadItemInfoSubtitle,
    Divider,
    LineItemInfoTitle,
};
