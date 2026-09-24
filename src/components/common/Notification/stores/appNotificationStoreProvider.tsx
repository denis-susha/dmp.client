"use client";

import { createContext, useRef, useContext, PropsWithChildren } from "react";
import { useStore } from "zustand";
import { createAppNotificationStore, AppNotificationStore } from "./appNotificationStore";

export type AppNotificationStoreApi = ReturnType<typeof createAppNotificationStore>;

export const AppNotificationStoreContext = createContext<AppNotificationStoreApi | undefined>(undefined);

type AppNotificationStoreProviderProps = PropsWithChildren;

export const AppNotificationStoreProvider = ({ children }: AppNotificationStoreProviderProps) => {
    const storeRef = useRef<AppNotificationStoreApi | null>(null);
    if (storeRef.current === null) {
        storeRef.current = createAppNotificationStore();
    }

    return (
        <AppNotificationStoreContext.Provider value={storeRef.current}>{children}</AppNotificationStoreContext.Provider>
    );
};

export const useAppNotificationStore = <T,>(selector: (store: AppNotificationStore) => T): T => {
    const appNotificationStoreContext = useContext(AppNotificationStoreContext);

    if (!appNotificationStoreContext) {
        throw new Error(`useAppNotificationStore must be used within AppNotificationStoreProvider`);
    }

    return useStore(appNotificationStoreContext, selector);
};
