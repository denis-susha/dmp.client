import { createGlobalStyle, css } from "styled-components";

const GlobalModalStyle = createGlobalStyle`
 html {
    overflow: hidden;
}

body {
    position: static;
    padding-right: 17px;
}
`;

const MinWidth = css`
    min-width: 1050px;
`;

export const CommonStyles = {
    MinWidth: MinWidth,
    GlobalModalStyle,
};

export const MediaWidth = {
    Small: "650px",
    Medium: "768px",
    Large: "992px",
};
