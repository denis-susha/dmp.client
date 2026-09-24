import { type FC } from "react";
import { useTranslation } from "next-i18next/pages";
import { Styled } from "./orderSummation.styles";
import { formatCurrency, getPluralizedItemWord } from "@/utils";
import { useOrderDetailsStore } from "./stores/orderDetailsStoreProvider";
import { useMainStore } from "@/contexts/mainStoreProvider";

export const OrderSummation: FC = () => {
    const { isMobile } = useMainStore((state) => state);
    const { order } = useOrderDetailsStore((state) => state);

    const { t, i18n } = useTranslation(["order"]);
    const yourOrderValue = `${t("num", { ns: "common" })} ${order?.orderId} • ${order?.lines.length} ${getPluralizedItemWord(order.lines.length!, i18n.language)}`;

    if (!order) {
        return null;
    }

    return (
        <Styled.StickyContainer>
            <div>
                <Styled.SummationContainer>
                    <Styled.OrderDoneTotal $isMobile={isMobile}>
                        <Styled.OrderDoneTotalInfoContainer>
                            <Styled.OrderDoneTotalInfoOrderRow>
                                <Styled.OrderDoneTotalTitleContainer>
                                    <div>
                                        <Styled.OrderDoneTotalYourOrderTitle>
                                            <span className="tsHeadline500Medium">{t("yourOrder")}</span>
                                        </Styled.OrderDoneTotalYourOrderTitle>
                                    </div>
                                </Styled.OrderDoneTotalTitleContainer>
                                <Styled.OrderDoneTotalValueContainer>
                                    <Styled.OrderDoneTotalYourOrderValue>
                                        <span className="tsBody400Small">{yourOrderValue}</span>
                                    </Styled.OrderDoneTotalYourOrderValue>
                                </Styled.OrderDoneTotalValueContainer>
                            </Styled.OrderDoneTotalInfoOrderRow>
                        </Styled.OrderDoneTotalInfoContainer>
                        <Styled.OrderDoneTotalAmountContainer>
                            <Styled.OrderDoneTotalAmountTitleWrapper>
                                <Styled.OrderDoneTotalAmountTitleSum>
                                    <Styled.OrderDoneTotalYourOrderTitle>
                                        <span className="tsHeadline500Medium">{t("amount")}</span>
                                    </Styled.OrderDoneTotalYourOrderTitle>
                                </Styled.OrderDoneTotalAmountTitleSum>
                                <Styled.OrderDoneTotalAmountSubtitleSum>
                                    <span className="tsBody400Small">{t("byCryptocurrency")}</span>
                                </Styled.OrderDoneTotalAmountSubtitleSum>
                            </Styled.OrderDoneTotalAmountTitleWrapper>
                            <Styled.OrderDoneTotalValueContainer>
                                <Styled.OrderDoneTotalValue>
                                    <span className="tsHeadline500Medium">
                                        {formatCurrency(order.amount!, order.currency, undefined, i18n.language)}
                                    </span>
                                </Styled.OrderDoneTotalValue>
                            </Styled.OrderDoneTotalValueContainer>
                        </Styled.OrderDoneTotalAmountContainer>
                    </Styled.OrderDoneTotal>
                </Styled.SummationContainer>
            </div>
        </Styled.StickyContainer>
    );
};
