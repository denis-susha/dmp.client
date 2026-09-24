import { IProduct } from "../product/product";

export interface IFullTextSearchResponse {
    products?: IProduct[];
    totalCount: number;
}
