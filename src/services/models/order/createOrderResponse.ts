import { CreateOrderStatusEnum } from "./createOrderStatusEnum";

export interface ICreateOrderResponse {
    status: CreateOrderStatusEnum;
    orderId?: number;
}
