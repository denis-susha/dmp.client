import { IProduct } from "../product/product";
import { IMenuCategory } from "./menuCategory";

export interface IMenuCategoryData {
    category: IMenuCategory;
    products: IProduct[];
    totalCount: number;
}
