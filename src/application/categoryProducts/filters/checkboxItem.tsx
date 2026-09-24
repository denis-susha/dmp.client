import { type FC } from "react";
import Checkbox from "@/components/common/Checkbox";
import { ICategoryFeatureCheckboxItem } from "@/services/models/catalog/categoryFeatureCheckboxItem";

export interface ICheckboxItemProps {
    checked: boolean;
    checkboxItem: ICategoryFeatureCheckboxItem;
    onChange: (checked: boolean, key: string) => void;
}

export const CheckboxItem: FC<ICheckboxItemProps> = (props) => {
    const { checkboxItem: fc, checked, onChange } = props;

    return (
        <div className="w-full">
            <div>
                <div className="items-center flex flex-row py-[4px] w-full">
                    <div className="self-baseline flex pr-[8px]">
                        <Checkbox
                            label={fc.title}
                            checked={checked}
                            onChange={(checked: boolean) => onChange(checked, fc.key)}
                            labelClassName="mr-[10px]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
