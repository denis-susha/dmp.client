import { Grid } from "@/components/grid/grid.styles";
import styled from "styled-components";

const SortingRow = styled(Grid.Row)`
    --margin-size: 24px;
`;

const RowFiltersRow = styled(Grid.Row)`
    --margin-size: 24px;
`;

const FiltersColumn = styled(Grid.Column)`
    max-width: 200px;
    flex-basis: 200px;
`;

const FiltersDesktop = styled.div<{ $isMobile: boolean }>`
    min-height: ${(props) => (props.$isMobile ? "initial" : "3308px")};
    max-height: 12215px;
    flex-grow: 1;
    position: relative;
`;

const FiltersAside = styled.aside`
    transform: none;
    position: relative;
    display: flex;
    flex: 0 0 205px;
    flex-wrap: wrap;
    margin-right: 20px;
    padding-bottom: 16px;
    width: 205px;
`;

const ResultsHeader = styled.div<{ $isMobile: boolean }>`
    display: flex;
    justify-content: space-between;
    margin-bottom: ${(props) => (props.$isMobile ? "8px" : "16px")};
`;

const HeaderContent = styled.div`
    display: flex;
    align-items: center;
    min-width: 0;
`;

const Header = styled.h1`
    font-size: 30px;
    font-weight: 700;
    line-height: 38px;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: var(--title-font);
    font-style: normal;
    letter-spacing: normal;
    text-decoration: none;
    text-transform: none;
    word-spacing: normal;

    @media ${({ theme }) => theme.media.md} {
        font-size: 26px;
    }
`;

const HeaderCountContent = styled.div`
    align-items: center;
    display: flex;
    color: #99a3ae;
    font-size: 14px;
    margin-left: 4px;
`;

const MegaPaginator = styled.div`
    position: relative;
`;

const SearchResultsContainer = styled.div`
    position: relative;
    z-index: 1;
`;

const Products = styled.div`
    grid-gap: 1px;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    justify-items: center;
    align-items: stretch;
    flex-wrap: wrap;
    justify-content: flex-start;
    transform: translateZ(0);
`;

const ProductItem = styled.div`
    grid-column-start: span var(--grid-column-start-span);
    height: 100%;
    width: 100%;
    -webkit-user-drag: none;
    align-items: stretch;
    border-top: 1px solid rgba(204, 214, 228, 0.6);
    box-sizing: border-box;
    color: #070707;
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    justify-content: flex-start;
    justify-self: stretch;
    position: relative;
    -moz-user-select: text;
    user-select: text;
    --grid-column-start-span: 3;

    @media ${({ theme }) => theme.media.md} {
        --grid-column-start-span: 4;
    }

    @media ${({ theme }) => theme.media.sm} {
        --grid-column-start-span: 6;
    }

    @media ${({ theme }) => theme.media.xs} {
        --grid-column-start-span: 12;
    }
`;

const SearchResultsSortWrapper = styled.div<{ $isMobile: boolean }>`
    margin-bottom: 8px;
    margin-top: ${(props) => (props.$isMobile ? "8px" : "12px")};
    max-width: ${(props) => (props.$isMobile ? "150px" : "230px")};
    display: block;
`;

const SearchResultsSortDiv = styled.div<{ $isMobile: boolean }>`
    position: relative;
    font-family: var(--mainFont);
    padding: ${(props) => (props.$isMobile ? "0" : "8px 0")};
`;

const AdditionalSortBlock = styled(Grid.Column)`
    max-width: 440px;
    flex-basis: 440px;
`;

const Paging = styled.div`
    border-top: 1px solid #f5f7fa;
    display: flex;
    justify-content: center;
    padding-top: 24px;
    margin-bottom: 24px;
`;

const PagingWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
`;

const PagingBox = styled.div`
    margin-bottom: 16px;
    display: flex;
`;

export const Styled = {
    ResultsHeader,
    HeaderContent,
    Header,
    HeaderCountContent,
    FiltersColumn,
    FiltersDesktop,
    FiltersAside,
    SortingRow,
    RowFiltersRow,
    MegaPaginator,
    SearchResultsContainer,
    Products,
    SearchResultsSortWrapper,
    SearchResultsSortDiv,
    AdditionalSortBlock,
    Paging,
    PagingWrapper,
    PagingBox,
    ProductItem,
};
