import { FC, useCallback, useEffect, useState } from "react";
import { Styled } from "../../components/layout/Layout/NonAuth/nonAuthPageLayout.styles";
import { RegExps } from "../constants";
import { HttpStatusEnum } from "@/services/models/registration/httpStatusEnum";
import { ILoginRequest } from "@/services/models/registration/loginRequest";
import Spinner from "@/components/common/Spinner";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useRouter } from "next/router";
import { useLoginStore } from "./stores/loginStoreProvider";
import { useAppNotificationStore } from "@/components/common/Notification/stores/appNotificationStoreProvider";
import { useTranslation } from "next-i18next/pages";
import { LogoControl } from "@/components/layout/Layout/NonAuth/logoControl";
import { AuthPageProps } from "@/pages/login";

const LoginPage: FC<AuthPageProps> = ({ isMobile }) => {
    const { t } = useTranslation(["registration", "common"]);
    const { login, loginInProgress, loginResultStatus, error, updateLoginResultStatus } = useLoginStore(
        (state) => state
    );
    const { addNotification } = useAppNotificationStore((state) => state);
    const router = useRouter();
    const { redirect } = router.query;

    const [email, setEmail] = useState("");
    const [isEmailError, setIsEmailError] = useState(false);
    const [emailErrorTxt, setEmailErrorTxt] = useState("");

    const [password, setPassword] = useState("");
    const [isPasswordError, setIsPasswordError] = useState(false);
    const [passwordErrorTxt, setPasswordErrorTxt] = useState("");

    useEffect(() => {
        if (error) {
            addNotification(t("errors.common", { ns: "common" }), "error");
        }
    }, [addNotification, error, t]);

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

            return false;
        },
        [t]
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
            if (loginResultStatus && loginResultStatus !== HttpStatusEnum.OK) {
                setPasswordErrorTxt(t("passwordError.incorrect"));
                return true;
            }

            return false;
        },
        [loginResultStatus, t]
    );

    const validateForm = useCallback(() => {
        const emailHasError = validateEmail(email);
        setIsEmailError(emailHasError);

        const passHasError = validatePassword(password);
        setIsPasswordError(passHasError);

        const formIsValid = !emailHasError && !passHasError;

        return formIsValid;
    }, [validateEmail, email, validatePassword, password]);

    const onPasswordChange = useCallback(
        (value: string) => {
            setPassword(value);
            const passHasError = validatePassword(value);
            setIsPasswordError(passHasError);
        },
        [validatePassword]
    );

    useEffect(() => {
        if (loginResultStatus) {
            if (loginResultStatus !== HttpStatusEnum.OK) {
                setPassword("");
                validateForm();
                addNotification(t("loginError"), "error");
                updateLoginResultStatus(null);
            } else {
                router.push(redirect ? String(redirect) : "/");
            }
        }
    }, [
        loginResultStatus,
        validateForm,
        addNotification,
        updateLoginResultStatus,
        onPasswordChange,
        router,
        redirect,
        t,
    ]);

    const onEmailFocus = () => {
        setIsEmailError(false);
    };

    const onPasswordFocus = () => {
        setIsPasswordError(false);
    };

    const handleSubmit = () => {
        if (validateForm()) {
            const request = {
                email: email,
                password: password,
            } as ILoginRequest;
            login(request);
        }
    };

    return (
        <>
            <Styled.FormBox $isMobile={isMobile}>
                <LogoControl />
                {loginInProgress && <Spinner />}
                <form>
                    <div>
                        <div>
                            <Styled.SectionContent>
                                <Styled.Box>
                                    <Styled.HdrContainer>
                                        <Styled.HdrTitle className="tsHeadline500Medium">
                                            {t("signInHeader")}
                                        </Styled.HdrTitle>
                                    </Styled.HdrContainer>
                                    <Styled.TitleContainer>
                                        <span>{t("enterDetails")}</span>
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
                                                autoComplete="email"
                                            />
                                        </div>
                                    </Styled.InputContainer>
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
                                                autoComplete="on"
                                            />
                                        </div>
                                    </Styled.InputContainer>
                                    <div>
                                        <Button type="button" onClick={handleSubmit}>
                                            <Styled.SubmitBtnTitleContainer>
                                                <Styled.SubmitBtnTitle className="tsBodyControl500Medium">
                                                    {t("signIn")}
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
            </Styled.FormBox>
            <Styled.CornerFunctionsContainer $isMobile={isMobile}>
                <Styled.CornerFunctionsRow>
                    <div>
                        <span>{t("dontHaveAccount")}</span>
                    </div>
                    <Styled.LogInActionContainer>
                        <Styled.LogInAction href="/registration">{t("signUp")}</Styled.LogInAction>
                    </Styled.LogInActionContainer>
                </Styled.CornerFunctionsRow>
                <Styled.CornerFunctionsRow>
                    <Styled.LogInActionContainer>
                        <Styled.LogInAction href="/registration/forgot-password">
                            {t("forgotPassword")}
                        </Styled.LogInAction>
                    </Styled.LogInActionContainer>
                    <Styled.LogInActionSeparator>/</Styled.LogInActionSeparator>
                    <Styled.LogInActionContainer>
                        <Styled.LogInAction href="/registration/resend-confirmation">
                            {t("resendMail")}
                        </Styled.LogInAction>
                    </Styled.LogInActionContainer>
                </Styled.CornerFunctionsRow>
            </Styled.CornerFunctionsContainer>
        </>
    );
};

export default LoginPage;
