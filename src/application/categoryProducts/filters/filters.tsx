import { type FC } from "react";
import { FilterItem } from "./filterItem";
import { ICategoryFeature } from "@/services/models/catalog/categoryFeature";

export interface ICategoryFiltersProps {
    features: ICategoryFeature[];
}

export const Filters: FC<ICategoryFiltersProps> = (props) => {
    const { features } = props;

    return (
        <div className="mb-[24px] flex flex-row flex-wrap w-full">
            {features.map((f) => (
                <FilterItem key={f.name} feature={f} />
            ))}
        </div>
    );
};
