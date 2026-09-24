import { createStore } from "zustand/vanilla";
import { fetchData } from "@/utils/api/apiAxious";
import { IMenuCategory } from "@/services/models/catalog/menuCategory";
import { IUserInfo } from "@/services/models/registration/userInfo";
import { IMenu } from "@/services/models/catalog/menu";
import { IFullTextSearchProductsResponse } from "@/services/models/search/fullTextSearchProductsResponse";
import { IClientDynamicInfo } from "@/services/models/user/clientDynamicInfo";

const controllerUrl = "/catalog/";
const productControllerUrl = "/product/";
const userControllerUrl = "/user/";

export interface IMainState {
    isMobile: boolean;
    isAuthValid: boolean;
    userInfo: IUserInfo;
    dynamicInfo: IClientDynamicInfo | null;
    menu: IMenu | null;
    selectedCategory: IMenuCategory | null;
    loading: boolean;
    searchProductsInProgress: boolean;
    menuIsOpen: boolean;
    error: string | null;
    selectedCategoryId: number | null;
    menuCategories: IMenuCategory[];
    searchProductsResult: IFullTextSearchProductsResponse | null;
    locale: string | null;
    setInitialData: (data: Partial<IMainState>) => void;
    toggleMenu: () => void;
    setSelectedCategoryId: (id: number, locale: string) => void;
    getCategory: (categoryId: number) => Promise<IMenuCategory | null>;
    searchProducts: (query: string) => Promise<void>;
    clearSearchProducts: () => void;
    getDynamicInfo: () => void;
}

export type MainStore = IMainState;

export const createMainStore = (initProps: IMainState) => {
    return createStore<MainStore>()((set, get) => ({
        ...initProps,
        loading: false,
        searchProductsInProgress: false,
        dynamicInfo: null,
        error: null,
        isAuthValid: !!initProps.userInfo,
        menuCategories: [],
        menuIsOpen: false,
        selectedCategoryId: null,
        selectedCategory: null,
        searchProductsResult: null,
        setInitialData: (data) => {
            set((state) => ({
                ...state,
                ...data,
            }));
        },
        toggleMenu() {
            const { menuIsOpen } = get();
            set({ menuIsOpen: !menuIsOpen });
        },
        setSelectedCategoryId: (id: number, locale: string) => {
            set({ selectedCategoryId: id, locale: locale });
            const { getCategory } = get();
            getCategory(id).then((resp) => {
                set({ selectedCategory: resp });
            });
        },
        getCategory: async (categoryId: number) => {
            const { menuCategories, locale } = get();

            const loadedCategory = menuCategories.find((mc) => mc.menuCategoryId === categoryId);
            if (loadedCategory) {
                return loadedCategory;
            }

            set({ loading: true, error: null });

            try {
                const category: IMenuCategory = await fetchData<IMenuCategory>(
                    `${controllerUrl}category?categoryId=${categoryId}&locale=${locale ?? "en"}`
                );

                if (category != null) {
                    set({
                        menuCategories: [...menuCategories, category],
                        loading: false,
                    });
                    return category;
                } else {
                    throw new Error("Recieved an empty category.");
                }
            } catch (error: any) {
                console.log(error);
                set({ error: error.message });
                return null;
            } finally {
                set({ loading: false });
            }
        },
        searchProducts: async (query: string) => {
            set({ searchProductsInProgress: true, error: null });

            try {
                const response: IFullTextSearchProductsResponse = await fetchData<IFullTextSearchProductsResponse>(
                    `${productControllerUrl}search?query=${query}`
                );

                set({ searchProductsResult: response });
            } catch (error: any) {
                console.log(error);
                set({ error: error.message });
            } finally {
                set({ searchProductsInProgress: false });
            }
        },
        clearSearchProducts: () => {
            set({ searchProductsResult: null });
        },
        getDynamicInfo: async () => {
            try {
                const dynamicInfo = await fetchData<IClientDynamicInfo>(`${userControllerUrl}dynamic-info/client`);
                set({ dynamicInfo: dynamicInfo });
            } catch (error: any) {
                console.log(error);
            }
        },
    }));
};
