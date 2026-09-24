import { type FC } from "react";
import { useTranslation } from "next-i18next/pages";
import Image from "next/image";
import { appConfig } from "@/appConfig";
import { Styled } from "../../common/my/myEmpty/myEmpty.styles";
import Button from "@/components/common/Button";
import { useRouter } from "next/router";
import { MyEmpty } from "@/application/common/my/myEmpty/myEmpty";

export const NoOrders: FC = () => {
    const { t } = useTranslation(["order"]);
    const router = useRouter();

    const onBtnClick = () => {
        router.push("/");
    };

    return (
        <MyEmpty>
            <div>
                <Styled.ImageBox>
                    <Image src={`${appConfig.staticUrl}no_orders.jpeg`} width={168} height={168} alt="no orders" />
                </Styled.ImageBox>
            </div>
            <Styled.TitlesWrapper>
                <Styled.TitleHeader>
                    <span className="tsHeadline550Medium">{t("noOrdersHdr")}</span>
                </Styled.TitleHeader>
                <Styled.Title>
                    <span className="tsBody500Medium">{t("noOrdersTitle")}</span>
                </Styled.Title>
                <Styled.BtnBox>
                    <Button fill={false} onClick={onBtnClick}>
                        <span className="tsBodyControl500Medium">{t("toShopping")}</span>
                    </Button>
                </Styled.BtnBox>
            </Styled.TitlesWrapper>
        </MyEmpty>
    );
};
