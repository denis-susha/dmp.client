import styled from "styled-components";

const Container = styled.div`
    position: relative;
    padding-bottom: 1rem;
    margin-bottom: -16px;
`;

const Button = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    appearance: none;
    background-color: #2563eb;
    color: white;
    border: none;
    border-radius: 0.5rem;
    box-sizing: border-box;
    cursor: pointer;
    font-family: inherit;
    font-size: 1rem;
    padding-top: 0.625rem;
    padding-bottom: 0.625rem;
    padding-left: 1rem;
    padding-right: 1rem;
    position: relative;
`;

const BtnContent = styled.div<{ $menuIsOpen: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 1.5rem;
    white-space: nowrap;
    width: 100%;

    svg {
        flex-shrink: 0;
        margin-right: 0.5rem;
        color: rgba(245, 247, 250, 0.9);
    }

    .button-close {
        display: ${(props) => (props.$menuIsOpen ? "block" : "none")};
    }

    .menu-catalog {
        display: ${(props) => (props.$menuIsOpen ? "none" : "block")};
    }
`;

const BtnContentTitle = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: 0.05em;
    line-height: 1.5rem;
`;

const BtnBg = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: white;
    opacity: 0;
    border-radius: 0.5rem;
    z-index: 10;

    &:hover {
        opacity: 0.1;
    }
`;

export const Styled = {
    Container,
    Button,
    BtnContent,
    BtnContentTitle,
    BtnBg,
};
