import styled from "styled-components";

const Wallpaper = styled.div`
    background-color: #ffffff;
    background-position: top;
    background-repeat: no-repeat;
    background-size: contain;
    position: relative;
    width: 100%;
`;

const Viewed = styled.div`
    display: flex;
    flex-grow: 1;
    flex: auto;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 24px;
    margin-top: 24px;
    padding: 0 16px;
`;

const Header = styled.div`
    margin-bottom: 24px;
`;

const HeaderTitle = styled.div`
    color: #070707;
    transition: var(--transition);
    transition-property: color;
`;

const ProductListContainer = styled.div`
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

export const Styled = { Wallpaper, Viewed, Header, HeaderTitle, ProductListContainer };
