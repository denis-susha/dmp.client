import { type FC } from "react";
import { Styled } from "./userSettingsPanel.styles";
import Button from "@/components/common/Button";
import { useRouter } from "next/router";
import { Grid } from "@/components/grid/grid.styles";
import { useMainStore } from "@/contexts/mainStoreProvider";
import { useTranslation } from "next-i18next/pages";

export const UserSettingsPanel: FC = () => {
    const { t } = useTranslation(["settings-panel"]);
    const { userInfo } = useMainStore((state) => state);
    const router = useRouter();

    const onChangeProfileBtnClick = () => {
        router.push("/my/settings");
    };

    return (
        <>
            <Styled.NameBox>
                <Styled.FirstNameTitle>{userInfo.name}</Styled.FirstNameTitle>
                <Button style="simple">
                    <Styled.ChangeProfileBtnInner onClick={onChangeProfileBtnClick} className="tsBodyControl400Small">
                        {t("changeProfile")}
                    </Styled.ChangeProfileBtnInner>
                </Button>
            </Styled.NameBox>
            <Grid.Separator $height={32} />
            <Styled.MenuContainer>
                <Styled.MenuBox>
                    <Styled.MenuHeader className="tsBody400Small">{t("orders")}</Styled.MenuHeader>
                    <div>
                        <Styled.MenuLink target="_self" href={"/cart"} className="tsBody400Small">
                            {t("myCart")}
                        </Styled.MenuLink>
                        <Styled.MenuLink target="_self" href={"/my/orderlist"} className="tsBody400Small">
                            {t("myOrders")}
                        </Styled.MenuLink>
                        <Styled.MenuLink target="_self" href={"/my/chat"} className="tsBody400Small">
                            {t("messages")}
                        </Styled.MenuLink>
                    </div>
                </Styled.MenuBox>
                <Styled.MenuBox>
                    <Styled.MenuHeader className="tsBody400Small">{t("reviewsQuestions")}</Styled.MenuHeader>
                    <div>
                        <Styled.MenuLink target="_self" href={""} className="tsBody400Small">
                            {t("reviews")}
                        </Styled.MenuLink>
                        <Styled.MenuLink target="_self" href={""} className="tsBody400Small">
                            {t("questions")}
                        </Styled.MenuLink>
                    </div>
                </Styled.MenuBox>
                <Styled.MenuBox>
                    <Styled.MenuHeader className="tsBody400Small">{t("subscriptions")}</Styled.MenuHeader>
                    <div>
                        <Styled.MenuLink target="_self" href={"/my/favorites"} className="tsBody400Small">
                            {t("favorites")}
                        </Styled.MenuLink>
                    </div>
                </Styled.MenuBox>
            </Styled.MenuContainer>
        </>
    );
};
