import { IGetOrderLineDataResponse } from "./getOrderLineDataResponse";

export interface IGetOrderLineResponse {
    slug: string;
    cover?: string;
    price: number;
    productName: string;
    quantity: number;
    productId: number;
    data?: IGetOrderLineDataResponse;
    storeName: string;
    featuresValues: string;
}
