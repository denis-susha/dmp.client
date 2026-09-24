import Icon from "@/components/common/Icon";
import styled from "styled-components";

const Tab = styled.div`
    height: 450px;
    overflow-y: auto;
    background-color: #fff;
    overflow: hidden;
    flex: 0 1 auto;
    max-width: 100%;
    position: relative;
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
`;

const CopyTab = styled(Tab)`
    height: 400px;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: inherit;
    position: relative;
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
`;

const Box = styled.div`
    display: contents;
`;

const Div = styled.div`
    height: 450px;
    overflow-y: auto;
`;

const DivContainer = styled.div`
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    max-width: 1185px;
    margin-left: auto;
    margin-right: auto;
    padding: 12px;
    width: 100%;
`;

const CopyTabDivContainer = styled(DivContainer)`
    align-items: flex-start;
`;

const ItemContainer = styled.div`
    flex: 1 1 100%;
    max-width: calc(100% + 24px);
    align-items: center;
    justify-content: center;
    margin-left: -12px;
    margin-right: -12px;
    display: flex;
    flex-wrap: wrap;
`;

const QrContainer = styled(ItemContainer)`
    align-items: center;
`;

const FullContainer = styled.div`
    width: 100%;
`;

const PaymentLinkContainer = styled(FullContainer)`
    margin-top: 20px;
`;

const WalletBtnTitleContainer = styled.div`
    display: flex;
    height: 24px;
    white-space: nowrap;
    width: 100%;
    align-items: center;
    justify-content: center;
`;

const WalletBtnBackground = styled.div`
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

const WalletBtnTitle = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
`;

const CopyTabAmountTitle = styled.p`
    justify-content: center;
    display: flex;
    margin-bottom: 16px;
`;

const ShareActionBtn = styled.button`
    width: 100%;
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

const ShareActionBtnIcon = styled(Icon)`
    color: rgba(0, 26, 52, 0.4);
    margin-right: 8px;
    flex-shrink: 0;
    -webkit-font-smoothing: antialiased;
    cursor: pointer;
    color: inherit;
    font: inherit;
    white-space: nowrap;
`;

const ShareActionBtnTitle = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
`;

const SearchResultsSortInput = styled.input`
    padding-right: 32px;
    background: none;
    border: none;
    cursor: pointer;
    outline: none;
    overflow: hidden;
    padding: 10px 16px;
    text-overflow: ellipsis;
    width: 100%;
    font-family: var(--mainFont);
    font-style: normal;
    text-decoration: none;
    text-transform: none;
    word-spacing: normal;
`;

const SearchResultsSortInputWrapper = styled.div`
    width: 100%;
    align-items: center;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: inset 0 0 0 1px rgba(204, 214, 228, 0.6);
    box-sizing: border-box;
    color: #070707;
    cursor: pointer;
    display: flex;
    height: 44px;
    width: 100%;
    position: relative;

    &:hover {
        box-shadow: inset 0 0 0 1px rgba(0, 26, 52, 0.4);
    }

    &.active {
        box-shadow: inset 0 0 0 2px #005bff;
    }
`;

const Popup = styled.div`
    display: inline-flex;

    svg {
        color: rgba(204, 214, 228, 0.6);
    }
`;

const PopupContent = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    justify-content: center;
    cursor: pointer;
`;

const PopupContentTitle = styled.p`
    margin-right: 10px;
`;

const AddressControls = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    justify-content: center;
    flex-direction: column;
`;

export const Styled = {
    Tab,
    CopyTab,
    Container,
    Box,
    Div,
    DivContainer,
    ItemContainer,
    QrContainer,
    FullContainer,
    WalletBtnTitleContainer,
    WalletBtnBackground,
    WalletBtnTitle,
    CopyTabAmountTitle,
    ShareActionBtn,
    ShareActionBtnTitle,
    ShareActionBtnIcon,
    SearchResultsSortInput,
    SearchResultsSortInputWrapper,
    PaymentLinkContainer,
    CopyTabDivContainer,
    Popup,
    PopupContent,
    PopupContentTitle,
    AddressControls,
};
