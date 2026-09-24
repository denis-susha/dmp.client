import { type FC } from "react";
import { useTranslation } from "next-i18next/pages";
import { Styled } from "./tab.styles";
import { IPaymentMethod } from "@/services/models/order/paymentMethod";
import { useAppNotificationStore } from "@/components/common/Notification/stores/appNotificationStoreProvider";
import { cryptocurrencyFormat } from "@/utils";

export const CopyTab: FC<{ paymentMethod: IPaymentMethod }> = ({ paymentMethod }) => {
    const { t } = useTranslation(["payment"]);
    const { addNotification } = useAppNotificationStore((state) => state);

    const handleCopyToClipboard = (value: string) => {
        navigator.clipboard.writeText(value);
        addNotification(t("copied", { ns: "common" }), "success");
    };

    return (
        <Styled.CopyTab>
            <Styled.Container>
                <Styled.Box>
                    <Styled.Div>
                        <Styled.CopyTabDivContainer>
                            <Styled.QrContainer>
                                <div>
                                    <Styled.CopyTabAmountTitle className="tsBody500Medium">
                                        {t("amount")}
                                    </Styled.CopyTabAmountTitle>
                                    <Styled.CopyTabAmountTitle className="tsHeadline550Medium">
                                        {cryptocurrencyFormat(
                                            paymentMethod.amount,
                                            t("cryptocurrency." + paymentMethod.cryptocurrency),
                                            paymentMethod?.divisibility
                                        )}
                                    </Styled.CopyTabAmountTitle>
                                </div>
                            </Styled.QrContainer>
                            <Styled.QrContainer>
                                <Styled.FullContainer>
                                    <Styled.CopyTabAmountTitle className="tsBody500Medium">
                                        {t("address")}
                                    </Styled.CopyTabAmountTitle>
                                    <Styled.FullContainer>
                                        <Styled.ShareActionBtn
                                            onClick={() => handleCopyToClipboard(paymentMethod.paymentAddress)}
                                        >
                                            <Styled.ShareActionBtnIcon
                                                icon="copy-buffer"
                                                size={20}
                                                viewBox="0 0 16 16"
                                            />
                                            <Styled.SearchResultsSortInputWrapper>
                                                <Styled.SearchResultsSortInput
                                                    readOnly
                                                    type="text"
                                                    title={paymentMethod.paymentAddress}
                                                    value={paymentMethod.paymentAddress}
                                                    className="tsBody500Medium"
                                                />
                                            </Styled.SearchResultsSortInputWrapper>
                                        </Styled.ShareActionBtn>
                                    </Styled.FullContainer>
                                </Styled.FullContainer>
                                <Styled.PaymentLinkContainer>
                                    <Styled.CopyTabAmountTitle className="tsBody500Medium">
                                        {t(paymentMethod.lightning ? "nodeInfo" : "paymentLink")}
                                    </Styled.CopyTabAmountTitle>
                                    <Styled.FullContainer>
                                        <Styled.ShareActionBtn
                                            onClick={() =>
                                                handleCopyToClipboard(
                                                    paymentMethod.lightning
                                                        ? paymentMethod.nodeId!
                                                        : paymentMethod.paymentUrl
                                                )
                                            }
                                        >
                                            <Styled.ShareActionBtnIcon
                                                icon="copy-buffer"
                                                size={20}
                                                viewBox="0 0 16 16"
                                            />
                                            <Styled.SearchResultsSortInputWrapper>
                                                <Styled.SearchResultsSortInput
                                                    readOnly
                                                    type="text"
                                                    title={
                                                        paymentMethod.lightning
                                                            ? paymentMethod.nodeId!
                                                            : paymentMethod.paymentUrl
                                                    }
                                                    value={
                                                        paymentMethod.lightning
                                                            ? paymentMethod.nodeId!
                                                            : paymentMethod.paymentUrl
                                                    }
                                                    className="tsBody500Medium"
                                                />
                                            </Styled.SearchResultsSortInputWrapper>
                                        </Styled.ShareActionBtn>
                                    </Styled.FullContainer>
                                </Styled.PaymentLinkContainer>
                            </Styled.QrContainer>
                        </Styled.CopyTabDivContainer>
                    </Styled.Div>
                </Styled.Box>
            </Styled.Container>
        </Styled.CopyTab>
    );
};
