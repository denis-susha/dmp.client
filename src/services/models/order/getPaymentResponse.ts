import { CryptocurrencyEnum } from "../cryptocurrencyEnum";
import { CurrencyEnum } from "../currencyEnum";
import { PaymentStatusEnum } from "../paymentStatusEnum";
import { IPaymentMethod } from "./paymentMethod";

export interface IGetPaymentResponse {
    createdAt: string;
    price: number;
    currency: CurrencyEnum;
    expiration: number;
    paymentMethods: IPaymentMethod[];
    status: PaymentStatusEnum;
    orderId: number;
    paidCryptocurrency?: CryptocurrencyEnum;
    sentAmount?: number;
}
