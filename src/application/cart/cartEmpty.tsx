import { type FC } from "react";
import { useTranslation } from "next-i18next/pages";
import { Styled } from "./cartIndex.styles";

export const CartEmpty: FC = () => {
    const { t } = useTranslation(["cart"]);

    return (
        <Styled.EmptyCart>
            <Styled.EmptyCartHdrContainer>
                <Styled.EmptyCartHdrTitle className="tsHeadline600Large">{t("emptyCart")}</Styled.EmptyCartHdrTitle>
            </Styled.EmptyCartHdrContainer>
            <Styled.EmptyCartTextContainer>
                <span className="tsBody400Small">{t("emptyCartTitle")}</span>
            </Styled.EmptyCartTextContainer>
        </Styled.EmptyCart>
    );
};
