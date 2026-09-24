"use client";

import { createContext, useRef, useContext, PropsWithChildren } from "react";
import { useStore } from "zustand";
import { createGocheckoutStore, GocheckoutStore } from "./gocheckoutStore";
import { IGoCheckoutPageProps } from "@/pages/gocheckout";

export type GocheckoutStoreApi = ReturnType<typeof createGocheckoutStore>;

export const GocheckoutStoreContext = createContext<GocheckoutStoreApi | undefined>(undefined);

type GocheckoutStoreProviderProps = PropsWithChildren<IGoCheckoutPageProps>;

export const GocheckoutStoreProvider = ({ children, ...props }: GocheckoutStoreProviderProps) => {
    const storeRef = useRef<GocheckoutStoreApi | null>(null);
    if (storeRef.current === null) {
        storeRef.current = createGocheckoutStore(props);
    }

    return <GocheckoutStoreContext.Provider value={storeRef.current}>{children}</GocheckoutStoreContext.Provider>;
};

export const useGocheckoutStore = <T,>(selector: (store: GocheckoutStore) => T): T => {
    const gocheckoutStoreContext = useContext(GocheckoutStoreContext);

    if (!gocheckoutStoreContext) {
        throw new Error(`useGocheckoutStore must be used within GocheckoutStoreProvider`);
    }

    return useStore(gocheckoutStoreContext, selector);
};
