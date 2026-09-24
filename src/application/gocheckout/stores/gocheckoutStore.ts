import { createStore } from "zustand/vanilla";
import { ICartData } from "@/services/models/cart/cartData";
import { IGoCheckoutPageProps } from "@/pages/gocheckout";
import { postData } from "@/utils/api/apiAxious";
import { ICreateOrderResponse } from "@/services/models/order/createOrderResponse";
import { CreateOrderStatusEnum } from "@/services/models/order/createOrderStatusEnum";

const controllerUrl = "/order/";

export interface IGocheckoutState {
    error: string | null;
    cartData: ICartData;
    createInvoiceInProgress: boolean;
    createOrder: () => Promise<ICreateOrderResponse>;
}

export type GocheckoutStore = IGocheckoutState;

export const createGocheckoutStore = (initProps: IGoCheckoutPageProps) => {
    return createStore<GocheckoutStore>()((set) => ({
        ...initProps,
        error: null,
        createInvoiceInProgress: false,
        createOrder: async () => {
            try {
                set({ createInvoiceInProgress: true, error: null });

                const result = await postData<ICreateOrderResponse>(controllerUrl, null);

                return result;
            } catch (error: unknown) {
                console.log(error);
                return {
                    status: CreateOrderStatusEnum.InternalError,
                };
            } finally {
                set({ createInvoiceInProgress: false });
            }
        },
    }));
};
