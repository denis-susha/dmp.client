import { useEffect, useRef, useState } from "react";

function useInView<T extends Element>(options?: IntersectionObserverInit) {
    const ref = useRef<T | null>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
                observer.disconnect(); // only trigger once
            }
        }, options);

        observer.observe(ref.current);

        return () => {
            observer.disconnect();
        };
    }, [options]);

    return { ref, isInView };
}

export default useInView;
