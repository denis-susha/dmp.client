import React from "react";
import { useTranslation } from "next-i18next/pages";
import { Styles } from "./notFound.styles";
import { useRouter } from "next/router";

const NotFound: React.FC = () => {
    const { t } = useTranslation(["error"]);
    const router = useRouter();

    const onGoBackHomeClick = () => {
        router.push("/");
    };

    return (
        <Styles.NotFoundContainer>
            <Styles.NotFoundTitle>404</Styles.NotFoundTitle>
            <Styles.NotFoundSubtitle>{t("notFoundHdr")}</Styles.NotFoundSubtitle>
            <Styles.StyledButton fill={false} onClick={onGoBackHomeClick}>
                {t("goBackHome")}
            </Styles.StyledButton>
        </Styles.NotFoundContainer>
    );
};

export default NotFound;
