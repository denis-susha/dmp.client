import { createStore } from "zustand/vanilla";
import { IGetOrderResponse } from "@/services/models/order/getOrderResponse";
import { IOrderListPageProps } from "@/pages/my/orderlist";
import { ITableQuery } from "@/services/models/tableQuery";

export interface IOrderListState {
    error: string | null;
    orderList: IGetOrderResponse[];
    request: ITableQuery;
    totalCount: number;
    setInitialData: (data: Partial<IOrderListState>) => void;
}

export type OrderListStore = IOrderListState;

export const createOrderListStore = (initProps: IOrderListPageProps) => {
    return createStore<OrderListStore>()((set) => ({
        error: null,
        orderList: initProps.orderResponse.orders,
        request: initProps.request,
        totalCount: initProps.orderResponse.totalCount,
        setInitialData: (data) => {
            set((state) => ({
                ...state,
                ...data,
            }));
        },
    }));
};
