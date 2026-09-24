import { type FC } from "react";
import { FeatureTypeEnum } from "@/services/models/catalog/featureTypeEnum";
import { Checkboxes } from "./checkboxes";
import { Range } from "./range";
import { BoolFilter } from "./boolFilter";
import { ICategoryFeature } from "@/services/models/catalog/categoryFeature";

const LineTitle: FC<{ title: string }> = ({ title }) => {
    return (
        <div className="mb-[6px] items-center flex flex-row py-[4px] w-full">
            <div className="flex flex-[1_1] flex-col overflow-hidden">
                <div className="flex flex-row h-full">
                    <div className="inline-flex">
                        <span className="items-baseline cursor-pointer inline-block pb-[2px] tsCompactControl500Medium">
                            {title}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export interface ICategoryFiltersProps {
    feature: ICategoryFeature;
}

export const FilterItem: FC<ICategoryFiltersProps> = (props) => {
    const { feature: f } = props;

    return (
        <div className="mb-[24px] w-full">
            {(f.type === FeatureTypeEnum.Checkboxes || f.type === FeatureTypeEnum.Range) && (
                <LineTitle title={f.title} />
            )}
            {f.type === FeatureTypeEnum.Checkboxes && <Checkboxes feature={f} />}
            {f.type === FeatureTypeEnum.Range && <Range feature={f} />}
            {f.type === FeatureTypeEnum.Bool && <BoolFilter feature={f} />}
        </div>
    );
};
