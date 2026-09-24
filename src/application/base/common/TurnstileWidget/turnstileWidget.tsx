import { appConfig } from "@/appConfig";
import { useEffect } from "react";

export default function TurnstileWidget() {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    return <div className="cf-turnstile" data-size="flexible" data-sitekey={appConfig.cfSiteKey} />;
}
