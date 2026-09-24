import { ICategoryFeatureCheckboxItem } from "./categoryFeatureCheckboxItem";
import { FeatureTypeEnum } from "./featureTypeEnum";

export interface ICategoryFeature {
    featureId: number;
    name: string;
    title: string;
    type: FeatureTypeEnum;
    filterCheckboxes?: ICategoryFeatureCheckboxItem[];
    rangeMin?: number;
    rangeMax?: number;
    rangeFrom?: number;
    rangeTo?: number;
    multipleChoice?: boolean;
}
