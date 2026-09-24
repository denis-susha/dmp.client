import { IncomingHttpHeaders } from "http";

export const isMobile = (headers: IncomingHttpHeaders): boolean => {
    const userAgent = headers["user-agent"] || "";
    return /mobile/i.test(userAgent);
};
