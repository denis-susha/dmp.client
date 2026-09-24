import { IProduct } from "../product/product";
import { ISearchCategory } from "./searchCategory";

export interface IFullTextSearchProductsResponse {
    products?: IProduct[];
    categories?: ISearchCategory[];
}
