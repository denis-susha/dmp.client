"use client";

import { createContext, useRef, useContext, PropsWithChildren } from "react";
import { useStore } from "zustand";
import { createPaymentStore, PaymentStore } from "./paymentStore";
import { IPaymentPageProps } from "@/pages/payment";

export type PaymentStoreApi = ReturnType<typeof createPaymentStore>;

export const PaymentStoreContext = createContext<PaymentStoreApi | undefined>(undefined);

type PaymentStoreProviderProps = PropsWithChildren<IPaymentPageProps>;

export const PaymentStoreProvider = ({ children, ...props }: PaymentStoreProviderProps) => {
    const storeRef = useRef<PaymentStoreApi | null>(null);
    if (storeRef.current === null) {
        storeRef.current = createPaymentStore(props);
    }

    return <PaymentStoreContext.Provider value={storeRef.current}>{children}</PaymentStoreContext.Provider>;
};

export const usePaymentStore = <T,>(selector: (store: PaymentStore) => T): T => {
    const paymentStoreContext = useContext(PaymentStoreContext);

    if (!paymentStoreContext) {
        throw new Error(`usePaymentStore must be used within PaymentStoreProvider`);
    }

    return useStore(paymentStoreContext, selector);
};
