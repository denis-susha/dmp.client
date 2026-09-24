import { IMenuCategory } from "../catalog/menuCategory";
import { IProduct } from "./product";

export interface IProductData {
    product: IProduct;
    category: IMenuCategory;
}
