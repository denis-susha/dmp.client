import { type FC } from "react";
import Input from "@/components/common/Input";

export interface IRangeItemProps {
    rangeValue: string;
    placeholder: string;
    min: number;
    max: number;
    onRangeValueChange: (value: string) => void;
    onBlur: () => void;
}

export const RangeItem: FC<IRangeItemProps> = (props) => {
    const { rangeValue, placeholder, min, max, onRangeValueChange, onBlur } = props;

    return (
        <Input
            type="number"
            inputMode="numeric"
            maxLength={6}
            placeholder={placeholder}
            inputValue={rangeValue}
            onChange={onRangeValueChange}
            onBlur={onBlur}
            onEnterDown={onBlur}
            canClear={false}
            inputClassName="[&&]:min-w-0 [&&]:text-[16px] [&&]:tracking-[.2px] [&&]:leading-[24px] [&&]:p-[2px_10px]"
            containerClassName="[&&]:w-[120px] [&&]:pr-[20px] [&&]:items-center [&&]:flex-row-reverse [&&]:bg-white [&&]:box-border [&&]:text-[#001a34] [&&]:flex [&&]:overflow-hidden [&&]:relative [&&]:text-ellipsis [&&]:transition-[border-color] [&&]:duration-200 [&&]:ease-[cubic-bezier(.25,.8,.25,1)] [&&]:whitespace-nowrap [&&]:will-change-[transform,border-color,top,background-color]"
            min={min}
            max={max}
            pattern="[0-9]*"
        />
    );
};
