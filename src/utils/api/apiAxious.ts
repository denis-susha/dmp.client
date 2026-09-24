import { appConfig } from "@/appConfig";
import axios, { AxiosError, AxiosHeaderValue, AxiosRequestConfig } from "axios";
import { GetServerSidePropsContext } from "next";

// Creates an axios instance: without a context for the browser, with a GetServerSidePropsContext for SSR.
const createApiClient = (serverSideContext?: GetServerSidePropsContext) => {
    const config: AxiosRequestConfig = {
        baseURL: appConfig.apiHost,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            "Access-Control-Allow-Origin": appConfig.accessControlAllowOriginHdr,
        },
        withCredentials: true,
    };

    if (serverSideContext && config.headers) {
        // On the server, forward the incoming request's cookies and client headers to the API.
        const cookie = serverSideContext.req.headers.cookie;
        if (cookie) {
            config.headers.Cookie = cookie;
        }
        const referer = serverSideContext.req.headers.referer;
        if (referer) {
            config.headers.Referer = referer;
        }
        const userAgent = serverSideContext.req.headers["user-agent"];
        if (userAgent) {
            config.headers["User-Agent"] = userAgent;
        }
        const realIp = serverSideContext.req.headers["x-forwarded-for"];
        if (realIp) {
            config.headers["X-Real-IP"] = realIp;
        }
        const acceptLanguage = serverSideContext.req.headers["accept-language"];
        if (acceptLanguage) {
            config.headers["Accept-Language"] = acceptLanguage;
        }
    }

    const apiClient = axios.create(config);

    // Track if a refresh is already in progress
    let isRefreshing = false;
    // Queue of failed requests to retry after token refresh
    let failedQueue: Array<{
        resolve: (value: unknown) => void;
        reject: (reason?: any) => void;
        config: AxiosRequestConfig;
    }> = [];

    const processQueue = (error: AxiosError | null, cookie: AxiosHeaderValue) => {
        failedQueue.forEach(({ resolve, reject, config }) => {
            if (!error) {
                config.headers = {
                    ...config.headers,
                    Cookie: cookie,
                };
                resolve(apiClient(config));
            } else {
                reject(error);
            }
        });
        failedQueue = [];
    };

    // Check if user is authenticated on server side only
    const hasServerSideRefreshToken = (): boolean => {
        if (serverSideContext) {
            return !!serverSideContext.req.cookies["refresh_token"];
        }
        return false;
    };

    apiClient.interceptors.response.use(
        (response) => response,
        async (error: AxiosError) => {
            const originalConfig = error.config as AxiosRequestConfig;

            // If error is 401/403 and we haven't tried to refresh yet
            if (
                (error.response?.status === 401 || error.response?.status === 403) &&
                originalConfig &&
                !(originalConfig as any)._retry
            ) {
                // Mark this request as retried to prevent infinite loops
                (originalConfig as any)._retry = true;

                // Server-side: check if refresh token exists before attempting refresh
                if (serverSideContext && !hasServerSideRefreshToken()) {
                    if (originalConfig.url === "/user/") {
                        return Promise.resolve({ data: null, success: true });
                    } else {
                        // No refresh token, redirect to login
                        serverSideContext.res.writeHead(302, { Location: "/login" });
                        serverSideContext.res.end();
                        return Promise.reject(error);
                    }
                }

                if (!serverSideContext) {
                    if (originalConfig.url === "/auth/login") {
                        return Promise.reject(error);
                    }
                }

                // If we're already refreshing, queue this request
                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject, config: originalConfig });
                    });
                }

                isRefreshing = true;

                try {
                    // Call refresh token endpoint - cookies will be sent automatically
                    const refreshResp = await axios.get(`${appConfig.apiHost}/auth/refresh`, config);

                    if (serverSideContext) {
                        // Update the cookie in the response headers
                        const { res } = serverSideContext;
                        const { req } = serverSideContext;
                        const setcookie = refreshResp.headers["set-cookie"];
                        if (setcookie) {
                            res.setHeader("Set-Cookie", setcookie);
                            // Update the cookie in the request headers for the next request
                            req.headers.cookie = setcookie.toString();
                            // Update the cookie in the axios instance
                            apiClient.defaults.headers.Cookie = setcookie.toString();
                            // Update the original request headers
                            if (originalConfig.headers) {
                                originalConfig.headers.Cookie = setcookie.toString();
                            }
                        }
                    }

                    processQueue(null, originalConfig.headers!.Cookie);

                    return apiClient(originalConfig);
                } catch (refreshError) {
                    // Refresh failed, reject all queued requests
                    processQueue(refreshError as AxiosError, null);

                    if (serverSideContext) {
                        // Clear the auth cookies in the browser
                        const { res } = serverSideContext;
                        res.setHeader("Set-Cookie", [
                            "access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict",
                            "refresh_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict",
                        ]);
                    }

                    // Handle auth failure (logout, redirect to login, etc.)
                    if (typeof window !== "undefined") {
                        window.location.href = "/login";
                    } else if (serverSideContext) {
                        if (originalConfig.url === "/user/") {
                            return Promise.resolve({ data: null, success: true });
                        } else {
                            serverSideContext.res.writeHead(302, { Location: "/login" });
                            serverSideContext.res.end();
                        }
                    }

                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            }

            return Promise.reject(error);
        }
    );

    return apiClient;
};

const clientApi = createApiClient();

export const getServerApi = (context: GetServerSidePropsContext) => {
    return createApiClient(context);
};

// Wraps getServerSideProps and turns an API 401 into a redirect to /login
export const withAuth = (handler: (context: GetServerSidePropsContext) => Promise<any>) => {
    return async (context: GetServerSidePropsContext) => {
        try {
            return await handler(context);
        } catch (error) {
            if ((error as AxiosError).response?.status === 401) {
                return {
                    redirect: {
                        destination: "/login",
                        permanent: false,
                    },
                };
            }
            throw error;
        }
    };
};

export const fetchData = async <T>(url: string): Promise<T> => {
    const response = await clientApi.get<T>(url);
    return response.data;
};

export const postData = async <T>(url: string, data: any): Promise<T> => {
    const response = await clientApi.post<T>(url, data);
    return response.data;
};
