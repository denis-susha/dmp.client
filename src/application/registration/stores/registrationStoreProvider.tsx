"use client";

import { createContext, useRef, useContext, PropsWithChildren } from "react";
import { useStore } from "zustand";
import { createRegistrationStore, RegistrationStore } from "./registrationStore";

export type RegistrationStoreApi = ReturnType<typeof createRegistrationStore>;

export const RegistrationStoreContext = createContext<RegistrationStoreApi | undefined>(undefined);

type RegistrationStoreProviderProps = PropsWithChildren;

export const RegistrationStoreProvider = ({ children }: RegistrationStoreProviderProps) => {
    const storeRef = useRef<RegistrationStoreApi | null>(null);
    if (storeRef.current === null) {
        storeRef.current = createRegistrationStore();
    }

    return <RegistrationStoreContext.Provider value={storeRef.current}>{children}</RegistrationStoreContext.Provider>;
};

export const useRegistrationStore = <T,>(selector: (store: RegistrationStore) => T): T => {
    const registrationStoreContext = useContext(RegistrationStoreContext);

    if (!registrationStoreContext) {
        throw new Error(`useRegistrationStore must be used within RegistrationStoreProvider`);
    }

    return useStore(registrationStoreContext, selector);
};
