import { useCallback, useEffect, useState, type FC } from "react";
import { Trans, useTranslation } from "next-i18next/pages";
import Tabs from "@/components/common/Tabs/tabs";
import { ScanTab } from "./scanTab";
import { CopyTab } from "./copyTab";
import { CryptocurrencyEnum } from "@/services/models/cryptocurrencyEnum";
import Input from "@/components/common/Input";
import { Grid } from "@/components/grid/grid.styles";
import { Styled } from "./tab.styles";
import Tooltip from "@/components/common/Tooltip";
import Icon from "@/components/common/Icon";
import Button from "@/components/common/Button";
import Spinner from "@/components/common/Spinner";
import { IPaymentMethod } from "@/services/models/order/paymentMethod";
import { usePaymentStore } from "./stores/paymentStoreProvider";
import { useAppNotificationStore } from "@/components/common/Notification/stores/appNotificationStoreProvider";

const NeedUserAddressList = [
    CryptocurrencyEnum.TRX,
    CryptocurrencyEnum.USDT_TRC20,
    CryptocurrencyEnum.POL,
    CryptocurrencyEnum.ETH,
    CryptocurrencyEnum.USDT_ERC20,
    CryptocurrencyEnum.USDC_ERC20,
    CryptocurrencyEnum.BNB,
];

export interface IPaymentInfoControlProps {
    paymentMethod: IPaymentMethod;
    orderId: number;
}

export const PaymentInfoControl: FC<IPaymentInfoControlProps> = (props) => {
    const { orderId } = props;
    const { t } = useTranslation(["payment", "common"]);
    const [showUserAddress, setShowUserAddress] = useState(false);
    const [address, setAddress] = useState("");
    const [isAddressError, setIsAddressError] = useState(false);
    const [addressErrorTxt, setAddressErrorTxt] = useState("");
    const { addNotification } = useAppNotificationStore((state) => state);
    const { paymentMethod, setPaymentDetails, setPaymentDetailsInProgress, error, updUserAddress } = usePaymentStore(
        (state) => state
    );

    useEffect(() => {
        if (error) {
            addNotification(t("errors.common", { ns: "common" }), "error");
        }
    }, [addNotification, error, t]);

    useEffect(() => {
        if (!paymentMethod) {
            return;
        }

        if (NeedUserAddressList.some((el) => el === paymentMethod.cryptocurrency)) {
            setShowUserAddress(true);
            setAddress(paymentMethod.userAddress ?? "");
        } else {
            setShowUserAddress(false);
        }
    }, [paymentMethod]);

    const onAddressFocus = () => {
        setIsAddressError(false);
    };

    const validateAddress = useCallback(
        (value: string): boolean => {
            if (value.trim().length === 0 || value.trim().length < 32) {
                setAddressErrorTxt(t("walletError.incorrect"));
                return true;
            }

            return false;
        },
        [t]
    );

    const handleSubmit = useCallback(() => {
        if (!paymentMethod) {
            return;
        }

        const hasError = validateAddress(address);
        setIsAddressError(hasError);

        if (!hasError) {
            setPaymentDetails(paymentMethod.paymentMethodId, orderId, address).then((res) => {
                if (res) {
                    updUserAddress(paymentMethod.paymentMethodId, address);
                } else {
                    setIsAddressError(true);
                    setAddressErrorTxt(t("walletError.incorrect"));
                }
            });
        }
    }, [paymentMethod, validateAddress, address, setPaymentDetails, orderId, updUserAddress, t]);

    if (!paymentMethod) {
        return null;
    }

    const tabs = [
        {
            label: t("scanTabTitle"),
            content: <ScanTab paymentMethod={paymentMethod} />,
        },
        { label: t("copyTabTitle"), content: <CopyTab paymentMethod={paymentMethod} /> },
    ];

    return (
        <>
            {setPaymentDetailsInProgress && <Spinner full={true} />}
            {showUserAddress && !paymentMethod.userAddress && (
                <div className="my-8">
                    <Grid.Column>
                        <Grid.Row>
                            <Grid.Column>
                                <Styled.CopyTabAmountTitle className="tsHeadline600Large">
                                    {t("chooseWayToPay")}
                                </Styled.CopyTabAmountTitle>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Styled.CopyTabAmountTitle className="tsBody600Medium">
                                    {t("enterAddress")}
                                </Styled.CopyTabAmountTitle>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Tooltip
                                    content={
                                        <Trans i18nKey="addressTooltip" ns="payment" components={{ br: <br /> }} />
                                    }
                                    position="top"
                                    trigger="hover"
                                    minWidth={664}
                                    maxWidth={264}
                                >
                                    <Styled.PopupContent>
                                        <Styled.PopupContentTitle className="tsHeadlinePromo400Small">
                                            {t("askingAddress")}
                                        </Styled.PopupContentTitle>
                                        <Styled.Popup>
                                            <Icon size={20} viewBox="0 0 16 16" icon="info" />
                                        </Styled.Popup>
                                    </Styled.PopupContent>
                                </Tooltip>
                            </Grid.Column>
                        </Grid.Row>
                        <Styled.AddressControls>
                            <Input
                                label={t("addressLabel")}
                                name="address"
                                type="text"
                                inputValue={address}
                                onChange={setAddress}
                                autoFocus
                                isError={isAddressError}
                                errorText={addressErrorTxt}
                                onFocus={onAddressFocus}
                                maxLength={42}
                                containerClassName={"w-full"}
                            />
                            <Button fill={false} className="[&&]:mt-7" onClick={handleSubmit}>
                                <span className="tsHeadline300XSmall">{t("addressBtn")}</span>
                            </Button>
                        </Styled.AddressControls>
                    </Grid.Column>
                </div>
            )}
            {(!showUserAddress || paymentMethod.userAddress) && <Tabs tabs={tabs} classNames="w-1/2" />}
        </>
    );
};
