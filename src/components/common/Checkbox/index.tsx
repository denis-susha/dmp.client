import React from "react";
import { Styled } from "./styles";
import { twMerge } from "tailwind-merge";

interface ICheckboxProps {
    label?: string;
    checked?: boolean;
    disabled?: boolean;
    onChange?: (checked: boolean) => void;
    labelClassName?: string | undefined;
}

const Checkbox: React.FC<ICheckboxProps> = (props) => {
    const { label, checked = false, disabled = false, onChange, labelClassName } = props;

    const handleChange = () => {
        const newCheckedState = !checked;
        if (onChange) {
            onChange(newCheckedState);
        }
    };

    return (
        <Styled.Label className={labelClassName} disabled={disabled}>
            <Styled.Input disabled={disabled} type="checkbox" checked={checked} onChange={handleChange} />
            <Styled.Checkbox
                disabled={disabled}
                checked={checked}
                className={twMerge(checked ? "[&&]:bg-[#005bff] [&&]:border-[#005bff]" : "")}
            >
                {checked && <Styled.CheckboxIcon icon="checkbox" size={16} />}
            </Styled.Checkbox>
            {label && <Styled.LabelTitle>{label}</Styled.LabelTitle>}
        </Styled.Label>
    );
};

export default Checkbox;
