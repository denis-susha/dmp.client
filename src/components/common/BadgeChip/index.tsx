import React, { FC } from "react";
import styled from "styled-components";

interface BadgeProps {
    children: React.ReactNode;
    color?: "primary" | "secondary" | "success" | "warning" | "error" | "info";
    size?: "small" | "medium" | "large";
    variant?: "filled" | "outlined";
    className?: string;
}

const getColor = (color: string, variant: string) => {
    switch (color) {
        case "primary":
            return variant === "filled" ? "#007bff" : "#007bff40";
        case "secondary":
            return variant === "filled" ? "#6c757d" : "#6c757d40";
        case "success":
            return variant === "filled" ? "#28a745" : "#28a74540";
        case "warning":
            return variant === "filled" ? "#ffc107" : "#ffc10740";
        case "error":
            return variant === "filled" ? "#dc3545" : "#dc354540";
        case "info":
            return variant === "filled" ? "#17a2b8" : "#17a2b840";
        default:
            return "#6c757d";
    }
};

const BadgeWrapper = styled.span<BadgeProps>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: ${({ size }) => (size === "small" ? "4px 8px" : size === "large" ? "8px 16px" : "6px 12px")};
    font-size: ${({ size }) => (size === "small" ? "12px" : size === "large" ? "16px" : "14px")};
    font-weight: 600;
    border-radius: 12px;
    background-color: ${({ color = "primary", variant = "filled" }) => getColor(color, variant)};
    color: ${({ variant }) => (variant === "filled" ? "#fff" : "#000")};
    border: ${({ variant, color = "primary" }) =>
        variant === "outlined" ? `2px solid ${getColor(color, "filled")}` : "none"};
`;

const BadgeChip: FC<BadgeProps> = ({ children, color = "primary", size = "medium", variant = "filled", className }) => {
    return (
        <BadgeWrapper color={color} size={size} variant={variant} className={className}>
            {children}
        </BadgeWrapper>
    );
};

export default BadgeChip;
