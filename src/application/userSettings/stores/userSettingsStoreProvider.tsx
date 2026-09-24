"use client";

import { createContext, useRef, useContext, PropsWithChildren, useEffect } from "react";
import { useStore } from "zustand";
import { createUserSettingsStore, UserSettingsStore } from "./userSettingsStore";
import { IUserSettingsPageProps } from "@/pages/my/settings";

export type UserSettingsStoreApi = ReturnType<typeof createUserSettingsStore>;

export const UserSettingsStoreContext = createContext<UserSettingsStoreApi | undefined>(undefined);

type UserSettingsStoreProviderProps = PropsWithChildren<IUserSettingsPageProps>;

export const UserSettingsStoreProvider = ({ children, ...props }: UserSettingsStoreProviderProps) => {
    const storeRef = useRef<UserSettingsStoreApi | null>(null);
    if (storeRef.current === null) {
        storeRef.current = createUserSettingsStore(props);
    }

    // Use useEffect to react to prop changes *after* initial mount/hydration
    useEffect(() => {
        if (storeRef.current) {
            storeRef.current.getState().setInitialData({
                userProfile: props.userSettings.userProfileSettings,
                email: props.userSettings.email,
            });
        }
    }, [props.userSettings.email, props.userSettings.userProfileSettings]);

    return <UserSettingsStoreContext.Provider value={storeRef.current}>{children}</UserSettingsStoreContext.Provider>;
};

export const useUserSettingsStore = <T,>(selector: (store: UserSettingsStore) => T): T => {
    const userSettingsStoreContext = useContext(UserSettingsStoreContext);

    if (!userSettingsStoreContext) {
        throw new Error(`useUserSettingsStore must be used within UserSettingsStoreProvider`);
    }

    return useStore(userSettingsStoreContext, selector);
};
