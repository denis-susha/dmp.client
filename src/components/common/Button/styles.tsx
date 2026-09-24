import styled, { css } from "styled-components";

const BaseBtn = styled.button<{ disabled: boolean; size?: "small" | "medium" | "big" | undefined }>`
    align-items: center;
    justify-content: center;
    -webkit-touch-callout: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    box-sizing: border-box;
    cursor: ${(props) => (props.disabled ? "initial" : "pointer")};
    display: inline-flex;
    font-family: var(--mainFont);
    font-size: inherit;
    font-weight: inherit;
    margin: 0;
    overflow: hidden;
    position: relative;
    text-align: center;
    text-decoration: none;
`;

const DefaultBtn = styled(BaseBtn)<{
    disabled: boolean;
    $fill: boolean;
    size?: "small" | "medium" | "big" | undefined;
    $bgColor?: string | undefined;
    $color?: string | undefined;
}>`
    background-color: ${(props) =>
        props.disabled ? "rgba(0, 48, 120, .039)" : props.$bgColor ? props.$bgColor : "#005bff"};
    color: ${(props) => (props.disabled ? "#070707" : props.$color ? props.$color : "#fff")};
    border-radius: ${(props) => (props.size == "small" ? "8px" : props.size == "medium" ? "12px" : "12px")};
    padding: ${(props) => (props.size == "small" ? "8px 12px" : props.size == "medium" ? "16px 24px" : "16px 24px")};
    width: ${(props) => (props.$fill ? "100%" : "initial")};
`;

const SimpleBtn = styled.button<{ disabled: boolean; size?: "small" | "medium" | "big" | undefined }>`
    -webkit-touch-callout: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    align-items: center;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: transparent;
    border: none;
    box-sizing: border-box;
    color: ${(props) => (props.disabled ? "rgba(0, 48, 120, .39)" : "#005bff")};
    cursor: ${(props) => (props.disabled ? "initial" : "pointer")};
    display: inline-flex;
    font-family: var(--mainFont);
    font-size: inherit;
    font-weight: inherit;
    margin: 0;
    overflow: hidden;
    padding: 0;
    position: relative;
    text-decoration: none;
    transition: transform 0.1s cubic-bezier(0.55, 0, 1, 0.45);
    white-space: nowrap;

    &:hover {
        ${(props) =>
            !props.disabled &&
            css`
                opacity: 0.9;
            `};
    }
`;

const IconBtn = styled(BaseBtn)<{ disabled: boolean; size?: "small" | "medium" | "big" | undefined }>`
    border-radius: ${(props) => (props.size == "small" ? "8px" : props.size == "medium" ? "12px" : "12px")};
`;

const Bg = styled.div<{ $disabled?: boolean }>`
    background-color: #fff;
    border-radius: inherit;
    bottom: 0;
    left: 0;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;

    &:hover {
        ${(props) =>
            !props.$disabled &&
            css`
                opacity: 0.1;
            `};
    }
`;

const OutlinedBg = styled(Bg)`
    background-color: #005bff;

    &:hover {
        ${(props) =>
            !props.$disabled &&
            css`
                opacity: 0.1;
            `};
    }
`;

const OutlinedChildrenWrapper = styled.div`
    height: 16px;
    display: flex;
    white-space: nowrap;
    width: 100%;
    align-items: center;
    justify-content: center;
`;

export const Styled = {
    DefaultBtn,
    SimpleBtn,
    IconBtn,
    Bg,
    OutlinedBg,
    OutlinedChildrenWrapper,
};
