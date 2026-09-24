import { PropsWithChildren, type FC } from "react";
import { Styled } from "./myEmpty.styles";

export const MyEmpty: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Styled.NoOrders>
            <Styled.Wrapper>{children}</Styled.Wrapper>
        </Styled.NoOrders>
    );
};
