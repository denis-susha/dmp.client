import { createStore } from "zustand/vanilla";
import { postData } from "@/utils/api/apiAxious";
import { IGetPaymentResponse } from "@/services/models/order/getPaymentResponse";
import { ISetPaymentDetailsRequest } from "@/services/models/order/setPaymentDetailsRequest";
import { IPaymentPageProps } from "@/pages/payment";
import { IPaymentMethod } from "@/services/models/order/paymentMethod";

const controllerUrl = "/order/";

export interface IPaymentState {
    error: boolean | null;
    payment: IGetPaymentResponse;
    paymentMethod: IPaymentMethod | null;
    setPaymentDetailsInProgress: boolean;
    setSelectedPaymentMethod: (paymentMethod: IPaymentMethod) => void;
    setPaymentDetails: (paymentMethodId: string, orderId: number, address: string) => Promise<boolean | undefined>;
    updUserAddress: (paymentMethodId: string, address: string) => void;
}

export type PaymentStore = IPaymentState;

export const createPaymentStore = (initProps: IPaymentPageProps) => {
    return createStore<PaymentStore>()((set, get) => ({
        ...initProps,
        error: null,
        setPaymentDetailsInProgress: false,
        paymentMethod: null,
        setSelectedPaymentMethod: (paymentMethod: IPaymentMethod) => {
            set({ paymentMethod: paymentMethod });
        },
        updUserAddress: (paymentMethodId: string, address: string) => {
            const { payment } = get();
            const selectedMethod = payment?.paymentMethods.find((pm) => pm.paymentMethodId === paymentMethodId);
            if (selectedMethod) {
                selectedMethod.userAddress = address;

                payment.paymentMethods.map((paymentMethod) =>
                    paymentMethod.paymentMethodId === paymentMethodId ? { selectedMethod } : paymentMethod
                );
            }

            set({ payment: payment, paymentMethod: selectedMethod });
        },
        setPaymentDetails: async (paymentMethodId: string, orderId: number, address: string) => {
            try {
                set({ setPaymentDetailsInProgress: true, error: null });

                const request: ISetPaymentDetailsRequest = {
                    paymentMethodId: paymentMethodId,
                    orderId: orderId,
                    address: address,
                };

                const result = await postData<boolean>(`${controllerUrl}setpaymentdetails`, request);
                return result;
            } catch (error: unknown) {
                console.log(error);
                set({ error: true });
            } finally {
                set({ setPaymentDetailsInProgress: false });
            }
        },
    }));
};
