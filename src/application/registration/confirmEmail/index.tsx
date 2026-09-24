import { useMemo, type FC } from "react";
import { Styled } from "../../../components/layout/Layout/NonAuth/nonAuthPageLayout.styles";
import { ConfirmEmailStatusEnum } from "@/services/models/registration/confirmEmailStatusEnum";
import { LogoControl } from "@/components/layout/Layout/NonAuth/logoControl";
import { useTranslation } from "next-i18next/pages";
import { IConfirmEmailNextPageProps } from "@/pages/registration/confirm-email/[slug]";

export const ConfirmEmailIndex: FC<IConfirmEmailNextPageProps> = (props) => {
    const { t } = useTranslation("registration");
    const { confirmEmailResult, isMobile } = props;

    const message = useMemo(() => {
        if (confirmEmailResult) {
            switch (confirmEmailResult) {
                case ConfirmEmailStatusEnum.Success:
                    return t("confirmEmailStatus.Success");
                case ConfirmEmailStatusEnum.InvalidToken:
                    return t("confirmEmailStatus.InvalidToken");
                case ConfirmEmailStatusEnum.ExpiredToken:
                    return t("confirmEmailStatus.ExpiredToken");
                case ConfirmEmailStatusEnum.UsedToken:
                    return t("confirmEmailStatus.UsedToken");
                default:
                    return null;
            }
        }
    }, [confirmEmailResult, t]);

    return (
        <Styled.FormBox $isMobile={isMobile}>
            <LogoControl />
            <Styled.MessageBox>
                <div>
                    <div>{message}</div>
                    {confirmEmailResult === ConfirmEmailStatusEnum.Success ? (
                        <Styled.LogInAction href="/">{t("goToHome")}</Styled.LogInAction>
                    ) : (
                        <Styled.LogInAction href="/registration/resend-confirmation">
                            {t("resendMail")}
                        </Styled.LogInAction>
                    )}
                </div>
            </Styled.MessageBox>
        </Styled.FormBox>
    );
};
