import { Fragment, type FC } from "react";
import { useTranslation } from "next-i18next/pages";
import { Grid } from "@/components/grid/grid.styles";
import { Styled } from "./orderDetailsIndex.styles";
import { LinkButton } from "../base/common/LinkButton/linkButton";
import { DownloadItem } from "./downloadItem";
import { OrderItems } from "./orderItems";
import { OrderSummation } from "./orderSummation";
import { formatDate } from "@/utils";
import { Linetem } from "./lineItem";
import { PaymentStatusEnum } from "@/services/models/paymentStatusEnum";
import { useRouter } from "next/router";
import { useOrderDetailsStore } from "./stores/orderDetailsStoreProvider";
import { useMainStore } from "@/contexts/mainStoreProvider";

export const OrderDetailsIndex: FC = () => {
    const router = useRouter();
    const { isMobile } = useMainStore((state) => state);
    const { order } = useOrderDetailsStore((state) => state);

    const { t, i18n } = useTranslation(["order"]);

    const onGoToOrderBtnClick = () => {
        router.push("/my/orderlist");
    };

    if (!order) {
        return null;
    }

    return (
        <Grid.Container $isMobile={isMobile}>
            <Styled.OrderDetailsContainer $isMobile={isMobile}>
                <Styled.OrderContainer>
                    <div>
                        <Styled.MainOrderInfoContainer>
                            <Styled.MainOrderInfoHdrContainer>
                                <LinkButton title={t("toListOrders")} onClick={onGoToOrderBtnClick} />
                                <Grid.Separator $height={12} />
                                <div>
                                    <Styled.InfoHdrWrapper>
                                        <span className="tsHeadline700XLarge">{`${t("orderDated") + formatDate(order.createdAt, i18n.language, false)}`}</span>
                                    </Styled.InfoHdrWrapper>
                                </div>
                            </Styled.MainOrderInfoHdrContainer>
                            {order.status === PaymentStatusEnum.Complete && (
                                <Styled.DeliveryInfoContainer>
                                    <Styled.DeliveryInfoBox>
                                        <Styled.Download>
                                            {order.lines.map((line, idx) => (
                                                <Fragment key={idx}>
                                                    {line.data?.isLine ? (
                                                        <Linetem item={line} />
                                                    ) : (
                                                        <DownloadItem orderId={order.orderId} item={line} />
                                                    )}
                                                    {idx < order.lines.length - 1 && <Styled.Divider />}
                                                </Fragment>
                                            ))}
                                        </Styled.Download>
                                    </Styled.DeliveryInfoBox>
                                </Styled.DeliveryInfoContainer>
                            )}
                        </Styled.MainOrderInfoContainer>
                        <OrderItems />
                    </div>
                </Styled.OrderContainer>
                <div>
                    <OrderSummation />
                </div>
            </Styled.OrderDetailsContainer>
        </Grid.Container>
    );
};
