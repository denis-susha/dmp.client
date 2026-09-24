import { createStore } from "zustand/vanilla";
import { ICartNextPageProps } from "@/pages/cart";
import { ICartData } from "@/services/models/cart/cartData";
import { postData } from "@/utils/api/apiAxious";
import { IUpdateCartItemResponse } from "@/services/models/cart/updateCartItemResponse";
import { UpdateCartStatusEnum } from "@/services/models/cart/updateCartStatusEnum";
import { ICartItemSelection } from "@/services/models/cart/cartItemSelection";

const controllerUrl = "/cart/";

export interface ICartState {
    error: boolean | null;
    cartData: ICartData;
    updCartInProgress: boolean;
    isAllSelected: boolean;
    setInitialData: (data: Partial<ICartState>) => void;
    selectCartItems: (selection: ICartItemSelection[]) => Promise<void>;
    removeItems: (productIds: number[]) => Promise<void>;
    updateItem: (productId: number, quantity: number) => Promise<void>;
    setCartData: (cartData?: ICartData) => void;
    setItemQty: (productId: number, qty: number | null) => void;
}

export type CartStore = ICartState;

export const createCartStore = (initProps: ICartNextPageProps) => {
    const ifIsAllSelected = (cartData?: ICartData): boolean => {
        return !!cartData && !!cartData.items && cartData.items.findIndex((i) => !i.selected) === -1;
    };

    return createStore<CartStore>()((set, get) => ({
        ...initProps,
        updCartInProgress: false,
        error: null,
        isAllSelected: ifIsAllSelected(initProps.cartData),
        setInitialData: (data) => {
            set((state) => ({
                ...state,
                ...data,
            }));
        },
        setCartData: (cartData?: ICartData) => {
            set({ cartData: cartData, isAllSelected: ifIsAllSelected(cartData) });
        },
        updateItem: async (productId: number, quantity: number) => {
            try {
                set({ updCartInProgress: true, error: null });

                const data = {
                    productId: productId,
                    quantity: quantity,
                };

                const result = await postData<IUpdateCartItemResponse>(`${controllerUrl}update`, data);
                if (result.status === UpdateCartStatusEnum.Success) {
                    const { setCartData } = get();
                    setCartData(result.cartData);
                }
            } catch (error: unknown) {
                console.log(error);
                set({ error: true });
            } finally {
                set({ updCartInProgress: false });
            }
        },
        selectCartItems: async (request: ICartItemSelection[]) => {
            try {
                set({ updCartInProgress: true, error: null });

                const result = await postData<ICartData>(`${controllerUrl}select`, request);
                const { setCartData } = get();
                setCartData(result);
            } catch (error: unknown) {
                console.log(error);
                set({ error: true });
            } finally {
                set({ updCartInProgress: false });
            }
        },
        removeItems: async (productIds: number[]) => {
            try {
                set({ updCartInProgress: true, error: null });

                const result = await postData<IUpdateCartItemResponse>(`${controllerUrl}delete`, productIds);
                if (result.status === UpdateCartStatusEnum.Success) {
                    const { setCartData } = get();
                    setCartData(result.cartData);
                }
            } catch (error: unknown) {
                console.log(error);
                set({ error: true });
            } finally {
                set({ updCartInProgress: false });
            }
        },
        setItemQty: (productId: number, qty: number | null) => {
            const { cartData } = get();
            cartData.items = cartData.items?.map((item) =>
                item.productId === productId ? { ...item, quantity: qty } : item
            );
            set({ cartData: cartData });
        },
    }));
};
