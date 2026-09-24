"use client";

import { createContext, useRef, useContext, PropsWithChildren, useEffect } from "react";
import { useStore } from "zustand";
import { createCartStore, CartStore } from "./cartStore";
import { ICartNextPageProps } from "@/pages/cart";

export type CartStoreApi = ReturnType<typeof createCartStore>;

export const CartStoreContext = createContext<CartStoreApi | undefined>(undefined);

type CartStoreProviderProps = PropsWithChildren<ICartNextPageProps>;

export const CartStoreProvider = ({ children, ...props }: CartStoreProviderProps) => {
    const storeRef = useRef<CartStoreApi | null>(null);
    if (storeRef.current === null) {
        storeRef.current = createCartStore(props);
    }

    // Use useEffect to react to prop changes *after* initial mount/hydration
    useEffect(() => {
        if (storeRef.current) {
            storeRef.current.getState().setInitialData({
                cartData: props.cartData,
            });
        }
    }, [props.cartData]);

    return <CartStoreContext.Provider value={storeRef.current}>{children}</CartStoreContext.Provider>;
};

export const useCartStore = <T,>(selector: (store: CartStore) => T): T => {
    const cartStoreContext = useContext(CartStoreContext);

    if (!cartStoreContext) {
        throw new Error(`useCartStore must be used within CartStoreProvider`);
    }

    return useStore(cartStoreContext, selector);
};
