import Link from "next/link";
import styled, { css } from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

const Dots = styled.a`
    border-radius: 3px;
    box-sizing: border-box;
    color: #070707;
    cursor: default;
    display: inline-block;
    height: 32px;
    margin-right: 8px;
    padding: 7px 12px;
    text-align: center;
    text-decoration: none;
`;

const PageButtonLink = styled(Link)`
    color: rgba(0, 91, 255, 1);
    margin-right: 8px;
    background-color: rgba(0, 150, 255, 0.078);
    padding: 10px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    touch-action: none;
    -webkit-font-smoothing: antialiased;
    appearance: none;
    border: none;
    border-radius: 8px;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-flex;
    margin: 0;
    overflow: hidden;
    position: relative;
    text-align: center;
    text-decoration: none;
`;

const PageButton = styled.div`
    height: 16px;
    display: flex;
    white-space: nowrap;
    width: 100%;
    align-items: center;
    justify-content: center;
`;

const PageButtonBody = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    white-space: nowrap;
`;

const PageButtonBg = styled.div`
    background-color: #005bff;
    border-radius: inherit;
    bottom: 0;
    left: 0;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
`;

const PageNumberLink = styled(Link)<{ $isActive: boolean }>`
    border-radius: 3px;
    box-sizing: border-box;
    color: #005bff;
    cursor: pointer;
    display: inline-block;
    height: 32px;
    margin-right: 8px;
    padding: 7px 12px;
    text-align: center;
    text-decoration: none;

    ${({ $isActive }) =>
        $isActive &&
        css`
            background-color: #005bff;
            color: white;
            cursor: default;
        `}
`;

export const Styled = {
    Container,
    Dots,
    PageButtonLink,
    PageButton,
    PageButtonBody,
    PageButtonBg,
    PageNumberLink,
};
