"use client";

import { createContext, useRef, useContext, PropsWithChildren } from "react";
import { useStore } from "zustand";
import { createLoginStore, LoginStore } from "./loginStore";

export type LoginStoreApi = ReturnType<typeof createLoginStore>;

export const LoginStoreContext = createContext<LoginStoreApi | undefined>(undefined);

type LoginStoreProviderProps = PropsWithChildren;

export const LoginStoreProvider = ({ children }: LoginStoreProviderProps) => {
    const storeRef = useRef<LoginStoreApi | null>(null);
    if (storeRef.current === null) {
        storeRef.current = createLoginStore();
    }

    return <LoginStoreContext.Provider value={storeRef.current}>{children}</LoginStoreContext.Provider>;
};

export const useLoginStore = <T,>(selector: (store: LoginStore) => T): T => {
    const loginStoreContext = useContext(LoginStoreContext);

    if (!loginStoreContext) {
        throw new Error(`useLoginStore must be used within LoginStoreProvider`);
    }

    return useStore(loginStoreContext, selector);
};
