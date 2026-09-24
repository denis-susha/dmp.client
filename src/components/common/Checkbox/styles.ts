import styled, { css } from "styled-components";
import Icon from "../Icon";

const Label = styled.label<{ size?: "small" | "medium" | "big" | undefined; disabled: boolean }>`
    align-items: center;
    cursor: ${(props) => (props.disabled ? "initial" : "pointer")};
    display: inline-flex;
    font-family: var(--mainFont);
`;

const Input = styled.input<{ size?: "small" | "medium" | "big" | undefined }>`
    clip: rect(0 0 0 0);
    border: 0;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
`;

const Checkbox = styled.div<{ checked: boolean; disabled: boolean }>`
    ${(props) =>
        !props.disabled &&
        !props.checked &&
        css`
            &:hover {
                border-color: #99bdff;
            }
        `}

    ${(props) =>
        !props.disabled &&
        props.checked &&
        css`
            &:hover {
                background-color: #0050e0;
                border-color: #0050e0;
            }
        `}

    ${(props) =>
        props.disabled &&
        css`
            background-color: #f2f5f9;
            border-color: #b3bcc5;
        `}

    border: 2px solid #b3bcc5;
    border-radius: 4px;
    flex: 0 0 auto;
    height: 12px;
    position: relative;
    transition:
        background-color 0.15s,
        border-color 0.15s;
    width: 12px;
    box-sizing: initial;
`;

const CheckboxIcon = styled(Icon)`
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
`;

const LabelTitle = styled.div`
    flex-basis: auto;
    flex-grow: 1;
    flex-shrink: 1;
    overflow: hidden;
    padding-left: 8px;
    text-overflow: ellipsis;
`;

export const Styled = {
    Label,
    Input,
    Checkbox,
    CheckboxIcon,
    LabelTitle,
};
