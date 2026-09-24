import { appConfig } from "@/appConfig";
import { ApiError } from "./apiError";

const apiHostUrl = appConfig.apiHost;

const defaultRequest: RequestInit = {
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": appConfig.accessControlAllowOriginHdr,
    },
    credentials: "include",
};

function withMethod(request: RequestInit, method: string): RequestInit {
    return { ...request, method, headers: { ...request.headers } };
}

async function throwError(response: Response, method?: string): Promise<never> {
    const text = await response.text();
    const errorMessage = `${method}: ${response.url} returned status: ${response.status} and response: ${text}`;

    throw new ApiError(errorMessage, response.status);
}

/** Minimal fetch-based client used by the browser for simple GET requests (see pageApiService). */
export class ApiUtil {
    static async get<T>(url: string, request = defaultRequest): Promise<T | null> {
        const requestInit = withMethod(request, "GET");

        const requestUrl = apiHostUrl + url;
        const response = await fetch(requestUrl, requestInit);

        if (!response.ok) {
            if (response.status === 401) {
                const secondTryResp: T | null = await this.catchUnauthorized<T>(requestUrl, requestInit);

                if (secondTryResp) {
                    return secondTryResp;
                }
            }

            await throwError(response, requestInit.method);
        }

        return response.status !== 204 ? response.json() : null;
    }

    private static async catchUnauthorized<T>(url: string, requestInit: RequestInit): Promise<T | null> {
        const isSuccess = await this.refreshToken();

        if (isSuccess) {
            // Repeat the original request; the refreshed auth cookies are sent automatically.
            const response = await fetch(url, requestInit);

            if (!response.ok) {
                await throwError(response, requestInit.method);
            }

            return response.json();
        }

        window.location.assign("/login");

        return null;
    }

    private static async refreshToken(): Promise<boolean> {
        try {
            const refreshResp = await fetch(apiHostUrl + "/auth/refresh", withMethod(defaultRequest, "GET"));

            if (refreshResp.ok) {
                return true;
            }
        } catch (error) {
            console.log(error);
        }

        return false;
    }
}
