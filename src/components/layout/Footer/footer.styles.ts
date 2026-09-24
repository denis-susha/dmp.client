import Link from "next/link";
import styled from "styled-components";

const Footer = styled.footer`
    background-color: #f5f7fa;
    flex-wrap: wrap;
    margin: 40px 0 0;
    width: 100;
    box-shadow: inset 0 0 0 1px rgba(204, 214, 228, 0.6);
    margin-top: 15px;
`;

const HeaderTitle = styled.span`
    margin-bottom: 8px;
`;

const StyledLink = styled(Link)`
    margin-bottom: 8px;
    color: rgba(0, 26, 52, 0.6);
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: var(--transition);
    transition-property: color;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    width: 25%;

    @media ${({ theme }) => theme.media.md} {
        width: 50%;
    }

    @media ${({ theme }) => theme.media.sm} {
        width: 100%;
    }
`;

const Legend = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    flex-wrap: wrap;
`;

export const Styled = {
    Footer,
    HeaderTitle,
    StyledLink,
    Column,
    Legend,
};
