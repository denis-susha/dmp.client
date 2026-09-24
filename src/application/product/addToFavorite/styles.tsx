import styled from "styled-components";

const AddToFavorite = styled.div`
    display: inline-flex;
`;

const AddToFavoriteBtn = styled.button<{ $isFavorite: boolean; $isMobile: boolean }>`
    background: ${(props) => (props.$isMobile ? "inherit" : "rgba(0, 150, 255, 0.078)")};
    color: ${(props) => (props.$isFavorite ? "rgb(241, 17, 126)" : "rgba(0, 91, 255, 1)")};
    flex-shrink: 0;
    overflow: hidden;
    border-radius: 12px;
    height: ${(props) => (props.$isMobile ? "auto" : "56px")};
    min-width: 56px;
    -webkit-touch-callout: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    align-items: center;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-flex;
    font-family: var(--mainFont);
    font-size: inherit;
    font-weight: inherit;
    justify-content: center;
    margin: 0;
    padding: 0;
    position: relative;
    text-decoration: none;
    transition: transform 0.1s cubic-bezier(0.55, 0, 1, 0.45);
    white-space: normal;
`;

const AddToFavoriteBackground = styled.div<{ $isMobile: boolean }>`
    background-color: ${(props) => (props.$isMobile ? "inherit" : "rgba(0, 91, 255, 1)")};
    border-radius: inherit;
    bottom: 0;
    left: 0;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;

    &:hover {
        opacity: 0.1;
    }
`;

export const Styled = {
    AddToFavorite,
    AddToFavoriteBtn,
    AddToFavoriteBackground,
};
