import { type FC } from "react";
import { useTranslation } from "next-i18next/pages";
import Image from "next/image";
import { appConfig } from "@/appConfig";
import { Styled } from "../../common/my/myEmpty/myEmpty.styles";
import { MyEmpty } from "@/application/common/my/myEmpty/myEmpty";

export const EmptyFavorites: FC = () => {
    const { t } = useTranslation(["favorites"]);

    return (
        <MyEmpty>
            <div>
                <Styled.ImageBox>
                    <Image src={`${appConfig.staticUrl}no_favorites.png`} width={168} height={168} alt="no favorites" />
                </Styled.ImageBox>
            </div>
            <Styled.TitlesWrapper>
                <Styled.TitleHeader>
                    <span className="tsHeadline550Medium">{t("noFavoritesHdr")}</span>
                </Styled.TitleHeader>
                <Styled.Title>
                    <span className="tsBody500Medium">{t("noFavoritesTitle")}</span>
                </Styled.Title>
            </Styled.TitlesWrapper>
        </MyEmpty>
    );
};
