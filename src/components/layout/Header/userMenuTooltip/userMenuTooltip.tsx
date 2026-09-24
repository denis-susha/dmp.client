import { FC } from "react";
import { Styled } from "./userMenuTooltip.styles";
import { useTranslation } from "next-i18next/pages";

const UserMenuTooltip: FC = () => {
    const { t } = useTranslation(["common"]);
    return (
        <Styled.Container>
            <div>
                <Styled.Item href={"/my/settings"}>
                    <Styled.ItemInnerBox>
                        <div className="tsBody400Small">{t("personalAccount")}</div>
                    </Styled.ItemInnerBox>
                </Styled.Item>
            </div>
            <div>
                <Styled.Item href={"/my/chat"}>
                    <Styled.ItemInnerBox>
                        <div className="tsBody400Small">{t("messages")}</div>
                    </Styled.ItemInnerBox>
                </Styled.Item>
            </div>
        </Styled.Container>
    );
};

export default UserMenuTooltip;
