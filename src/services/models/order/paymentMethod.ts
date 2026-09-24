import { CryptocurrencyEnum } from "../cryptocurrencyEnum";

export interface IPaymentMethod {
    paymentMethodId: string;
    rate: number;
    cryptocurrency: CryptocurrencyEnum;
    paymentAddress: string;
    divisibility: number;
    paymentUrl: string;
    recommendedFee: number;
    lightning: boolean;
    amount: number;
    nodeId?: string;
    userAddress?: string;
}
