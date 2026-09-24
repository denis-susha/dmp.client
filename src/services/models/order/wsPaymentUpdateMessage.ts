import { PaymentStatusEnum } from "../paymentStatusEnum";

export interface IWsPaymentUpdateMessage {
    paymentStatus: PaymentStatusEnum;
    sentAmount: number;
}
