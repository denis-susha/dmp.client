import React, { FC, ReactNode, RefObject, useEffect } from "react";
import { Styled } from "./styles";
import { useMainStore } from "@/contexts/mainStoreProvider";
import { Catalog } from "../../Catalog";

interface Props {
    catalogBtnRef: RefObject<HTMLDivElement | null>;
    children?: ReactNode;
}

const LayoutInner: FC<Props> = ({ catalogBtnRef, children }) => {
    const { menuIsOpen, getDynamicInfo, isAuthValid } = useMainStore((state) => state);

    useEffect(() => {
        if (isAuthValid) {
            getDynamicInfo();
        }
    }, [getDynamicInfo, isAuthValid]);

    return (
        <Styled.LayoutInner>
            <>
                {children}
                {menuIsOpen && <Catalog catalogBtnRef={catalogBtnRef} />}
            </>
        </Styled.LayoutInner>
    );
};

export default LayoutInner;
