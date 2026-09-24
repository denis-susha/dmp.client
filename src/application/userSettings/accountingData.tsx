import { type FC } from "react";
import { useTranslation } from "next-i18next/pages";
import { Styled } from "./userSettings.styles";
import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";
import { useUserSettingsStore } from "./stores/userSettingsStoreProvider";

export const AccountingData: FC = () => {
    const { t } = useTranslation(["settings", "common"]);
    const { email } = useUserSettingsStore((state) => state);

    return (
        <Styled.SettingsBox>
            <Styled.SettingsHeader className="tsHeadline500Medium">{t("accountingData")}</Styled.SettingsHeader>
            <Styled.SettingsHeaderTitle>{t("accountingDataTitle")}</Styled.SettingsHeaderTitle>
            <Styled.SettingsList>
                <Styled.SettingsListItem>
                    <Styled.SettingsListItemBox>
                        <Styled.SettingsListItemBoxTitle>{t("email")}</Styled.SettingsListItemBoxTitle>
                        <Styled.SettingsListItemValue>
                            <span>{email}</span>
                            <Styled.ConfirmedEmail>
                                <Icon icon="checkmark" size={16} viewBox="0 0 24 24" />
                            </Styled.ConfirmedEmail>
                        </Styled.SettingsListItemValue>
                        <Styled.ChangeBtnBox>
                            <Button style="simple" disabled>
                                <div className="tsBodyControl400Small">{t("change", { ns: "common" })}</div>
                            </Button>
                        </Styled.ChangeBtnBox>
                    </Styled.SettingsListItemBox>
                </Styled.SettingsListItem>
            </Styled.SettingsList>
        </Styled.SettingsBox>
    );
};
