import { useCallback, useEffect, useState, type FC } from "react";
import { Styled } from "../../components/layout/Layout/NonAuth/nonAuthPageLayout.styles";
import { Styled as RegStyled } from "./registration.styles";
import { useTranslation } from "next-i18next/pages";
import { RegExps } from "../constants";
import { RegistrationResultStatusEnum } from "@/services/models/registration/registrationResultStatusEnum";
import { IRegistrationRequest } from "@/services/models/registration/registrationRequest";
import Spinner from "@/components/common/Spinner";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useRegistrationStore } from "./stores/registrationStoreProvider";
import { useAppNotificationStore } from "@/components/common/Notification/stores/appNotificationStoreProvider";
import { LogoControl } from "@/components/layout/Layout/NonAuth/logoControl";
import Modal from "@/components/common/Modal/modal";
import { AuthPageProps } from "@/pages/login";
import TurnstileWidget from "../base/common/TurnstileWidget/turnstileWidget";

export const RegistrationIndex: FC<AuthPageProps> = ({ isMobile }) => {
    const { t } = useTranslation(["registration", "common"]);
    const { addNotification } = useAppNotificationStore((state) => state);
    const { register, registrationInProgress, registrationResult, error } = useRegistrationStore((store) => store);

    const [email, setEmail] = useState("");
    const [isEmailError, setIsEmailError] = useState(false);
    const [emailErrorTxt, setEmailErrorTxt] = useState("");

    const [password, setPassword] = useState("");
    const [isPasswordError, setIsPasswordError] = useState(false);
    const [passwordErrorTxt, setPasswordErrorTxt] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");
    const [isConfirmPasswordError, setIsConfirmPasswordError] = useState(false);
    const [confirmPasswordErrorTxt, setConfirmPasswordErrorTxt] = useState("");
    const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

    const openTermsModal = () => setIsTermsModalOpen(true);
    const closeTermsModal = () => setIsTermsModalOpen(false);

    useEffect(() => {
        if (error) {
            addNotification(t("errors.common", { ns: "common" }), "error");
        }
    }, [addNotification, error, t]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const validateEmail = (value: string): boolean => {
        if (value.trim().length === 0) {
            setEmailErrorTxt(t("emailError.empty"));
            return true;
        }
        if (!RegExps.ValidateEmailFormat.test(value)) {
            setEmailErrorTxt(t("emailError.incorrect"));
            return true;
        }

        return false;
    };

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
        const emailHasError = validateEmail(email);
        setIsEmailError(emailHasError);

        const passHasError = validatePassword(password);
        setIsPasswordError(passHasError);

        const confPassHasError = validateConfirmPassword(confirmPassword);
        setIsConfirmPasswordError(confPassHasError);

        const formIsValid = !emailHasError && !passHasError && !confPassHasError;

        return formIsValid;
    }, [validateEmail, email, setIsEmailError, validatePassword, password, validateConfirmPassword, confirmPassword]);

    useEffect(() => {
        if (registrationResult && registrationResult !== RegistrationResultStatusEnum.Success) {
            if (registrationResult === RegistrationResultStatusEnum.ErrorEmailIsNotUniq) {
                setEmailErrorTxt(t("emailError.busy"));
                setIsEmailError(true);
            }

            if (registrationResult === RegistrationResultStatusEnum.TurnstileVerificationFailed) {
                addNotification(t("turnstileVerificationFailed"), "error");
            }
        }
    }, [registrationResult, setEmailErrorTxt, setIsEmailError, t, addNotification]);

    const onPasswordChange = (value: string) => {
        setPassword(value);
        const passHasError = validatePassword(value);
        setIsPasswordError(passHasError);
    };

    const onEmailFocus = () => {
        setIsEmailError(false);
    };

    const onPasswordFocus = () => {};

    const onConfirmPasswordFocus = () => {
        setIsConfirmPasswordError(false);
    };

    const handleSubmit = () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const token = (window as any).turnstile?.getResponse();
        if (!token) {
            addNotification(t("turnstileError"), "error");
            return false;
        }

        if (validateForm()) {
            const request = {
                email: email,
                password: password,
                confirmPassword: confirmPassword,
                turnstileToken: token,
            } as IRegistrationRequest;
            register(request);
        }
    };

    const ModalText = () => {
        const Item = (props: { header: string; body: string | React.ReactNode }) => {
            return (
                <>
                    <h3 className="tsHeadline500Medium">{props.header}</h3>
                    <span>{props.body}</span>
                </>
            );
        };

        return (
            <RegStyled.ModelBodyText>
                <Item header={t("introduction")} body={t("introductionTitle")} />
                <Item header={t("account")} body={t("accountTitle")} />
                <Item
                    header={t("usePlatform")}
                    body={
                        <>
                            {t("usePlatformTitle1")}
                            <br />
                            <span> &#9679;</span>
                            {t("usePlatformTitle2")}
                            <br />
                            <span> &#9679;</span>
                            {t("usePlatformTitle3")}
                            <br />
                            <span> &#9679;</span>
                            {t("usePlatformTitle4")}
                        </>
                    }
                />
                <Item header={t("payments")} body={t("paymentsTitle")} />
                <Item header={t("licensing")} body={t("licensingTitle")} />
                <Item header={t("refunds")} body={t("refundsTitle")} />
                <Item header={t("intellectual")} body={t("intellectualTitle")} />
                <Item header={t("termination")} body={t("terminationTitle")} />
                <Item header={t("limitation")} body={t("limitationTitle")} />
                <Item header={t("governing")} body={t("governingTitle")} />
            </RegStyled.ModelBodyText>
        );
    };

    return (
        <>
            <Styled.FormBox $isMobile={isMobile}>
                <LogoControl />
                {registrationInProgress && <Spinner />}
                {registrationResult && registrationResult === RegistrationResultStatusEnum.Success ? (
                    <Styled.MessageBox>
                        <span>{t("followConfirmation")}</span>
                    </Styled.MessageBox>
                ) : (
                    <>
                        <form>
                            <div>
                                <div>
                                    <Styled.SectionContent>
                                        <Styled.Box>
                                            <Styled.HdrContainer>
                                                <Styled.HdrTitle className="tsHeadline500Medium">
                                                    {t("welcome")}
                                                </Styled.HdrTitle>
                                            </Styled.HdrContainer>
                                            <Styled.TitleContainer>
                                                <span>{t("setUpAccount")}</span>
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
                                            <Styled.TurnstileWidgetContainer>
                                                <TurnstileWidget />
                                            </Styled.TurnstileWidgetContainer>
                                            <div>
                                                <Button type="button" onClick={handleSubmit}>
                                                    <Styled.SubmitBtnTitleContainer>
                                                        <Styled.SubmitBtnTitle className="tsBodyControl500Medium">
                                                            {t("signUp")}
                                                        </Styled.SubmitBtnTitle>
                                                    </Styled.SubmitBtnTitleContainer>
                                                    <Styled.SubmitBtnBg />
                                                </Button>
                                            </div>
                                        </Styled.Box>
                                        <RegStyled.TermsOfUseBtnBox>
                                            <div>{t("termsAgreeText")}</div>
                                            <Styled.LogInAction onClick={openTermsModal}>
                                                {t("termsOfUse")}
                                            </Styled.LogInAction>
                                        </RegStyled.TermsOfUseBtnBox>
                                    </Styled.SectionContent>
                                </div>
                            </div>
                        </form>
                        <Modal
                            isMobile={isMobile}
                            isOpen={isTermsModalOpen}
                            onClose={closeTermsModal}
                            headerTite={t("termsHeader")}
                            text={<ModalText />}
                            wide
                        >
                            <Button size="small" fill={false} onClick={closeTermsModal}>
                                {t("familiarized")}
                            </Button>
                        </Modal>
                    </>
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
                        <span>{t("didNotReceive")}</span>
                    </div>
                    <Styled.LogInActionContainer>
                        <Styled.LogInAction href="/registration/resend-confirmation">{t("resend")}</Styled.LogInAction>
                    </Styled.LogInActionContainer>
                </Styled.CornerFunctionsRow>
            </Styled.CornerFunctionsContainer>
        </>
    );
};
