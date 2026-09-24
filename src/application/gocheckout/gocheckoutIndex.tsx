import { useEffect, type FC } from "react";
import { useTranslation } from "next-i18next/pages";
import { useRouter } from "next/router";
import { Styled } from "./gocheckout.styles";
import { Grid } from "@/components/grid/grid.styles";
import Link from "next/link";
import { PaymentInfo } from "./paymentInfo";
import Icon from "@/components/common/Icon";
import { GocheckoutItem } from "./item";
import { CartOrder } from "../cart/order/cartOrder";
import Spinner from "@/components/common/Spinner";
import { useGocheckoutStore } from "./stores/gocheckoutStoreProvider";
import { useAppNotificationStore } from "@/components/common/Notification/stores/appNotificationStoreProvider";
import { getPluralizedItemWord } from "@/utils";
import { CreateOrderStatusEnum } from "@/services/models/order/createOrderStatusEnum";
import { useMainStore } from "@/contexts/mainStoreProvider";

export const GocheckoutIndex: FC = () => {
    const router = useRouter();
    const { t, i18n } = useTranslation(["cart", "common"]);
    const { isMobile } = useMainStore((state) => state);
    const { addNotification } = useAppNotificationStore((state) => state);
    const { createOrder, createInvoiceInProgress, cartData, error } = useGocheckoutStore((state) => state);

    const onPaymenClick = () => {
        createOrder().then((result) => {
            if (result.status === CreateOrderStatusEnum.Success && result.orderId) {
                router.push(`/payment?order=${result.orderId}`);
            } else {
                if (
                    result.status === CreateOrderStatusEnum.InternalError ||
                    result.status === CreateOrderStatusEnum.OutdatedData
                ) {
                    addNotification(t("errors.common", { ns: "common" }), "error");
                }
            }
        });
    };

    useEffect(() => {
        if (error) {
            addNotification(error, "error");
        }
    }, [addNotification, error]);

    return (
        <Styled.PageLayout>
            {createInvoiceInProgress && <Spinner />}
            <Grid.ContainerColumn $isMobile={isMobile}>
                <Grid.Row>
                    <Styled.SeparatorColumn $isMobile={isMobile}>
                        <Grid.Separator $height={1} />
                    </Styled.SeparatorColumn>
                    <Grid.Column>
                        <div>
                            <Link
                                href={"/cart"}
                                className="cursor-pointer inline-block text-[14px] leading-[18px] relative"
                            >
                                {t("backToCart")}
                            </Link>
                        </div>
                        <Styled.PageHeaderContainer>
                            <h1 className="tsHeadline700XLarge">{t("checkout")}</h1>
                        </Styled.PageHeaderContainer>
                        <Grid.Separator $height={16} />
                    </Grid.Column>
                    <Styled.SeparatorColumn $isMobile={isMobile}>
                        <Grid.Separator $height={1} />
                    </Styled.SeparatorColumn>
                </Grid.Row>
                <Grid.Row>
                    <Styled.SeparatorColumn $isMobile={isMobile}>
                        <Grid.Separator $height={1} />
                    </Styled.SeparatorColumn>
                    <Grid.Column>
                        <Grid.Row>
                            <Styled.PaymentInfoColumn $isMobile={isMobile}>
                                <PaymentInfo />
                                <Grid.Separator $height={24} />
                                <Styled.DeliverySection>
                                    <Styled.DeliverySectionTitleContainer>
                                        <span className="tsBodyControl400Small">{t("receiptProduct")}</span>
                                    </Styled.DeliverySectionTitleContainer>
                                </Styled.DeliverySection>
                                <Styled.DeliveryMethodSection>
                                    <Styled.DeliveryMethodHdrContainer>
                                        <Styled.DeliveryMethodHdrWrapper>
                                            <span className="tsHeadline500Medium">{t("methodReceipt")}</span>
                                        </Styled.DeliveryMethodHdrWrapper>
                                    </Styled.DeliveryMethodHdrContainer>
                                    <div>
                                        <Styled.DeliveryMethodTitle>
                                            <Styled.DeliveryMethodIcon>
                                                <Styled.DeliveryMethodIconWrapper>
                                                    <Styled.DeliveryMethodIconBox className="tsBodyControl500Medium">
                                                        <Icon icon="info" size={24} viewBox="0 0 24 24" />
                                                    </Styled.DeliveryMethodIconBox>
                                                </Styled.DeliveryMethodIconWrapper>
                                            </Styled.DeliveryMethodIcon>
                                            <Styled.DeliveryMethodTitleText className="tsBody400Small">
                                                {t("methodReceiptTitle1")}
                                                <br />
                                                {t("methodReceiptTitle2")}
                                                <br />
                                                <br />
                                                {t("methodReceiptTitle3")}
                                            </Styled.DeliveryMethodTitleText>
                                        </Styled.DeliveryMethodTitle>
                                    </div>
                                </Styled.DeliveryMethodSection>
                                <Grid.Separator $height={24} />
                                <Styled.Items>
                                    <Styled.ItemsHeader>
                                        <Styled.ItemsHeaderTitle>
                                            <Styled.ItemsHeaderTitleBox>
                                                <Styled.ItemsHeaderTitleWrapper>
                                                    <span className="tsHeadline500Medium">{t("productsInOrder")}</span>
                                                </Styled.ItemsHeaderTitleWrapper>
                                            </Styled.ItemsHeaderTitleBox>
                                        </Styled.ItemsHeaderTitle>
                                        <Styled.ItemsHeaderTotal>
                                            <span>{`${cartData.totalQuantity} ${getPluralizedItemWord(cartData.totalQuantity, i18n.language)}`}</span>
                                        </Styled.ItemsHeaderTotal>
                                    </Styled.ItemsHeader>
                                    <Styled.ItemsList>
                                        <Styled.ItemsListContainer>
                                            <Styled.ItemsListWrapper>
                                                {cartData.items &&
                                                    cartData.items.map((item, i) => (
                                                        <GocheckoutItem key={i} item={item} />
                                                    ))}
                                            </Styled.ItemsListWrapper>
                                        </Styled.ItemsListContainer>
                                    </Styled.ItemsList>
                                </Styled.Items>
                            </Styled.PaymentInfoColumn>
                            <Styled.SummaryColumn $isMobile={isMobile}>
                                <CartOrder isOrder cartData={cartData} onBtnClick={onPaymenClick} />
                            </Styled.SummaryColumn>
                        </Grid.Row>
                    </Grid.Column>
                    <Styled.SeparatorColumn $isMobile={isMobile}>
                        <Grid.Separator $height={1} />
                    </Styled.SeparatorColumn>
                </Grid.Row>
            </Grid.ContainerColumn>
        </Styled.PageLayout>
    );
};
