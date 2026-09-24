import { type FC } from "react";
import { useTranslation } from "next-i18next/pages";
import { Styled } from "./gocheckout.styles";
import Icon from "@/components/common/Icon";

export const PaymentInfo: FC = () => {
    const { t } = useTranslation(["cart"]);

    return (
        <Styled.PaymentInfoContainer>
            <Styled.PaymentInfoWrapper>
                <Styled.PaymentInfoHeader>
                    <div>
                        <Styled.PaymentInfoHeaderWrapper>
                            <span className="tsHeadline500Medium">{t("paymentMethod")}</span>
                        </Styled.PaymentInfoHeaderWrapper>
                    </div>
                </Styled.PaymentInfoHeader>
                <Styled.PaymentInfoMethods>
                    <Styled.PaymentInfoMethodsContainer>
                        <Styled.PaymentInfoMethodsWrapper>
                            <Styled.PaymentInfoMethodsBox>
                                <Styled.PaymentInfoMethodsItemContainer>
                                    <Styled.PaymentInfoMethodsItem>
                                        <Styled.PaymentInfoMethodsItemInner>
                                            <Styled.PaymentMethodIconContainer>
                                                <Styled.PaymentMethodIconWrapper>
                                                    <Icon icon="coin" size={24} viewBox="0 0 24 24" />
                                                </Styled.PaymentMethodIconWrapper>
                                            </Styled.PaymentMethodIconContainer>
                                            <Styled.PaymentMethodTitleContainer>
                                                <div>
                                                    <Styled.PaymentMethodTitleWrapper>
                                                        <span className="tsBody300XSmall">{t("cryptocurrency")}</span>
                                                    </Styled.PaymentMethodTitleWrapper>
                                                </div>
                                            </Styled.PaymentMethodTitleContainer>
                                        </Styled.PaymentInfoMethodsItemInner>
                                    </Styled.PaymentInfoMethodsItem>
                                </Styled.PaymentInfoMethodsItemContainer>
                            </Styled.PaymentInfoMethodsBox>
                        </Styled.PaymentInfoMethodsWrapper>
                    </Styled.PaymentInfoMethodsContainer>
                </Styled.PaymentInfoMethods>
            </Styled.PaymentInfoWrapper>
        </Styled.PaymentInfoContainer>
    );
};
