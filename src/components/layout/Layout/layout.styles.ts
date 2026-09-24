import styled from "styled-components";

const LayoutPage = styled.div<{ $isMobile: boolean }>`
    display: flex;
    flex-direction: column;
    min-width: ${(props) => (props.$isMobile ? "initial" : "var(--desktop-screen-s)")};
    max-width: ${(props) => (props.$isMobile ? "100vw" : "initial")};
    grid-auto-rows: 0;
    grid-template: 100% / 100%;
    min-height: 100vh;
    position: relative;
`;

const LayoutContainer = styled.div`
    width: auto;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;

export const Styled = {
    LayoutContainer,
    LayoutPage,
};
