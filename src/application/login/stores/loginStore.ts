import { createStore } from "zustand/vanilla";
import { HttpStatusEnum } from "@/services/models/registration/httpStatusEnum";
import { ILoginRequest } from "@/services/models/registration/loginRequest";
import { IAuthInfo } from "@/services/models/registration/authInfo";
import { postData } from "@/utils/api/apiAxious";

const controllerUrl = "/auth/";

export interface ILoginState {
    error: boolean | null;
    loginInProgress: boolean;
    loginResultStatus: HttpStatusEnum | null;
    login: (request: ILoginRequest) => Promise<void>;
    updateLoginResultStatus: (value: HttpStatusEnum | null) => void;
}

export type LoginStore = ILoginState;

export const createLoginStore = () => {
    return createStore<LoginStore>()((set) => ({
        error: null,
        loginInProgress: false,
        loginResultStatus: null,
        login: async (request: ILoginRequest) => {
            set({ loginInProgress: true, loginResultStatus: null, error: null });

            try {
                await postData<IAuthInfo>(`${controllerUrl}login`, request);
                set({ loginResultStatus: HttpStatusEnum.OK });
            } catch (error: any) {
                console.log(error);
                const statusCode = error.status;
                if (
                    (statusCode && statusCode == HttpStatusEnum.BadRequest) ||
                    statusCode == HttpStatusEnum.Unauthorized
                ) {
                    set({ loginResultStatus: statusCode.toString() });
                } else {
                    set({ error: true });
                }
            } finally {
                set({ loginInProgress: false });
            }
        },
        updateLoginResultStatus(value: HttpStatusEnum | null) {
            set({ loginResultStatus: value });
        },
    }));
};
