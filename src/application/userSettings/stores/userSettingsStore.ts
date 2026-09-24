import { createStore } from "zustand/vanilla";
import { IUserSettingsPageProps } from "@/pages/my/settings";
import { IUserProfileSettings } from "@/services/models/user/userProfile";
import { postData } from "@/utils/api/apiAxious";

const controllerUrl = "/user/";

export interface IUserSettingsState {
    error: boolean | null;
    userProfile: IUserProfileSettings;
    email: string;
    isLoading: boolean;
    updateUserProfile: (updatedFields: Partial<IUserProfileSettings>) => void;
    setInitialData: (data: Partial<IUserSettingsState>) => void;
    sendUserProfileSettings: (request: IUserProfileSettings) => Promise<void>;
}

export type UserSettingsStore = IUserSettingsState;

export const createUserSettingsStore = (initProps: IUserSettingsPageProps) => {
    return createStore<UserSettingsStore>()((set) => ({
        error: null,
        isLoading: false,
        userProfile: initProps.userSettings.userProfileSettings,
        email: initProps.userSettings.email,
        setInitialData: (data) => {
            set((state) => ({
                ...state,
                ...data,
            }));
        },
        updateUserProfile: (updatedFields) =>
            set((state) => ({
                userProfile: {
                    ...state.userProfile,
                    ...updatedFields,
                },
            })),
        sendUserProfileSettings: async (request: IUserProfileSettings) => {
            try {
                set({ isLoading: true, error: null });

                const result = await postData<boolean>(`${controllerUrl}profile-settings`, request);
                if (result) {
                    set({ userProfile: request });
                }
            } catch (error: unknown) {
                console.log(error);
                set({ error: true });
            } finally {
                set({ isLoading: false });
            }
        },
    }));
};
