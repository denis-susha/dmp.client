import { createStore } from "zustand/vanilla";
import { IGetOrderResponse } from "@/services/models/order/getOrderResponse";
import { IOrderDetailsPageProps } from "@/pages/my/orderdetails";

export interface IOrderDetailsState {
    error: string | null;
    order: IGetOrderResponse;
}

export type OrderDetailsStore = IOrderDetailsState;

export const createOrderDetailsStore = (initProps: IOrderDetailsPageProps) => {
    return createStore<OrderDetailsStore>()(() => ({
        ...initProps,
        error: null,
    }));
};
