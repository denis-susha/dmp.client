import { IGetOrderResponse } from "./getOrderResponse";

export interface IGetOrderListResponse {
    orders: IGetOrderResponse[];
    totalCount: number;
}
