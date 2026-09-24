import { useCallback, useMemo, useState, type FC } from "react";
import { useTranslation } from "next-i18next/pages";
import { Styled } from "../../../components/layout/Layout/NonAuth/nonAuthPageLayout.styles";
import Spinner from "@/components/common/Spinner";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useAppNotificationStore } from "@/components/common/Notification/stores/appNotificationStoreProvider";
import { LogoControl } from "@/components/layout/Layout/NonAuth/logoControl";
import { RegExps } from "@/application/constants";
import { postData } from "@/utils/api/apiAxious";
import { IResetPasswordRequest } from "@/services/models/registration/resetPasswordRequest";
import { IForgotPasswordNextPageProps } from "@/pages/registration/reset-password/[slug]";
import { ConfirmEmailStatusEnum } from "@/services/models/registration/confirmEmailStatusEnum";

export const ResetPasswordIndex: FC<IForgotPasswordNextPageProps> = (props) => {
    const { t } = useTranslation(["registration", "common"]);
    const { isMobile } = props;
    const { addNotification } = useAppNotificationStore((state) => state);

    const [requestInProgress, setRequestInProgress] = useState(false);
    const [requestResult, setRequestResult] = useState<ConfirmEmailStatusEnum | null>(null);

    const [password, setPassword] = useState("");
    const [isPasswordError, setIsPasswordError] = useState(false);
    const [passwordErrorTxt, setPasswordErrorTxt] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");
    const [isConfirmPasswordError, setIsConfirmPasswordError] = useState(false);
    const [confirmPasswordErrorTxt, setConfirmPasswordErrorTxt] = useState("");

    const validateConfirmPassword = useCallback(
        (value: string): boolean => {
            if (value.length === 0) {
                setConfirmPasswordErrorTxt(t("confirmPasswordError.empty"));
                return true;
            }
            if (value !== password) {
                setConfirmPasswordErrorTxt(t("confirmPasswordError.diff"));
                return true;
            }

            return false;
        },
        [password, t]
    );

    const validatePassword = useCallback(
        (value: string): boolean => {
            if (value.length === 0) {
                setPasswordErrorTxt(t("passwordError.empty"));
                return true;
            }
            if (value.length < 8) {
                setPasswordErrorTxt(t("passwordError.short"));
                return true;
            }
            if (!RegExps.HasUppercase.test(value)) {
                setPasswordErrorTxt(t("passwordError.capital"));
                return true;
            }
            if (!RegExps.HasDigit.test(value)) {
                setPasswordErrorTxt(t("passwordError.num"));
                return true;
            }

            return false;
        },
        [t]
    );

    const validateForm = useCallback(() => {
        const passHasError = validatePassword(password);
        setIsPasswordError(passHasError);

        const confPassHasError = validateConfirmPassword(confirmPassword);
        setIsConfirmPasswordError(confPassHasError);

        const formIsValid = !passHasError && !confPassHasError;

        return formIsValid;
    }, [validatePassword, password, validateConfirmPassword, confirmPassword]);

    const onPasswordChange = (value: string) => {
        setPassword(value);
        const passHasError = validatePassword(value);
        setIsPasswordError(passHasError);
    };

    const onPasswordFocus = () => {};

    const onConfirmPasswordFocus = () => {
        setIsConfirmPasswordError(false);
    };

    const handleSubmit = () => {
        const sendRequest = async (request: IResetPasswordRequest) => {
            return await postData<ConfirmEmailStatusEnum>("/registration/reset-password", request);
        };

        if (validateForm()) {
            const request = {
                token: props.token,
                password: password,
                confirmPassword: confirmPassword,
            } as IResetPasswordRequest;

            setRequestInProgress(true);
            try {
                sendRequest(request)
                    .then((resp) => {
                        setRequestResult(resp);
                    })
                    .finally(() => {
                        setRequestInProgress(false);
                    });
            } catch (error: unknown) {
                console.log(error);
                setRequestInProgress(false);
                addNotification(t("errors.common", { ns: "common" }), "error");
            }
        }
    };

    const resultMessage = useMemo(() => {
        if (!requestResult) {
            return null;
        }

        switch (requestResult) {
            case ConfirmEmailStatusEnum.Success:
                return t("resetPassResult.Success");
            case ConfirmEmailStatusEnum.InvalidToken:
                return t("resetPassResult.InvalidToken");
            case ConfirmEmailStatusEnum.ExpiredToken:
                return t("resetPassResult.ExpiredToken");
            case ConfirmEmailStatusEnum.UsedToken:
                return t("resetPassResult.UsedToken");

            default:
                return null;
        }
    }, [requestResult, t]);

    return (
        <>
            {requestInProgress && <Spinner full />}
            <Styled.FormBox $isMobile={isMobile}>
                <LogoControl />
                {requestResult ? (
                    <Styled.MessageBox>
                        <div>
                            <div>{resultMessage}</div>
                            <Styled.LogInAction href="/login">{t("signIn")}</Styled.LogInAction>
                        </div>
                    </Styled.MessageBox>
                ) : (
                    <form>
                        <div>
                            <div>
                                <Styled.SectionContent>
                                    <Styled.Box>
                                        <Styled.HdrContainer>
                                            <Styled.HdrTitle className="tsHeadline500Medium">
                                                {t("resetPassword")}
                                            </Styled.HdrTitle>
                                        </Styled.HdrContainer>
                                        <Styled.TitleContainer>
                                            <span>{t("resetPasswordTitle")}</span>
                                        </Styled.TitleContainer>
                                        <Styled.InputContainer>
                                            <div>
                                                <Input
                                                    label={t("passwordLabel")}
                                                    name="password"
                                                    type="password"
                                                    inputValue={password}
                                                    onChange={onPasswordChange}
                                                    isError={isPasswordError}
                                                    errorText={passwordErrorTxt}
                                                    onFocus={onPasswordFocus}
                                                    maxLength={32}
                                                    autoComplete="off"
                                                />
                                            </div>
                                        </Styled.InputContainer>
                                        <Styled.InputContainer>
                                            <div>
                                                <Input
                                                    label={t("confirmPasswordLabel")}
                                                    name="confirmPassword"
                                                    type="password"
                                                    inputValue={confirmPassword}
                                                    onChange={setConfirmPassword}
                                                    isError={isConfirmPasswordError}
                                                    errorText={confirmPasswordErrorTxt}
                                                    onFocus={onConfirmPasswordFocus}
                                                    maxLength={32}
                                                    autoComplete="off"
                                                />
                                            </div>
                                        </Styled.InputContainer>
                                        <div>
                                            <Button type="button" onClick={handleSubmit}>
                                                <Styled.SubmitBtnTitleContainer>
                                                    <Styled.SubmitBtnTitle className="tsBodyControl500Medium">
                                                        {t("send")}
                                                    </Styled.SubmitBtnTitle>
                                                </Styled.SubmitBtnTitleContainer>
                                                <Styled.SubmitBtnBg />
                                            </Button>
                                        </div>
                                    </Styled.Box>
                                </Styled.SectionContent>
                            </div>
                        </div>
                    </form>
                )}
            </Styled.FormBox>
            <Styled.CornerFunctionsContainer $isMobile={isMobile}>
                <Styled.CornerFunctionsRow>
                    <div>
                        <span>{t("alreadyHave")}</span>
                    </div>
                    <Styled.LogInActionContainer>
                        <Styled.LogInAction href="/login">{t("signIn")}</Styled.LogInAction>
                    </Styled.LogInActionContainer>
                </Styled.CornerFunctionsRow>
                <Styled.CornerFunctionsRow>
                    <div>
                        <span>{t("dontHaveAccount")}</span>
                    </div>
                    <Styled.LogInActionContainer>
                        <Styled.LogInAction href="/registration">{t("signUp")}</Styled.LogInAction>
                    </Styled.LogInActionContainer>
                </Styled.CornerFunctionsRow>
            </Styled.CornerFunctionsContainer>
        </>
    );
};
