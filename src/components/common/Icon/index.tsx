import { ComponentType, FC, JSX, useCallback, useEffect, useRef, useState } from "react";

import { useIntersection } from "next/dist/client/use-intersection";
import dynamic from "next/dynamic";

import { empty } from "@/utils";

import { iconList } from "./Icon.const";
import { ClassNameValue, twMerge } from "tailwind-merge";

export type IconNameType = keyof typeof iconList;

export type TIcon = {
    /**
     * Icon name, a key of iconList {@link IconNameType}
     */
    icon?: IconNameType | string;
    /**
     * Tailwind classes merged with twMerge
     */
    className?: ClassNameValue;
    /**
     * Icon width
     */
    width?: number;
    /**
     * Icon height
     */
    height?: number;
    /**
     * Icon size, used when width === height
     */
    size?: number;
    /**
     * [Deprecated] Icon path relative to public/images/icons/
     */
    src?: string;
    /**
     * Load the icon lazily when it approaches the viewport
     */
    isLazy?: boolean;
    viewBox?: string;
};
const getDynamicIcon = (icon: string, fallbackIcon: JSX.Element) =>
    dynamic(() => import(`../../../../public/images/icons/${iconList[icon as IconNameType]}.svg`), {
        loading: () => fallbackIcon,
    });
// Some callers pass an icon path (relative to /public/images/icons/) instead of an icon name
const getDynamicIconBySrc = (src: string, fallbackIcon: JSX.Element) =>
    dynamic(() => import(`../../../../public/images/icons/${src}.svg`), {
        loading: () => fallbackIcon,
    });

const Icon: FC<TIcon> = ({ icon, className, width, height, size, src, viewBox, isLazy = true }) => {
    // Keep the dynamic component in a ref so it is not recreated on every render
    const IconDynamicRef = useRef<ComponentType<{}> | null>(null);
    // Loading happens in effects: in some stateful parents the icon would otherwise stay null and never update.

    const loadDynamic = useCallback(() => {
        const fallbackIcon = <svg className={twMerge(className)} width={size || width} height={size || height} />;
        if (!empty(src)) {
            return getDynamicIconBySrc(src, fallbackIcon);
        } else if (!empty(icon)) {
            return getDynamicIcon(icon, fallbackIcon);
        }
        return null;
    }, [className, height, icon, size, src, width]);

    const [setRef, isIntersected] = useIntersection<SVGSVGElement>({
        rootMargin: "200px",
        disabled: !isLazy,
    });

    // Triggers a re-render once the dynamic component has been created
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (isLazy) return;
        IconDynamicRef.current = loadDynamic();
        setLoaded(true);
    }, [isLazy, loadDynamic]);

    useEffect(() => {
        if (isIntersected) {
            IconDynamicRef.current = loadDynamic();
            setLoaded(true);
        }
    }, [isIntersected, loadDynamic]);

    // Supports switching icons dynamically (e.g. the sorting dropdown changes its title and icon on selection)
    useEffect(() => {
        if (loaded) {
            IconDynamicRef.current = loadDynamic();
        }
        IconDynamicRef.current = loadDynamic();
    }, [icon, loadDynamic, loaded]);

    // Neither a known icon name nor a src was provided
    if (!src && (!icon || typeof iconList[icon as IconNameType] === "undefined")) return null;

    return loaded && IconDynamicRef.current ? (
        <IconDynamicRef.current
            //@ts-expect-error @typescript-eslint/ban-ts-comment
            //ignore the error, because we need to pass the className to the component
            className={twMerge(className)}
            width={size || width}
            height={size || height}
            viewBox={viewBox}
        />
    ) : (
        <svg
            ref={(ref) => setRef(ref)}
            className={twMerge(className)}
            width={size || width}
            height={size || height}
            viewBox={viewBox}
        />
    );
};

export default Icon;
