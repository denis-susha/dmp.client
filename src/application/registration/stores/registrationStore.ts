import { createStore } from "zustand/vanilla";
import { postData } from "@/utils/api/apiAxious";
import { RegistrationResultStatusEnum } from "@/services/models/registration/registrationResultStatusEnum";
import { IRegistrationRequest } from "@/services/models/registration/registrationRequest";

const controllerUrl = "/registration/";

export interface IRegistrationState {
    error: boolean | null;
    registrationInProgress: boolean;
    registrationResult: RegistrationResultStatusEnum | null;
    register: (request: IRegistrationRequest) => Promise<void>;
}

export type RegistrationStore = IRegistrationState;

export const createRegistrationStore = () => {
    return createStore<RegistrationStore>()((set) => ({
        error: null,
        registrationInProgress: false,
        registrationResult: null,
        register: async (request: IRegistrationRequest) => {
            set({ registrationInProgress: true, registrationResult: null, error: null });

            try {
                const restult: RegistrationResultStatusEnum = await postData<RegistrationResultStatusEnum>(
                    `${controllerUrl}client`,
                    request
                );
                set({ registrationResult: restult });
            } catch (error: unknown) {
                console.log(error);
                set({ error: true });
            } finally {
                set({ registrationInProgress: false });
            }
        },
    }));
};
