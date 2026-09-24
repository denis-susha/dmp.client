import { createStore } from "zustand/vanilla";
import { IProduct } from "@/services/models/product/product";
import { IHomeNextPageProps } from "@/pages";

export interface IHomeState {
    recommendedProducts: IProduct[] | null;
}

export type HomeZustandStore = IHomeState;

export const createHomeZustandStore = (initProps: IHomeNextPageProps) => {
    return createStore<HomeZustandStore>()(() => ({
        ...initProps,
    }));
};
