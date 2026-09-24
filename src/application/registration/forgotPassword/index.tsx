import { useCallback, useEffect, useState, type FC } from "react";
import { useTranslation } from "next-i18next/pages";
import { Styled } from "../../../components/layout/Layout/NonAuth/nonAuthPageLayout.styles";
import Spinner from "@/components/common/Spinner";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useAppNotificationStore } from "@/components/common/Notification/stores/appNotificationStoreProvider";
import { LogoControl } from "@/components/layout/Layout/NonAuth/logoControl";
import { RegExps } from "@/application/constants";
import { postData } from "@/utils/api/apiAxious";
import { IResendEmailConfirmationRequest } from "@/services/models/registration/resendEmailConfirmationRequest";
import { SendForgotPasswordStatusEnum } from "@/services/models/registration/sendForgotPasswordStatusEnum";
import { AuthPageProps } from "@/pages/login";

export const ForgotPasswordIndex: FC<AuthPageProps> = (props) => {
    const { t } = useTranslation(["registration", "common"]);
    const { isMobile } = props;
    const { addNotification } = useAppNotificationStore((state) => state);

    const [requestInProgress, setRequestInProgress] = useState(false);
    const [requestResult, setRequestResult] = useState<SendForgotPasswordStatusEnum | null>(null);
    const [email, setEmail] = useState("");
    const [isEmailError, setIsEmailError] = useState(false);
    const [emailErrorTxt, setEmailErrorTxt] = useState("");

    const validateEmail = useCallback(
        (value: string): boolean => {
            if (value.trim().length === 0) {
                setEmailErrorTxt(t("emailError.empty"));
                return true;
            }
            if (!RegExps.ValidateEmailFormat.test(value)) {
                setEmailErrorTxt(t("emailError.incorrect"));
                return true;
            }

            if (requestResult) {
                if (requestResult === SendForgotPasswordStatusEnum.InvalidEmail) {
                    setEmailErrorTxt(t("emailError.invalid"));
                    return true;
                }
                if (requestResult === SendForgotPasswordStatusEnum.TooManyAttempts) {
                    setEmailErrorTxt(t("tooManyAttemptsLongError"));
                    return true;
                }
            }

            return false;
        },
        [requestResult, t]
    );

    const validateForm = useCallback(() => {
        const emailHasError = validateEmail(email);
        setIsEmailError(emailHasError);

        const formIsValid = !emailHasError;

        return formIsValid;
    }, [validateEmail, email]);

    useEffect(() => {
        if (requestResult && requestResult !== SendForgotPasswordStatusEnum.Success) {
            validateForm();
        }
    }, [requestResult, validateForm]);

    const onEmailFocus = () => {
        setIsEmailError(false);
        setRequestResult(null);
    };

    const handleSubmit = () => {
        const sendRequest = async (request: IResendEmailConfirmationRequest) => {
            return await postData<SendForgotPasswordStatusEnum>("/registration/forgot-password", request);
        };

        if (validateForm()) {
            const request = {
                email: email,
                isClient: true,
            } as IResendEmailConfirmationRequest;

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

    return (
        <>
            {requestInProgress && <Spinner full />}
            <Styled.FormBox $isMobile={isMobile}>
                <LogoControl />
                {requestResult && requestResult === SendForgotPasswordStatusEnum.Success ? (
                    <Styled.MessageBox>
                        <span>{t("followEmailLink")}</span>
                    </Styled.MessageBox>
                ) : (
                    <form>
                        <div>
                            <div>
                                <Styled.SectionContent>
                                    <Styled.Box>
                                        <Styled.HdrContainer>
                                            <Styled.HdrTitle className="tsHeadline500Medium">
                                                {t("forgotPassword")}
                                            </Styled.HdrTitle>
                                        </Styled.HdrContainer>
                                        <Styled.TitleContainer>
                                            <span>{t("forgotPasswordTitle")}</span>
                                        </Styled.TitleContainer>
                                        <Styled.InputContainer>
                                            <div>
                                                <Input
                                                    label={t("emailLabel")}
                                                    name="email"
                                                    type="email"
                                                    inputValue={email}
                                                    onChange={setEmail}
                                                    autoFocus
                                                    isError={isEmailError}
                                                    errorText={emailErrorTxt}
                                                    onFocus={onEmailFocus}
                                                    maxLength={320}
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
