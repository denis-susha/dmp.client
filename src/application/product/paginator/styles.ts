import Icon from "@/components/common/Icon";
import { Grid } from "@/components/grid/grid.styles";
import styled from "styled-components";

const Paginator = styled.div`
    min-height: 0px;
    content-visibility: auto;
`;

const SeparatorContainer = styled.div`
    width: 100%;
    flex-direction: column;
    align-items: stretch;
    background: transparent;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
`;

const Separator = styled.div`
    height: 24px;
    max-width: 100%;
`;

const StoresColumn = styled(Grid.Column)<{ $isMobile: boolean }>`
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: ${(props) => (props.$isMobile ? "calc(100% - var(--mobile-gap))" : "calc(75% - var(--margin-size))")};
    max-width: ${(props) => (props.$isMobile ? "calc(100% - var(--mobile-gap))" : "calc(75% - var(--margin-size))")};
`;

const CurrentSeller = styled.div`
    display: block;
`;

const CurrentSellerContainer = styled.div<{ $isMobile: boolean }>`
    border: 1px solid rgba(204, 214, 228, 0.6);
    border-radius: 12px;
    box-sizing: border-box;
    display: flex;
    font-size: 14px;
    letter-spacing: 0.2px;
    padding: 24px;
    position: relative;
    width: 100%;
    flex-wrap: ${(props) => (props.$isMobile ? "wrap" : "nowrap")};
`;

const CurSellerCommonInfoContainer = styled.div<{ $isMobile: boolean }>`
    align-items: center;
    border-right: ${(props) => (props.$isMobile ? "none" : "1px solid rgba(0, 26, 52, 0.4)")};
    border-bottom: ${(props) => (props.$isMobile ? "1px solid rgba(0, 26, 52, 0.4)" : "none")};
    box-sizing: border-box;
    flex-direction: column;
    flex-grow: 0;
    justify-content: center;
    max-width: 396px;
    min-width: ${(props) => (props.$isMobile ? "100%" : "372px")};
    overflow: hidden;
    padding-right: ${(props) => (props.$isMobile ? "0" : "24px")};
    display: flex;
    margin-bottom: ${(props) => (props.$isMobile ? "1rem" : "0")};
    padding-bottom: ${(props) => (props.$isMobile ? "1rem" : "0")};
`;

const CurSellerCommonInfoBox = styled.div`
    display: flex;
    width: 100%;
`;

const StoreInfo = styled.div`
    display: flex;
    width: 100%;
`;

const StoreAvatar = styled.div`
    height: 72px;
    max-height: 72px;
    max-width: 72px;
    width: 72px;
    flex-shrink: 0;
    margin-right: 15px;
    align-items: center;
    background: #fff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    overflow: hidden;
    position: relative;

    &:after {
        background: rgba(0, 48, 120, 0.039);
        content: "";
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
    }
`;

const StoreRatingContainer = styled.div<{ $isMobile: boolean }>`
    align-items: center;
    flex-grow: 1;
    flex-wrap: wrap;
    padding-left: 16px;
    display: flex;
    width: ${(props) => (props.$isMobile ? "100%" : "auto")};
`;

const StoreRating = styled.ul`
    list-style: none;
`;

const StoreRatingItem = styled.li`
    position: relative;
    width: 100%;
`;

const StoreRatingItemBox = styled.div`
    align-items: center;
    display: flex;
`;

const StoreRatingIcon = styled(Icon)`
    align-self: baseline;
    flex-grow: 0;
    flex-shrink: 0;
    margin-right: 8px;
`;

const StoreRatingTitle = styled.span`
    display: inline-block;
`;

const StoreRatingTitleDigitals = styled.span`
    font-weight: 700;
`;

export const Styled = {
    Paginator,
    SeparatorContainer,
    Separator,
    StoresColumn,
    CurrentSeller,
    CurrentSellerContainer,
    CurSellerCommonInfoContainer,
    CurSellerCommonInfoBox,
    StoreInfo,
    StoreAvatar,
    StoreRating,
    StoreRatingItem,
    StoreRatingItemBox,
    StoreRatingIcon,
    StoreRatingContainer,
    StoreRatingTitle,
    StoreRatingTitleDigitals,
};
