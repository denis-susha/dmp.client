import { type FC } from "react";
import { useTranslation } from "next-i18next/pages";
import { Styled } from "./orderItems.styles";
import { ProductItem } from "./productItem";
import { PaymentStatusEnum } from "@/services/models/paymentStatusEnum";
import Button from "@/components/common/Button";
import { useOrderDetailsStore } from "./stores/orderDetailsStoreProvider";
import { useRouter } from "next/router";

const Title = ({ children }: React.PropsWithChildren) => {
    return (
        <Styled.HeaderStatusWrapper>
            <Styled.HeaderStatusTitle>{children}</Styled.HeaderStatusTitle>
        </Styled.HeaderStatusWrapper>
    );
};

export const OrderItems: FC = () => {
    const { order } = useOrderDetailsStore((state) => state);
    const router = useRouter();

    const { t } = useTranslation(["order"]);

    if (!order) {
        return null;
    }

    const onGoToPaymentClick = () => {
        router.push(`/payment?order=${order.orderId}`);
    };

    return (
        <div>
            <Styled.Container>
                <Styled.RelativeContainer>
                    <Styled.RelativeContainer>
                        <Title>
                            <span className="tsHeadline550Medium">{t(`paymentStatus.${order.status}`)}</span>
                        </Title>
                    </Styled.RelativeContainer>
                    {order.status === PaymentStatusEnum.Expired && (
                        <Styled.HeaderStatusDetailsContainer>
                            <Title>
                                <span className="tsBody500Medium">{t("paymentExpired")}</span>
                            </Title>
                        </Styled.HeaderStatusDetailsContainer>
                    )}
                    {order.status === PaymentStatusEnum.Complete && (
                        <Styled.HeaderStatusCompleteDetailsContainer>
                            <Button size="small" fill={false} style="outlined">
                                <div className="tsBodyControl400Small">{t("contactSeller")}</div>
                            </Button>
                            <Button size="small" fill={false} style="outlined">
                                <div className="tsBodyControl400Small">{t("rateProduct")}</div>
                            </Button>
                        </Styled.HeaderStatusCompleteDetailsContainer>
                    )}
                    {order.status === PaymentStatusEnum.InProgress && (
                        <Styled.HeaderAction>
                            <Button size="small" onClick={onGoToPaymentClick} fill={false}>
                                <div>{t("goToPayment")}</div>
                            </Button>
                        </Styled.HeaderAction>
                    )}
                </Styled.RelativeContainer>
                <Styled.ItemsContainer>
                    {order?.lines.map((line, i) => (
                        <Styled.RelativeContainer key={i}>
                            <ProductItem item={line} />
                        </Styled.RelativeContainer>
                    ))}
                </Styled.ItemsContainer>
            </Styled.Container>
        </div>
    );
};
