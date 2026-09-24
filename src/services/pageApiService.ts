import { ApiUtil } from "@/utils/api/api";

const controllerUrl = "/page/";

export interface IPageApiService {
    getJson: <T>(key: string) => Promise<T | null>;
}

export const pageApiService: IPageApiService = {
    getJson<T>(path: string): Promise<T | null> {
        const result = ApiUtil.get<T | null>(`${controllerUrl}json?path=${path}`);

        return result;
    },
};
