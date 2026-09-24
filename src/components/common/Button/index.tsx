import React, { FC } from "react";
import { Styled } from "./styles";

interface IButtonProps extends React.PropsWithChildren {
    type?: "submit" | "reset" | "button" | undefined;
    size?: "small" | "medium" | "big" | undefined;
    style?: "default" | "simple" | "icon" | "outlined" | undefined;
    bgColor?: string | undefined;
    disabled?: boolean;
    fill?: boolean;
    onClick?: () => void;
    className?: string | undefined;
}

const Button: FC<IButtonProps> = (props) => {
    const {
        type = "button",
        style = "default",
        children,
        bgColor,
        onClick,
        disabled = false,
        size = "medium",
        fill = true,
    } = props;

    if (style === "simple") {
        return (
            <Styled.SimpleBtn type={type} className={props.className} size={size} disabled={disabled} onClick={onClick}>
                {children}
            </Styled.SimpleBtn>
        );
    }

    if (style === "icon") {
        return (
            <Styled.IconBtn type={type} className={props.className} size={size} disabled={disabled} onClick={onClick}>
                {children}
            </Styled.IconBtn>
        );
    }

    if (style === "outlined") {
        return (
            <Styled.DefaultBtn
                type={type}
                className={props.className}
                size={size}
                disabled={disabled}
                onClick={onClick}
                $bgColor={"rgba(0,150,255,.078)"}
                $color={"#005bff"}
                $fill={fill}
            >
                <Styled.OutlinedChildrenWrapper>{children}</Styled.OutlinedChildrenWrapper>
                <Styled.OutlinedBg $disabled={disabled} />
            </Styled.DefaultBtn>
        );
    }

    return (
        <Styled.DefaultBtn
            type={type}
            className={props.className}
            size={size}
            disabled={disabled}
            onClick={onClick}
            $bgColor={bgColor}
            $fill={fill}
        >
            <Styled.OutlinedChildrenWrapper>{children}</Styled.OutlinedChildrenWrapper>
            <Styled.Bg $disabled={disabled} />
        </Styled.DefaultBtn>
    );
};

export default Button;
