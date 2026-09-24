import styled, { css, keyframes } from "styled-components";

const InputWithLabel = styled.div`
    margin-bottom: 4px;
    text-align: left;
    display: block;
`;

const Label = styled.label`
    display: block;
    width: 100%;
`;

const shake = keyframes`
    10%, 90% {
        transform: translate3d(-1px, 0, 0);
    }
    20%, 80% {
        transform: translate3d(2px, 0, 0);
    }
    30%, 50%, 70% {
        transform: translate3d(-4px, 0, 0);
    }
    40%, 60% {
        transform: translate3d(4px, 0, 0);
    }
`;

const shakeAnimation = css<{ $focused: boolean; $error: boolean }>`
    animation: ${shake} 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
`;

const InputContainer = styled.div<{ $focused: boolean; $error: boolean }>`
    background-color: #fff;
    border: 2px solid #b3bcc5;
    border-radius: 6px;
    box-sizing: border-box;
    color: #001a34;
    display: flex;
    overflow: hidden;
    position: relative;
    text-overflow: ellipsis;
    transition: border-color 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
    white-space: nowrap;
    will-change: transform, border-color, top, background-color;

    ${(props) => (props.$error ? shakeAnimation : null)};

    ${(props) => {
        if (props.$error) {
            return `
            border-color: #f91155;
            `;
        }

        if (props.$focused) {
            return `border-color: #005bff;`;
        }

        return `border-color: #b3bcc5;`;
    }}

    &:hover {
        ${(props) => {
            if (props.$error) {
                return `border-color: #f91155;`;
            }

            return `border-color: #005bff;`;
        }}
    }
`;

const InputWrapper = styled.div<{ $focused: boolean; $canClear: boolean }>`
    display: flex;
    flex: 1;
    max-width: 100%;
    position: relative;
    padding-right: ${(props) => (props.$focused && props.$canClear ? "34px" : "initial")};

    input[type="number"] {
        -moz-appearance: textfield;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input::-moz-placeholder,
    input::-ms-placeholder,
    input::placeholder,
    input::-webkit-input-placeholder {
        color: #b3bcc5;
    }
`;

const Input = styled.input`
    padding: 18px 10px 6px;
    font-size: 16px;
    line-height: 20px;
    background-color: hsla(0, 0%, 100%, 0);
    border: 0;
    box-sizing: border-box;
    caret-color: #005bff;
    color: inherit;
    font-family: var(--mainFont);
    margin: 0;
    outline: none;
    text-align: inherit;
    vertical-align: top;
    width: 100%;
    font-style: normal;
    letter-spacing: normal;
    text-decoration: none;
    text-transform: none;
    word-spacing: normal;
`;

const LabelTitle = styled.p<{ $small?: boolean }>`
    font-size: 16px;
    line-height: 20px;
    top: 12px;
    font-family: var(--mainFont);
    margin: 0;
    color: #96a3ae;
    display: block;
    left: 10px;
    pointer-events: none;
    position: absolute;
    text-align: left;
    transform-origin: 0 0;
    transition: transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
    white-space: pre-wrap;
    will-change: transform;

    background-color: ${(props) => (props.$small ? "hsla(0, 0%, 100%, 0)" : "initial")};
    transform: ${(props) => (props.$small ? "translateY(-10px) scale(0.75)" : "initial")};
`;

const ClearBtnContainer = styled.div`
    height: 44px;
    width: 44px;
    align-items: center;
    bottom: 0;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    margin-right: 8px;
    pointer-events: none;
    position: absolute;
    right: 0;
`;

const ClearBtnBox = styled.div`
    color: #707f8d;
    justify-content: flex-end;
    pointer-events: auto;
    display: inline-flex;
`;

const ClearBtn = styled.button`
    border-radius: 8px;
    -webkit-touch-callout: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: transparent;
    border: none;
    color: inherit;
    cursor: pointer;
    display: block;
    font-size: inherit;
    font-weight: inherit;
    height: inherit;
    line-height: 0;
    margin: 0;
    padding: 0;
    position: relative;
    text-decoration: none;
    white-space: normal;
`;

const ClearBtnContent = styled.span`
    border-radius: 8px;
    background: hsla(0, 0%, 100%, 0);
    color: inherit;
    font-size: inherit;
    font-weight: inherit;
    min-height: auto;
    min-width: auto !important;
    padding: 0 !important;
    width: auto;
    align-items: center;
    box-sizing: border-box;
    display: inline-flex;
    font-family: var(--mainFont);
    height: inherit;
    justify-content: center;
    line-height: 18px;
    text-align: center;
    transition:
        color 0.15s ease-in-out,
        background 0.15s ease-in-out,
        opacity 0.3s ease-in-out;
`;

const ErrorText = styled.p`
    margin: 8px 0 0;
    color: #f91155;
    font-size: 12px;
    line-height: 16px;
`;

export const Styled = {
    InputWithLabel,
    Label,
    InputContainer,
    InputWrapper,
    Input,
    LabelTitle,
    ClearBtnContainer,
    ClearBtnBox,
    ClearBtn,
    ClearBtnContent,
    ErrorText,
};
