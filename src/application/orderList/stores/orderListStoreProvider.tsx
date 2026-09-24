"use client";

import { createContext, useRef, useContext, PropsWithChildren, useEffect } from "react";
import { useStore } from "zustand";
import { createOrderListStore, OrderListStore } from "./orderListStore";
import { IOrderListPageProps } from "@/pages/my/orderlist";

export type OrderListStoreApi = ReturnType<typeof createOrderListStore>;

export const OrderListStoreContext = createContext<OrderListStoreApi | undefined>(undefined);

type OrderListStoreProviderProps = PropsWithChildren<IOrderListPageProps>;

export const OrderListStoreProvider = ({ children, ...props }: OrderListStoreProviderProps) => {
    const storeRef = useRef<OrderListStoreApi | null>(null);
    if (storeRef.current === null) {
        storeRef.current = createOrderListStore(props);
    }

    // Use useEffect to react to prop changes *after* initial mount/hydration
    useEffect(() => {
        if (storeRef.current) {
            storeRef.current.getState().setInitialData({
                orderList: props.orderResponse.orders,
                totalCount: props.orderResponse.totalCount,
                request: props.request,
            });
        }
    }, [props.orderResponse, props.request]);

    return <OrderListStoreContext.Provider value={storeRef.current}>{children}</OrderListStoreContext.Provider>;
};

export const useOrderListStore = <T,>(selector: (store: OrderListStore) => T): T => {
    const orderListStoreContext = useContext(OrderListStoreContext);

    if (!orderListStoreContext) {
        throw new Error(`useOrderListStore must be used within OrderListStoreProvider`);
    }

    return useStore(orderListStoreContext, selector);
};
