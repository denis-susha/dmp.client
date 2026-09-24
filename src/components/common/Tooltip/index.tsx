import React, { useState, useEffect, useRef, ReactNode } from "react";
import ReactDOM from "react-dom";
import { Styled } from "./tooltip.styles";

type TooltipPosition = "top" | "bottom" | "left" | "right";
type TooltipTrigger = "hover" | "click";

const useTooltipPosition = (
    triggerRef: React.RefObject<HTMLElement | null>,
    tooltipRef: React.RefObject<HTMLElement | null>,
    isVisible: boolean,
    preferredPosition: TooltipPosition
) => {
    const [position, setPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
        const updatePosition = () => {
            if (!isVisible || !triggerRef.current || !tooltipRef.current) return;

            const triggerRect = triggerRef.current.getBoundingClientRect();
            const tooltipRect = tooltipRef.current.getBoundingClientRect();
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            let top = 0;
            let left = 0;

            switch (preferredPosition) {
                case "top":
                    top = triggerRect.top - tooltipRect.height;
                    left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
                    if (top < 0) {
                        // Fallback to bottom if not enough space on top
                        top = triggerRect.bottom;
                    }
                    break;
                case "bottom":
                    top = triggerRect.bottom;
                    left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
                    if (top + tooltipRect.height > windowHeight) {
                        // Fallback to top if not enough space at bottom
                        top = triggerRect.top - tooltipRect.height;
                    }
                    break;
                case "left":
                    top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
                    left = triggerRect.left - tooltipRect.width;
                    if (left < 0) {
                        // Fallback to right if not enough space on left
                        left = triggerRect.right;
                    }
                    break;
                case "right":
                    top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
                    left = triggerRect.right;
                    if (left + tooltipRect.width > windowWidth) {
                        // Fallback to left if not enough space on right
                        left = triggerRect.left - tooltipRect.width;
                    }
                    break;
            }

            // Final adjustments to keep tooltip within viewport
            if (left < 0) left = 0;
            if (left + tooltipRect.width > windowWidth) left = windowWidth - tooltipRect.width;
            if (top < 0) top = 0;
            if (top + tooltipRect.height > windowHeight) top = windowHeight - tooltipRect.height;

            setPosition({ top, left });
        };

        updatePosition();
        window.addEventListener("resize", updatePosition);
        window.addEventListener("scroll", updatePosition);

        return () => {
            window.removeEventListener("resize", updatePosition);
            window.removeEventListener("scroll", updatePosition);
        };
    }, [isVisible, triggerRef, tooltipRef, preferredPosition]);

    return position;
};

interface TooltipProps {
    children: ReactNode;
    content: ReactNode;
    position?: TooltipPosition;
    trigger?: TooltipTrigger;
    minWidth?: number;
    maxWidth?: number;
}

const Tooltip: React.FC<TooltipProps> = ({
    children,
    content,
    position = "bottom",
    trigger = "hover",
    minWidth,
    maxWidth,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const triggerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const tooltipPosition = useTooltipPosition(triggerRef, tooltipRef, isVisible, position);

    useEffect(() => {
        if (!document.getElementById("tooltip-root")) {
            const tooltipRoot = document.createElement("div");
            tooltipRoot.id = "tooltip-root";
            document.body.appendChild(tooltipRoot);
        }
    }, []);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                trigger === "click" &&
                isVisible &&
                tooltipRef.current &&
                !tooltipRef.current.contains(event.target as Node) &&
                triggerRef.current &&
                !triggerRef.current.contains(event.target as Node)
            ) {
                setIsVisible(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isVisible, trigger]);

    const handleTriggerEvents = {
        onMouseEnter: () => trigger === "hover" && setIsVisible(true),
        onMouseLeave: () => trigger === "hover" && setIsVisible(false),
        onClick: () => trigger === "click" && setIsVisible(!isVisible),
    };

    return (
        <>
            <div ref={triggerRef} {...handleTriggerEvents}>
                {children}

                {isVisible &&
                    ReactDOM.createPortal(
                        <Styled.AnimatedBox
                            $visible={isVisible}
                            ref={tooltipRef}
                            className="fixed z-50 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-xs"
                            style={{
                                top: `${tooltipPosition.top}px`,
                                left: `${tooltipPosition.left}px`,
                                minWidth: minWidth,
                                maxWidth: maxWidth,
                            }}
                        >
                            {content}
                        </Styled.AnimatedBox>,
                        document.getElementById("tooltip-root") || document.body
                    )}
                <div className="absolute left-0 translate-x-[120px] bottom-full"></div>
            </div>
        </>
    );
};

export default Tooltip;
