import { ReactNode, useEffect, useLayoutEffect, useReducer, useRef } from "react";

type LazyHydrateProps = {
    children: ReactNode;
    /** Hydrate when the content scrolls within 250px of the viewport. */
    whenVisible?: boolean;
    /** Hydrate when the browser is idle. */
    whenIdle?: boolean;
};

const isBrowser = typeof document !== "undefined";
const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;

/**
 * Renders children on the server but postpones their hydration on the client until a trigger fires.
 * Until then the wrapper keeps the server-rendered markup untouched: an empty `dangerouslySetInnerHTML`
 * with `suppressHydrationWarning` makes React adopt the existing DOM without reconciling it.
 * Local replacement for the unmaintained `react-lazy-hydration` package (same technique, same triggers).
 */
export default function LazyHydrate({ children, whenVisible, whenIdle }: LazyHydrateProps) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [hydrated, hydrate] = useReducer(() => true, !isBrowser);

    useIsomorphicLayoutEffect(() => {
        // Nothing was rendered on the server (client-side navigation), so there is nothing to preserve.
        if (!wrapperRef.current?.hasChildNodes()) {
            hydrate();
        }
    }, []);

    useEffect(() => {
        if (hydrated || !wrapperRef.current) return;

        const cleanups: Array<() => void> = [];

        if (whenVisible) {
            // The wrapper uses `display: contents` and has no box, so observe its first child instead.
            const element = wrapperRef.current.firstElementChild;
            if (!element || typeof IntersectionObserver === "undefined") {
                hydrate();
                return;
            }

            const observer = new IntersectionObserver(
                (entries) => {
                    if (entries.some((entry) => entry.isIntersecting || entry.intersectionRatio > 0)) {
                        hydrate();
                    }
                },
                { rootMargin: "250px" }
            );
            observer.observe(element);
            cleanups.push(() => observer.disconnect());
        }

        if (whenIdle) {
            if (typeof requestIdleCallback !== "undefined") {
                const id = requestIdleCallback(hydrate, { timeout: 500 });
                cleanups.push(() => cancelIdleCallback(id));
            } else {
                const id = setTimeout(hydrate, 2000);
                cleanups.push(() => clearTimeout(id));
            }
        }

        return () => cleanups.forEach((cleanup) => cleanup());
    }, [hydrated, whenVisible, whenIdle]);

    if (hydrated) {
        return (
            <div ref={wrapperRef} style={{ display: "contents" }}>
                {children}
            </div>
        );
    }

    return (
        <div
            ref={wrapperRef}
            style={{ display: "contents" }}
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: "" }}
        />
    );
}
