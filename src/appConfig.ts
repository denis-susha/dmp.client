class AppConfig {
    get isServer() {
        return typeof window === "undefined";
    }

    get apiHost() {
        return this.isServer ? process.env.NEXT_INTERNAL_API_HOST_URL : process.env.NEXT_PUBLIC_API_HOST_URL || "";
    }

    get accessControlAllowOriginHdr() {
        return process.env.NEXT_PUBLIC_ACCESS_CONTROL_ALLOW_ORIGIN || "";
    }

    get imagesHost() {
        return process.env.NEXT_PUBLIC_IMAGES_HOST_URL;
    }

    get staticUrl() {
        return `${this.imagesHost}/static/`;
    }

    get sellerHost() {
        return process.env.NEXT_PUBLIC_SELLER_HOST_URL;
    }

    get clientHost() {
        return process.env.NEXT_PUBLIC_CLIENT_HOST_URL;
    }

    get name() {
        return "Filezon";
    }

    get cfSiteKey() {
        return process.env.NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY || "";
    }
}

export const appConfig = new AppConfig();
