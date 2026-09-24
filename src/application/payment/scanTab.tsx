import { type FC } from "react";
import { useTranslation } from "next-i18next/pages";
import { QRCodeSVG } from "qrcode.react";
import { Styled } from "./tab.styles";
import Button from "@/components/common/Button";
import Tabs from "@/components/common/Tabs/tabs";
import { IPaymentMethod } from "@/services/models/order/paymentMethod";

export const ScanTab: FC<{ paymentMethod: IPaymentMethod }> = ({ paymentMethod }) => {
    const { t } = useTranslation(["payment"]);

    const openInWallet = () => {
        if (typeof window !== "undefined") {
            const url = `${paymentMethod.lightning ? "lightning:" : ""}${paymentMethod.paymentUrl}`;
            const newWindow = window.open(url, "_blank", "noopener,noreferrer");
            if (newWindow) newWindow.opener = null;
        }
    };

    const qrCode = !paymentMethod.lightning ? (
        <QRCodeSVG value={paymentMethod.paymentUrl} size={240} />
    ) : (
        <Tabs
            tabs={[
                {
                    label: t("lightningInvoice"),
                    content: <QRCodeSVG value={paymentMethod.paymentUrl} size={240} />,
                },
                { label: t("lightningNodeInfo"), content: <QRCodeSVG value={paymentMethod.nodeId!} size={240} /> },
            ]}
            classNames="w-1/2"
        />
    );

    return (
        <Styled.Tab>
            <Styled.Container>
                <Styled.Box>
                    <Styled.Div>
                        <Styled.DivContainer>
                            <Styled.QrContainer>
                                <Styled.Box>{qrCode}</Styled.Box>
                            </Styled.QrContainer>
                            <Styled.ItemContainer>
                                <Styled.Box>
                                    <div>
                                        <Button size="small" onClick={openInWallet}>
                                            <Styled.WalletBtnTitleContainer>
                                                <Styled.WalletBtnTitle className="tsHeadline300XSmall">
                                                    {t("walletBtnTitle")}
                                                </Styled.WalletBtnTitle>
                                            </Styled.WalletBtnTitleContainer>
                                            <Styled.WalletBtnBackground />
                                        </Button>
                                    </div>
                                </Styled.Box>
                            </Styled.ItemContainer>
                            <Styled.ItemContainer>{`${t("recommendedFee")}: ${paymentMethod.recommendedFee} sat/byte`}</Styled.ItemContainer>
                        </Styled.DivContainer>
                    </Styled.Div>
                </Styled.Box>
            </Styled.Container>
        </Styled.Tab>
    );
};
