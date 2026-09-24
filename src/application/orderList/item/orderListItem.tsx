import { useRef, type FC } from "react";
import { useTranslation } from "next-i18next/pages";
import { Styled } from "./item.styles";
import { formatCurrency, formatDate } from "@/utils";
import { IGetOrderResponse } from "@/services/models/order/getOrderResponse";
import Link from "next/link";
import Chip from "@/components/common/Chip";
import { Colors } from "@/styles/colors";
import { PaymentStatusEnum } from "@/services/models/paymentStatusEnum";
import Button from "@/components/common/Button";
import { useRouter } from "next/router";

const OrderStatusColor: Record<PaymentStatusEnum, string> = {
    [PaymentStatusEnum.InProgress]: Colors.info,
    [PaymentStatusEnum.Complete]: Colors.success,
    [PaymentStatusEnum.PaidPartial]: Colors.warning,
    [PaymentStatusEnum.Expired]: Colors.darkError,
    [PaymentStatusEnum.Refunded]: Colors.successdark,
    [PaymentStatusEnum.PaidError]: Colors.error,
};

export const OrderListItem: FC<{ order: IGetOrderResponse }> = ({ order }) => {
    const router = useRouter();
    const { t, i18n } = useTranslation(["order"]);
    const itemBodyRef = useRef<HTMLDivElement>(null);

    const amountTitle =
        order.status === PaymentStatusEnum.InProgress || order.status === PaymentStatusEnum.PaidPartial
            ? t("orderNotPaidTitle")
            : order.status === PaymentStatusEnum.Complete
              ? t("orderPaidTitle")
              : "";

    const onGoToPaymentClick = () => {
        router.push(`/payment?order=${order.orderId}`);
    };

    const onGoToOrderDetailsClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (itemBodyRef && event.target && itemBodyRef.current?.contains(event.target as Node)) {
            return;
        }
        router.push(`/my/orderdetails?order=${order.orderId}`);
    };

    return (
        <Styled.Item onClick={onGoToOrderDetailsClick}>
            <Styled.ItemHdr>
                <Styled.ItemHdrWrapper>
                    <Styled.ItemHdrLeft>
                        <Styled.ItemHdrLeftTitle>
                            <span className="tsHeadline500Medium">{`${t("orderDated") + formatDate(order.createdAt, i18n.language, false)}`}</span>
                        </Styled.ItemHdrLeftTitle>
                        <Styled.ItemHdrLeftLink>
                            <Link
                                href={`/my/orderdetails?order=${order.orderId}`}
                            >{`${t("num", { ns: "common" })} ${order.orderId}`}</Link>
                        </Styled.ItemHdrLeftLink>
                    </Styled.ItemHdrLeft>
                    <Styled.ItemHdrRight>
                        <Styled.ItemHdrRightTitle>
                            <Styled.ItemHdrRightTitleValue>{amountTitle}</Styled.ItemHdrRightTitleValue>
                            <span className="tsHeadline500Medium">
                                {formatCurrency(order.amount!, order.currency, undefined, i18n.language)}
                            </span>
                        </Styled.ItemHdrRightTitle>
                    </Styled.ItemHdrRight>
                </Styled.ItemHdrWrapper>
            </Styled.ItemHdr>
            <Styled.ItemBody>
                <Styled.ItemBodyWrapper ref={itemBodyRef}>
                    <Styled.ItemBodyLeft>
                        <Styled.ItemBodyLeftTitle>
                            <Styled.ItemBodyLeftStatus className="tsBody500Medium">
                                {t("status")}
                            </Styled.ItemBodyLeftStatus>
                            <div>
                                <Chip
                                    bgColor={OrderStatusColor[order.status]}
                                    label={t("paymentStatus." + order.status)}
                                />
                            </div>
                        </Styled.ItemBodyLeftTitle>
                    </Styled.ItemBodyLeft>
                    <Styled.ItemBodyRight>
                        {order.status === PaymentStatusEnum.InProgress && (
                            <Button size="small" onClick={onGoToPaymentClick}>
                                <div>{t("goToPayment")}</div>
                            </Button>
                        )}
                    </Styled.ItemBodyRight>
                </Styled.ItemBodyWrapper>
            </Styled.ItemBody>
        </Styled.Item>
    );
};
