import { FC } from "react";
import { Styled } from "./styles";
import { useTranslation } from "next-i18next/pages";

export const AddToCartComponent: FC<{ onBuyBtnClick: (oneClickBuying: boolean) => void }> = ({ onBuyBtnClick }) => {
    const { t } = useTranslation(["product", "common"]);

    return (
        <Styled.AddToCart>
            <Styled.AddToCartBtnContainer>
                <Styled.AddToCartBtnWrapper>
                    <Styled.AddToCartBtnBox>
                        <Styled.AddToCartBtnBoxContainer>
                            <Styled.AddToCartBtn onClick={() => onBuyBtnClick(false)}>
                                <Styled.AddToCartBtnTitleContainer>
                                    <Styled.AddToCartBtnTitle className="tsBodyControl500Medium">
                                        {t("buyButtonAuthenticatedTitle")}
                                    </Styled.AddToCartBtnTitle>
                                </Styled.AddToCartBtnTitleContainer>
                                <Styled.AddToCartBtnBackground />
                            </Styled.AddToCartBtn>
                        </Styled.AddToCartBtnBoxContainer>
                        <Styled.AddToCartBtnBasementContainer>
                            <Styled.AddToCartBtnBasementWrapper>
                                <Styled.AddToCartBtnBasementTitle>
                                    <span>{t("addToCartBottomTitle")}</span>
                                </Styled.AddToCartBtnBasementTitle>
                            </Styled.AddToCartBtnBasementWrapper>
                        </Styled.AddToCartBtnBasementContainer>
                    </Styled.AddToCartBtnBox>
                </Styled.AddToCartBtnWrapper>
            </Styled.AddToCartBtnContainer>
        </Styled.AddToCart>
    );
};
