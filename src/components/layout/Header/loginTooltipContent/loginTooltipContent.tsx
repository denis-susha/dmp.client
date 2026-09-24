import { useTranslation } from "next-i18next/pages";
import { useRouter } from "next/router";
import { Styled } from "./loginTooltipContent.styles";

const LoginTooltipContent = () => {
    const { t } = useTranslation(["common"]);
    const router = useRouter();

    const onBtnClick = () => {
        router.push("/login");
    };

    return (
        <Styled.Container>
            <div>{t("signInTitle")}</div>
            <div>{t("signInTitle2")}</div>
            <Styled.Btn size="small" onClick={onBtnClick}>
                <Styled.BtnIneerBox>
                    <Styled.BtnIneerWrapper className="tsBodyControl400Small">
                        {t("signInRegister")}
                    </Styled.BtnIneerWrapper>
                </Styled.BtnIneerBox>
            </Styled.Btn>
        </Styled.Container>
    );
};

export default LoginTooltipContent;
