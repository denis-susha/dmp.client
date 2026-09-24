import { IProductFeature } from "./productFeature";
import { IProductUserFeatures } from "./productUserFeatures";

export interface IProduct {
    productId: number;
    menuCategoryId: string;
    userFeatures: IProductUserFeatures;
    slug: string;
    features?: IProductFeature[];
    price: number;
    imgLinks?: string[];
    duration?: number;
    year?: number;
}
