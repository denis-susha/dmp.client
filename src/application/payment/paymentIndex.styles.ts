import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";
import { Grid } from "@/components/grid/grid.styles";
import styled, { css } from "styled-components";

const WrapperRow = styled(Grid.Row)`
    justify-content: center;
    margin-bottom: 20px;
`;

const Container = styled.div`
    padding: 20px;
    width: 500px;

    background: #fff;
    border-radius: 2px;
    box-sizing: border-box;
`;

const LogoContainer = styled.div`
    max-height: 40px;
    width: 100%;
    margin-bottom: 8px;
    display: flex;
    justify-content: center;

    img {
        max-height: 100%;
        max-width: 100%;
    }
`;

const SeparatorColumn = styled(Grid.Column)`
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: calc(8.3333% - var(--margin-size));
    max-width: calc(8.3333% - var(--margin-size));
`;

const PageLayout = styled.div`
    min-height: calc(100vh - 80px);
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

const ListRow = styled.div`
    align-items: center;
    display: flex;
    flex: 1 1 100%;
    letter-spacing: normal;
    min-height: 48px;
    outline: none;
    padding: 0 16px;
    position: relative;
    -webkit-text-decoration: none;
    text-decoration: none;
`;

const PayWithContainer = styled(ListRow)`
    min-height: 40px;

    @media ${({ theme }) => theme.media.md} {
        min-height: 100px;
    }
`;

const PayWithContent = styled.div`
    padding: 8px 0;
    align-items: center;
    align-self: center;
    display: flex;
    flex: 1 1;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const TimelineContainer = styled.div`
    height: 20px;
`;

const SearchResultsSortWrapper = styled.div`
    max-width: 230px;
    min-width: 230px;
    display: block;
`;

const SearchResultsSortDiv = styled.div`
    position: relative;
    font-family: var(--mainFont);
`;

const Hr = styled.hr`
    border: solid;
    border-width: thin 0 0;
    display: block;
    flex: 1 1 0px;
    height: 0;
    max-height: 0;
    max-width: 100%;
    transition: inherit;
    overflow: visible;

    ${() => css`
        border-color: rgba(0, 0, 0, 0.12);
    `}
`;

const Amount = styled.div`
    align-items: flex-end;
    align-self: stretch;
    flex-direction: column;
    justify-content: space-between;
    white-space: nowrap;
    display: inline-flex;
    min-width: 24px;
    margin: 12px 0;
`;

const AmountValue = styled.div`
    align-self: flex-end;
    line-height: 1rem;
`;

const AmountValueSmall = styled(AmountValue)`
    color: rgba(0, 0, 0, 0.6);
`;

const CurrencyInfo = styled.div`
    display: contents;
`;

const ShowMoreBtnContainer = styled.div`
    margin-top: -35px !important;
    margin-bottom: 0 !important;
    display: flex;
    flex: 1 1 auto;
    flex-wrap: wrap;
    justify-content: center;
`;

const ShowMoreBtn = styled(Button)`
    background-color: rgba(0, 48, 120, 0.039);
    color: rgba(0, 26, 52, 1);
    margin-right: 8px;
    height: 32px;
    min-width: 32px;
`;

const ShowMoreBtnIcon = styled(Icon)<{ $isOpen: boolean }>`
    transform: ${(props) => (props.$isOpen ? "rotate(-90deg)" : "rotate(90deg)")};
`;

const CartItemGridDescrActionBtnInner = styled.div`
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

const ScanTab = styled.div`
    height: 450px;
    overflow-y: auto;
    background-color: #fff;
    overflow: hidden;
    flex: 0 1 auto;
    max-width: 100%;
    position: relative;
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
`;

export const Styled = {
    SeparatorColumn,
    PageLayout,
    PageHeaderContainer,
    Container,
    WrapperRow,
    LogoContainer,
    PayWithContainer,
    PayWithContent,
    TimelineContainer,
    SearchResultsSortWrapper,
    SearchResultsSortDiv,
    Hr,
    Amount,
    AmountValue,
    CurrencyInfo,
    ShowMoreBtnContainer,
    ShowMoreBtnIcon,
    ShowMoreBtn,
    CartItemGridDescrActionBtnInner,
    AmountValueSmall,
    ScanTab,
};
