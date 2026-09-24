"use client";

import { createContext, useRef, useContext, PropsWithChildren } from "react";
import { useStore } from "zustand";
import { createOrderDetailsStore, OrderDetailsStore } from "./orderDetailsStore";
import { IOrderDetailsPageProps } from "@/pages/my/orderdetails";

export type OrderDetailsStoreApi = ReturnType<typeof createOrderDetailsStore>;

export const OrderDetailsStoreContext = createContext<OrderDetailsStoreApi | undefined>(undefined);

type OrderDetailsStoreProviderProps = PropsWithChildren<IOrderDetailsPageProps>;

export const OrderDetailsStoreProvider = ({ children, ...props }: OrderDetailsStoreProviderProps) => {
    const storeRef = useRef<OrderDetailsStoreApi | null>(null);
    if (storeRef.current === null) {
        storeRef.current = createOrderDetailsStore(props);
    }

    return <OrderDetailsStoreContext.Provider value={storeRef.current}>{children}</OrderDetailsStoreContext.Provider>;
};

export const useOrderDetailsStore = <T,>(selector: (store: OrderDetailsStore) => T): T => {
    const orderDetailsStoreContext = useContext(OrderDetailsStoreContext);

    if (!orderDetailsStoreContext) {
        throw new Error(`useOrderDetailsStore must be used within OrderDetailsStoreProvider`);
    }

    return useStore(orderDetailsStoreContext, selector);
};
