import { Grid } from "@/components/grid/grid.styles";
import styled from "styled-components";

const Container = styled(Grid.Container)`
    margin: var(--margin-size-grid) auto 0;
`;

const LeftColumn = styled(Grid.Column)<{ $isMobile: boolean }>`
    max-width: ${(props) => (props.$isMobile ? "100%" : "216px")};
    flex-basis: ${(props) => (props.$isMobile ? "100%" : "216px")};
    order: ${(props) => (props.$isMobile ? "2" : "initial")};
`;

const ListContainer = styled.div`
    background-color: #fff;
    border-radius: 24px;
    box-sizing: border-box;
    overflow: hidden;
    padding: 24px;
`;

const LeftColumnContainer = styled(ListContainer)`
    padding: 12px;
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

const ListContainerHeader = styled.div`
    align-items: center;
    box-sizing: border-box;
    display: flex;
    width: 100%;
    word-break: break-word;
    margin-bottom: 16px;
`;

const ListDiv = styled.div`
    background-color: rgba(255, 255, 255, 1);
    border-radius: 24px;
    margin-bottom: 12px;
`;

export const Styled = {
    Container,
    LeftColumn,
    ListContainer,
    LeftColumnContainer,
    Paging,
    PagingWrapper,
    PagingBox,
    ListContainerHeader,
    ListDiv,
};
