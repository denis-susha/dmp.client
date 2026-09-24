import styled from "styled-components";

const Container = styled.div`
    contain: content;
    position: relative;
`;

const Favorites = styled.div`
    grid-gap: 1px;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    justify-items: center;
    align-items: stretch;
    justify-content: flex-start;
    transform: translateZ(0);

    .product-card {
        grid-column-start: span var(--grid-column-start-span);
        height: 100%;
        width: 100%;

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
    }
`;

const LeftColumnBox = styled.div`
    align-items: center;
    border-radius: 16px;
    padding-left: 12px;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    flex: 0 0 auto;
`;

const LeftColumnBoxSelected = styled(LeftColumnBox)`
    background-color: #f2f3f5;
    cursor: default;
`;

const LeftColumnTitle = styled.div`
    min-height: 48px;
    align-items: center;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    padding: 8px 16px 8px 0;
    width: 100%;
`;

const LeftColumnIcon = styled.div`
    color: #001a34;
    width: 24px;
    max-width: 24px;
    max-height: 24px;
    flex-shrink: 0;
    font-size: 0;
    line-height: 0;
    margin-right: 12px;
`;

export const Styled = {
    Container,
    Favorites,
    LeftColumnBox,
    LeftColumnTitle,
    LeftColumnIcon,
    LeftColumnBoxSelected,
};
