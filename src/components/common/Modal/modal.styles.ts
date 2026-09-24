import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle<{ $isMobile: boolean }>`
 html {
    overflow: hidden;
}

body {
    position: static;
    padding-right:  ${(props) => (props.$isMobile ? "0px" : "17px")};
}
`;

const Modal = styled.div`
    bottom: 0;
    left: 0;
    outline: none;
    overflow: hidden;
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 999;

    opacity: 0;
    transition: opacity 300ms ease-in-out 300ms;

    &.fade-in {
        opacity: 1;
    }

    &.fade-out {
        opacity: 0;
    }
`;

const ModalBg = styled.div`
    background-color: rgba(3, 8, 13, 0.24);
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
`;

const Wrapper = styled.div`
    overflow-y: auto;
    -ms-scroll-chaining: none;
    -webkit-overflow-scrolling: touch;
    height: 100%;
    overscroll-behavior: contain;
    position: relative;
`;

const Box = styled.div<{ $isMobile: boolean }>`
    padding-right: ${(props) => (props.$isMobile ? "0px" : "17px")};
    align-items: center;
    display: flex;
    justify-content: center;
    min-height: ${(props) =>
        props.$isMobile ? "100vh" : "calc(100vh - env(safe-area-inset-top, 0) - env(safe-area-inset-bottom, 0))"};

    &:after {
        content: "";
        display: block;
        font-size: 0;
        min-height: inherit;
    }
`;

const Body = styled.div<{ $isMobile: boolean }>`
    border-radius: ${(props) => (props.$isMobile ? "0" : "32px")};
    padding: ${(props) => (props.$isMobile ? "26px" : "46px")};
    background-color: #fff;
    box-sizing: border-box;
    margin: ${(props) => (props.$isMobile ? "0" : "32px 0")};
    max-width: 960px;
    min-width: ${(props) => (props.$isMobile ? "100vw" : "392px")};
    position: relative;
    min-height: ${(props) => (props.$isMobile ? "100vh" : "auto")};
`;

const Section = styled.section<{ $wide: boolean }>`
    background: #fff;
    margin: 0 auto;
    max-width: ${(props) => (props.$wide ? "initial" : "378px")};
    text-align: left;
    min-height: 200px;
`;

const Header = styled.div`
    border-bottom: 1px solid rgba(204, 214, 228, 0.6);
    font-size: 20px;
    font-weight: 700;
    line-height: 26px;
    padding: 11px 0;
`;

const ModalCloseBtn = styled.button`
    position: absolute;
    top: 18px;
    right: 18px;
    border: none;
    background: transparent;
    font-size: 1.5rem;
    cursor: pointer;
    background: rgba(204, 214, 228, 0.4);
    color: rgba(0, 26, 52, 0.6);
    z-index: 5;
    border-radius: 50%;
    height: 32px;
    min-width: 32px;
`;

const ModalCloseBtnContent = styled.div`
    position: relative;
    top: -4px;
`;

const BodyTitleContainer = styled.div`
    line-height: 1.43em;
    padding: 24px 0 32px;
`;

const BodyBtnContainer = styled.div`
    display: flex;
    justify-content: space-between;
    text-align: left;
`;

export const Styled = {
    GlobalStyle,
    Modal,
    ModalBg,
    Wrapper,
    Box,
    Body,
    Section,
    Header,
    BodyTitleContainer,
    BodyBtnContainer,
    ModalCloseBtnContent,
    ModalCloseBtn,
};
