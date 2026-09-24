import { IPaginationApiModel } from "../tableQuery";

export interface IFullTextSearchProductsRequest {
    query: string;
    pagination: IPaginationApiModel;
}
