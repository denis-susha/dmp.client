import styled from "styled-components";

const Container = styled.div<{ $isMobile: boolean }>`
    box-sizing: border-box;
    display: flex;
    flex: 1 0 auto;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 0;
    width: 100%;
    margin-top: ${(props) => (props.$isMobile ? "0" : "var(--gap)")};
    margin-left: auto;
    margin-right: auto;
    max-width: ${(props) => (props.$isMobile ? "100%" : "var(--desktop-screen-default)")};
    padding-left: var(${(props) => (props.$isMobile ? "--mobile-padding-default" : "--desktop-padding-default")});
    padding-right: var(${(props) => (props.$isMobile ? "--mobile-padding-default" : "--desktop-padding-default")});

    & {
        --margin-size-grid: ${(props) => (props.$isMobile ? "var(--mobile-gap)" : "var(--gap)")};
    }
`;

const ContainerColumn = styled.div<{ $isMobile: boolean }>`
    box-sizing: border-box;
    display: flex;
    flex-basis: auto;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 0;
    margin: var(--margin-size-grid) auto 0;
    max-width: ${(props) => (props.$isMobile ? "100%" : "var(--desktop-screen-default)")};
    padding-left: var(${(props) => (props.$isMobile ? "--mobile-padding-default" : "--desktop-padding-default")});
    padding-right: var(${(props) => (props.$isMobile ? "--mobile-padding-default" : "--desktop-padding-default")});
    width: 100%;

    & {
        --margin-size-grid: ${(props) => (props.$isMobile ? "var(--mobile-gap)" : "var(--gap)")};
    }
`;

const Row = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: calc(var(--margin-size-grid) * -1);
    margin-left: calc(var(--margin-size-grid) * -1);
    max-width: calc(100% + var(--margin-size-grid));
    width: calc(100% + var(--margin-size-grid));
`;

const Column = styled.div`
    align-items: stretch;
    box-sizing: border-box;
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-bottom: var(--margin-size-grid);
    margin-left: var(--margin-size-grid);
    min-width: 0;
`;

const Wallpaper = styled.div<{ $bgColor?: string | undefined }>`
    background-color: ${(props) => (props.$bgColor ? props.$bgColor : "#f5f7fa")};
    background-position: top;
    background-repeat: no-repeat;
    background-size: contain;
    position: relative;
    width: 100%;
`;

const Separator = styled.div<{ $height: number }>`
    height: ${(props) => props.$height + "px"};
    max-width: 100%;
`;

export const Grid = {
    Container,
    ContainerColumn,
    Row,
    Column,
    Wallpaper,
    Separator,
};
