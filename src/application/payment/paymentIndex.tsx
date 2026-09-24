import { useEffect, useMemo, useState, type FC } from "react";
import { useTranslation } from "next-i18next/pages";
import ShrinkingTimeline from "@/components/common/ShrinkingTimeline";
import { Grid } from "@/components/grid/grid.styles";
import { Styled } from "./paymentIndex.styles";
import { DropdownList } from "@/components/common/DropdownList";
import { appConfig } from "@/appConfig";
import SignalRService from "@/services/signalRService";
import { IWsPaymentUpdateMessage } from "@/services/models/order/wsPaymentUpdateMessage";
import { CurrencyEnum } from "@/services/models/currencyEnum";
import { cryptocurrencyFormat, formatCurrency } from "@/utils";
import { PaymentStatusEnum } from "@/services/models/paymentStatusEnum";
import { CryptocurrencyEnum } from "@/services/models/cryptocurrencyEnum";
import { PaymentInfoControl } from "./paymentInfoControl";
import { usePaymentStore } from "./stores/paymentStoreProvider";
import { useAppNotificationStore } from "@/components/common/Notification/stores/appNotificationStoreProvider";
import Image from "next/image";
import { useMainStore } from "@/contexts/mainStoreProvider";

const optionSeparator = "@";

export const PaymantIndex: FC = () => {
    const { isMobile } = useMainStore((state) => state);
    const { addNotification } = useAppNotificationStore((state) => state);
    const { payment, paymentMethod, setSelectedPaymentMethod } = usePaymentStore((state) => state);
    const { t, i18n } = useTranslation(["payment"]);

    const [sentAmount, setSentAmount] = useState<number>(payment.sentAmount ?? 0);
    const [paymentStatus, setPaymentStatus] = useState<PaymentStatusEnum>(payment.status as PaymentStatusEnum);
    const [selectedOptionKey, setSelectedOptionKey] = useState<string>(
        CryptocurrencyEnum.BTC + optionSeparator + "false"
    );

    useEffect(() => {
        const selectedOptionKeyArray = selectedOptionKey.split(optionSeparator);

        const paymentMethod = payment.paymentMethods.find(
            (pm) =>
                pm.cryptocurrency === selectedOptionKeyArray[0] &&
                pm.lightning === (selectedOptionKeyArray[1]! === "true")
        )!;

        setSelectedPaymentMethod(paymentMethod);
    }, [setSelectedPaymentMethod, selectedOptionKey, payment.paymentMethods]);

    const options = useMemo(() => {
        const optionsTmp = payment.paymentMethods.map((item) => ({
            value: item.cryptocurrency + optionSeparator + item.lightning,
            label:
                t("paymentMethodLabel." + item.cryptocurrency) +
                (item.lightning ? t("paymentMethodLabel.Lightning") : ""),
            selected: item.cryptocurrency + optionSeparator + item.lightning === selectedOptionKey,
        }))!;

        return optionsTmp;
    }, [payment?.paymentMethods, selectedOptionKey, t]);

    useEffect(() => {
        const hubUrl = `${appConfig.apiHost}/paymenthub`;

        const signalRService = SignalRService.getInstance(hubUrl);
        signalRService.startConnection();

        signalRService.on("ReceiveMessage", (message: string) => {
            console.log("ReceiveMessage: ", message);
            const msg: IWsPaymentUpdateMessage = JSON.parse(message);

            setPaymentStatus(msg.paymentStatus);
            setSentAmount(msg.sentAmount);
        });

        return () => {
            signalRService.stopConnection();
            signalRService.off("ReceiveMessage");
        };
    }, []);

    useEffect(() => {
        switch (paymentStatus) {
            case PaymentStatusEnum.PaidPartial:
                addNotification(t("paidPartialNotification"), "info");
                break;

            case PaymentStatusEnum.PaidError:
            case PaymentStatusEnum.Complete:
            case PaymentStatusEnum.Expired:
                window.location.assign(`/my/orderdetails?order=${payment.orderId}`);
                break;

            default:
                break;
        }
    }, [paymentStatus, addNotification, t, payment.orderId]);

    const [showMore, setShowMore] = useState(false);

    if (!payment || !paymentMethod) {
        return null;
    }

    const startTimelineValue = new Date(payment.createdAt!).getTime();

    const timesUp = () => {
        setTimeout(() => {
            window.location.reload();
        }, 3000);
    };

    const handleSelect = (value: string) => {
        setSelectedOptionKey(value);
    };

    return (
        <Styled.PageLayout>
            <Grid.ContainerColumn $isMobile={isMobile}>
                <Grid.Row>
                    <Styled.SeparatorColumn>
                        <Grid.Separator $height={1} />
                    </Styled.SeparatorColumn>
                    <Grid.Column>
                        <Styled.PageHeaderContainer>
                            <h1 className="tsHeadline700XLarge">{t("pageHeader", { orderId: payment?.orderId })}</h1>
                        </Styled.PageHeaderContainer>
                        <Grid.Separator $height={16} />
                    </Grid.Column>
                    <Styled.SeparatorColumn>
                        <Grid.Separator $height={1} />
                    </Styled.SeparatorColumn>
                </Grid.Row>
                <Grid.Row>
                    <Styled.SeparatorColumn>
                        <Grid.Separator $height={1} />
                    </Styled.SeparatorColumn>
                    <Grid.Column>
                        <Styled.WrapperRow>
                            <Styled.Container>
                                <div>
                                    <Styled.LogoContainer>
                                        <Image
                                            width={128}
                                            height={35}
                                            loading="lazy"
                                            src={`${appConfig.staticUrl}logo_color.png`}
                                            alt="Filezon Logo"
                                        />
                                    </Styled.LogoContainer>
                                </div>
                                <Styled.TimelineContainer>
                                    <ShrinkingTimeline
                                        onFinish={timesUp}
                                        startTime={startTimelineValue}
                                        expirationMinutes={payment.expiration}
                                        intervalMs={1000}
                                    />
                                </Styled.TimelineContainer>
                                <div>
                                    <Styled.PayWithContainer>
                                        <Styled.PayWithContent>
                                            <div className="tsBody500Medium">{t("payWith")}</div>
                                            <Styled.SearchResultsSortWrapper>
                                                <Styled.SearchResultsSortDiv>
                                                    <DropdownList
                                                        options={options}
                                                        value={selectedOptionKey}
                                                        onSelect={handleSelect}
                                                    />
                                                </Styled.SearchResultsSortDiv>
                                            </Styled.SearchResultsSortWrapper>
                                        </Styled.PayWithContent>
                                    </Styled.PayWithContainer>
                                    <Styled.Hr />
                                    <Styled.CurrencyInfo>
                                        <Styled.PayWithContainer>
                                            <Styled.PayWithContent>
                                                <div></div>
                                                <Styled.Amount className="tsBody500Medium">
                                                    <Styled.AmountValue>
                                                        {cryptocurrencyFormat(
                                                            paymentMethod.amount,
                                                            t("cryptocurrency." + paymentMethod.cryptocurrency),
                                                            paymentMethod?.divisibility
                                                        )}
                                                    </Styled.AmountValue>
                                                    <Styled.AmountValue>
                                                        {`1 ${t("cryptocurrency." + paymentMethod.cryptocurrency)} = ${paymentMethod?.rate} ${payment?.currency}`}
                                                    </Styled.AmountValue>
                                                </Styled.Amount>
                                            </Styled.PayWithContent>
                                        </Styled.PayWithContainer>
                                        <Styled.Hr />
                                        <Styled.ShowMoreBtnContainer>
                                            <Styled.ShowMoreBtn
                                                style="icon"
                                                size="small"
                                                onClick={() => setShowMore(!showMore)}
                                            >
                                                <Styled.ShowMoreBtnIcon
                                                    icon="arrow"
                                                    size={14}
                                                    viewBox="0 0 24 24"
                                                    $isOpen={showMore}
                                                ></Styled.ShowMoreBtnIcon>
                                                <Styled.CartItemGridDescrActionBtnInner />
                                            </Styled.ShowMoreBtn>
                                        </Styled.ShowMoreBtnContainer>
                                        {showMore && (
                                            <>
                                                <div>
                                                    <Styled.PayWithContainer>
                                                        <Styled.PayWithContent>
                                                            <div className="tsBody500Medium">{t("orderAmount")}</div>
                                                            <Styled.Amount className="tsBody500Medium">
                                                                <Styled.AmountValue>
                                                                    {cryptocurrencyFormat(
                                                                        paymentMethod.amount,
                                                                        t(
                                                                            "cryptocurrency." +
                                                                                paymentMethod.cryptocurrency
                                                                        ),
                                                                        paymentMethod?.divisibility
                                                                    )}
                                                                </Styled.AmountValue>
                                                                <Styled.AmountValueSmall className="tsBodyNumeric400Small">
                                                                    {formatCurrency(
                                                                        payment?.price,
                                                                        payment?.currency as CurrencyEnum | undefined,
                                                                        paymentMethod?.divisibility,
                                                                        i18n.language
                                                                    )}
                                                                </Styled.AmountValueSmall>
                                                            </Styled.Amount>
                                                        </Styled.PayWithContent>
                                                    </Styled.PayWithContainer>
                                                    <Styled.PayWithContainer>
                                                        <Styled.PayWithContent>
                                                            <div className="tsBody500Medium">{t("alreadyPaid")}</div>
                                                            <Styled.Amount className="tsBody500Medium">
                                                                <Styled.AmountValue>
                                                                    {cryptocurrencyFormat(
                                                                        sentAmount,
                                                                        payment.paidCryptocurrency
                                                                            ? t(
                                                                                  "cryptocurrency." +
                                                                                      payment.paidCryptocurrency
                                                                              )
                                                                            : t(
                                                                                  "cryptocurrency." +
                                                                                      paymentMethod.cryptocurrency
                                                                              ),
                                                                        paymentMethod?.divisibility
                                                                    )}
                                                                </Styled.AmountValue>
                                                            </Styled.Amount>
                                                        </Styled.PayWithContent>
                                                    </Styled.PayWithContainer>
                                                    <Styled.PayWithContainer>
                                                        <Styled.PayWithContent>
                                                            <div className="tsBody500Medium">{t("due")}</div>
                                                            <Styled.Amount className="tsBody500Medium">
                                                                <Styled.AmountValue>
                                                                    {cryptocurrencyFormat(
                                                                        paymentMethod?.amount - sentAmount,
                                                                        t(
                                                                            "cryptocurrency." +
                                                                                paymentMethod.cryptocurrency
                                                                        ),
                                                                        paymentMethod?.divisibility
                                                                    )}
                                                                </Styled.AmountValue>
                                                            </Styled.Amount>
                                                        </Styled.PayWithContent>
                                                    </Styled.PayWithContainer>
                                                </div>
                                                <Styled.Hr />
                                            </>
                                        )}
                                        <PaymentInfoControl paymentMethod={paymentMethod} orderId={payment.orderId} />
                                    </Styled.CurrencyInfo>
                                </div>
                            </Styled.Container>
                        </Styled.WrapperRow>
                    </Grid.Column>
                    <Styled.SeparatorColumn>
                        <Grid.Separator $height={1} />
                    </Styled.SeparatorColumn>
                </Grid.Row>
            </Grid.ContainerColumn>
        </Styled.PageLayout>
    );
};
