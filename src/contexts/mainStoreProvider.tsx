"use client";

import { createContext, useRef, useContext, PropsWithChildren, useEffect } from "react";
import { useStore } from "zustand";
import { createMainStore, IMainState, MainStore } from "./mainStore";

export type MainStoreApi = ReturnType<typeof createMainStore>;

export const MainStoreContext = createContext<MainStoreApi | undefined>(undefined);

type MainStoreProviderProps = PropsWithChildren<IMainState>;

export const MainStoreProvider = ({ children, ...props }: MainStoreProviderProps) => {
    const storeRef = useRef<MainStoreApi | null>(null);
    if (storeRef.current === null) {
        storeRef.current = createMainStore(props);
    }

    // Use useEffect to react to prop changes *after* initial mount/hydration
    useEffect(() => {
        if (storeRef.current) {
            storeRef.current.getState().setInitialData({
                menu: props.menu,
                userInfo: props.userInfo,
                isAuthValid: !!props.userInfo,
            });
        }
    }, [props.menu, props.userInfo]);

    return <MainStoreContext.Provider value={storeRef.current}>{children}</MainStoreContext.Provider>;
};

export const useMainStore = <T,>(selector: (store: MainStore) => T): T => {
    const mainStoreContext = useContext(MainStoreContext);

    if (!mainStoreContext) {
        throw new Error(`useMainStore must be used within MainStoreProvider`);
    }

    return useStore(mainStoreContext, selector);
};
