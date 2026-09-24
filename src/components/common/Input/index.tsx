import React, { FC, useRef, useState } from "react";
import { Styled } from "./styles";
import Icon from "../Icon";

interface InputProps {
    label?: string;
    name?: string;
    inputValue: string | number;
    type?: string;
    placeholder?: string;
    required?: boolean;
    maxLength?: number;
    isError?: boolean;
    errorText?: string;
    autoComplete?: string;
    autoFocus?: boolean;
    canClear?: boolean;
    inputClassName?: string | undefined;
    containerClassName?: string | undefined;
    inputMode?: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search" | undefined;
    min?: number | string | undefined;
    max?: number | string | undefined;
    pattern?: string | undefined;
    onChange: (value: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    onEnterDown?: () => void;
    validate?: (value: string) => string | null;
    setValue?: (value: string) => void;
}

const Input: FC<InputProps> = (props) => {
    const {
        label,
        name,
        inputValue = "",
        type = "text",
        placeholder = "",
        required = false,
        maxLength,
        isError = false,
        errorText = "",
        autoComplete = "off",
        autoFocus,
        canClear = true,
        inputClassName,
        containerClassName,
        inputMode = "text",
        min,
        max,
        pattern,
        onChange,
        onFocus,
        onEnterDown,
        onBlur,
    } = props;
    const [focused, setFocused] = useState(false);
    const clearButtonRef = useRef<HTMLButtonElement | null>(null);

    const handleOnFocus = () => {
        if (onFocus) {
            onFocus();
        }

        setFocused(true);
    };

    const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        // Check if the blur event is coming from clicking the clear button
        if (clearButtonRef.current && clearButtonRef.current.contains(e.relatedTarget as Node)) {
            return; // Do nothing if blur was triggered by clicking the button
        }
        setFocused(false);
        if (onBlur) {
            onBlur();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        onChange(newValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (onEnterDown && e.key === "Enter") {
            onEnterDown();
        }
    };

    const clearInput = () => {
        onChange("");
    };

    return (
        <Styled.InputWithLabel className={containerClassName}>
            <Styled.Label>
                <Styled.InputContainer $focused={focused} $error={isError}>
                    <Styled.InputWrapper $focused={focused} $canClear={canClear}>
                        <Styled.Input
                            inputMode={inputMode}
                            id={name}
                            name={name}
                            type={type}
                            value={inputValue}
                            placeholder={placeholder}
                            onChange={handleChange}
                            required={required}
                            autoFocus={autoFocus}
                            maxLength={maxLength}
                            onFocus={handleOnFocus}
                            onBlur={handleOnBlur}
                            onKeyDown={handleKeyDown}
                            autoComplete={autoComplete}
                            className={inputClassName}
                            min={min}
                            max={max}
                            pattern={pattern}
                        ></Styled.Input>
                        {label && <Styled.LabelTitle $small={focused || !!inputValue}>{label}</Styled.LabelTitle>}
                        {canClear && (
                            <Styled.ClearBtnContainer>
                                {inputValue && focused && (
                                    <Styled.ClearBtnBox>
                                        <Styled.ClearBtn type="button" ref={clearButtonRef} onClick={clearInput}>
                                            <Styled.ClearBtnContent>
                                                <Icon width={24} height={24} icon={"cross"} className="m-0 shrink-0" />
                                            </Styled.ClearBtnContent>
                                        </Styled.ClearBtn>
                                    </Styled.ClearBtnBox>
                                )}
                            </Styled.ClearBtnContainer>
                        )}
                    </Styled.InputWrapper>
                </Styled.InputContainer>
            </Styled.Label>
            {isError && errorText && (
                <div>
                    <Styled.ErrorText>{errorText}</Styled.ErrorText>
                </div>
            )}
        </Styled.InputWithLabel>
    );
};

export default Input;
