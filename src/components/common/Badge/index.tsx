import React, { FC } from "react";
import styled, { DefaultTheme } from "styled-components";

interface BadgeProps {
    count?: number;
    maxCount?: number;
    showZero?: boolean;
    color?: keyof DefaultTheme["colors"];
    className?: string;
    dot?: boolean;
    children: React.ReactNode;
}

const Wrapper = styled.div`
    position: relative;
    display: inline-block;
`;

interface BadgeContainerProps {
    $count?: number;
    $maxCount?: number;
    $showZero?: boolean;
    $color?: keyof DefaultTheme["colors"];
}

const BadgeContainer = styled.span<BadgeContainerProps>`
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    background-color: ${({ theme, $color = "primary" }) => theme.colors[$color]};
    color: #fff;
    font-size: 12px;
    font-weight: bold;
    border-radius: 8px;
    padding: 0px 5px;
    min-width: 10px;
    text-align: center;
    display: ${({ $count, $showZero }) => ($count === 0 && !$showZero ? "none" : "inline-block")};
`;

const Dot = styled.div<BadgeContainerProps>`
    background-color: ${({ theme, $color = "primary" }) => theme.colors[$color]};
    left: 50%;
    position: absolute;
    top: 0px;
    z-index: 2;
    height: 8px;
    min-width: 8px;
    border-radius: 4px;
`;

const Badge: FC<BadgeProps> = ({
    count = 0,
    maxCount = 99,
    showZero = false,
    color = "primary",
    className,
    dot = false,
    children,
}) => {
    const displayCount = count > maxCount ? `${maxCount}+` : count;

    return (
        <Wrapper className={className}>
            {children}
            {count !== undefined && (showZero || count > 0) && (
                <BadgeContainer $color={color} $count={count} $showZero={showZero}>
                    {dot ? <Dot $color={color} /> : displayCount}
                </BadgeContainer>
            )}
        </Wrapper>
    );
};

export default Badge;
