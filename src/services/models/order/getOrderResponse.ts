import { CurrencyEnum } from "../currencyEnum";
import { PaymentStatusEnum } from "../paymentStatusEnum";
import { IGetOrderLineResponse } from "./getOrderLineResponse";

export interface IGetOrderResponse {
    createdAt: string;
    currency: CurrencyEnum;
    status: PaymentStatusEnum;
    orderId: number;
    amount: number;
    lines: IGetOrderLineResponse[];
}
