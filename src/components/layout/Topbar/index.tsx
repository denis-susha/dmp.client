import { FC, useState } from "react";
import Item from "./item";
import { useTranslation } from "next-i18next/pages";
import dynamic from "next/dynamic";
import Icon from "@/components/common/Icon";
import { Styled } from "./topbar.styles";
import { useMainStore } from "@/contexts/mainStoreProvider";
import { UserRoleEnum } from "@/services/models/userRoleEnum";
import { appConfig } from "@/appConfig";
import { usePathname } from "next/navigation";

const SelectLanguageModal = dynamic(() => import("./selectLanguageModal"), { ssr: false });

const Topbar: FC = () => {
    const { t, i18n } = useTranslation(["common"]);
    const pathname = usePathname();
    const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
    const { userInfo, isMobile } = useMainStore((state) => state);

    const openDeleteItemModal = () => setIsLanguageModalOpen(true);
    const closeLanguageModal = () => setIsLanguageModalOpen(false);
    const isSeller = userInfo && userInfo.role === UserRoleEnum.Seller;

    const isSelf = pathname.replace("/", "").trim().length > 0;

    return (
        <Styled.Topbar>
            <Styled.Wrapper>
                <Styled.LanguageButtonContainer>
                    <Styled.LanguageButton onClick={openDeleteItemModal}>
                        <Icon
                            size={24}
                            icon={i18n.language === "ru" ? "rus" : "eng"}
                            isLazy={false}
                            className="mr-[4px]"
                        />
                        <div>{`${t("language." + i18n.language)} • USD`}</div>
                    </Styled.LanguageButton>
                </Styled.LanguageButtonContainer>
                <Styled.RightItems>
                    <Item
                        text={isSeller ? t("myStore") : t("becomeSeller")}
                        link={`${isSeller ? appConfig.sellerHost : "/seller"}`}
                        stickOut={true}
                        isSelf={isSelf}
                    />
                    <Item text={t("help")} link="/help" isSelf={isSelf} />
                </Styled.RightItems>
            </Styled.Wrapper>
            {isLanguageModalOpen && <SelectLanguageModal isMobile={isMobile} onClose={closeLanguageModal} />}
        </Styled.Topbar>
    );
};

export default Topbar;
