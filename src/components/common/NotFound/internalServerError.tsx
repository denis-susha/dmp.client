import React from "react";
import { useTranslation } from "next-i18next/pages";
import { Styles } from "./notFound.styles";
import { useRouter } from "next/router";

const InternalServerError: React.FC = () => {
    const { t } = useTranslation(["error"]);
    const router = useRouter();

    const onGoBackHomeClick = () => {
        router.push("/");
    };

    return (
        <Styles.NotFoundContainer>
            <Styles.NotFoundTitle>500 Server Error</Styles.NotFoundTitle>
            <Styles.NotFoundSubtitle>{t("internalServerErrorTitle")}</Styles.NotFoundSubtitle>
            <Styles.StyledButton fill={false} onClick={onGoBackHomeClick}>
                {t("goBackHome")}
            </Styles.StyledButton>
        </Styles.NotFoundContainer>
    );
};

export default InternalServerError;
