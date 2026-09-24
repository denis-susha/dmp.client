"use client";

import { createContext, useRef, useContext, PropsWithChildren } from "react";
import { useStore } from "zustand";
import { createHomeZustandStore, HomeZustandStore } from "./homeStore";
import { IHomeNextPageProps } from "@/pages";

export type HomeZustandStoreApi = ReturnType<typeof createHomeZustandStore>;

export const HomeZustandStoreContext = createContext<HomeZustandStoreApi | undefined>(undefined);

type HomeZustandStoreProviderProps = PropsWithChildren<IHomeNextPageProps>;

export const HomeZustandStoreProvider = ({ children, ...props }: HomeZustandStoreProviderProps) => {
    const storeRef = useRef<HomeZustandStoreApi | null>(null);
    if (storeRef.current === null) {
        storeRef.current = createHomeZustandStore(props);
    }

    return <HomeZustandStoreContext.Provider value={storeRef.current}>{children}</HomeZustandStoreContext.Provider>;
};

export const useHomeZustandStore = <T,>(selector: (store: HomeZustandStore) => T): T => {
    const homeZustandStoreContext = useContext(HomeZustandStoreContext);

    if (!homeZustandStoreContext) {
        throw new Error(`useHomeZustandStore must be used within HomeZustandStoreProvider`);
    }

    return useStore(homeZustandStoreContext, selector);
};
