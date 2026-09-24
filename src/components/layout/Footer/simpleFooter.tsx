import { Styled } from "./simpleFooter.styles";
import Image from "next/image";
import { appConfig } from "@/appConfig";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "next-i18next/pages";
import SelectLanguageModal from "../Topbar/selectLanguageModal";
import { useIsMobile } from "@/utils";

const year = new Date().getFullYear();

const SimpleFooter = () => {
    const { t, i18n } = useTranslation(["common"]);
    const isMobile = useIsMobile();
    const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

    const openDeleteItemModal = () => setIsLanguageModalOpen(true);
    const closeLanguageModal = () => setIsLanguageModalOpen(false);

    return (
        <Styled.Footer>
            <Styled.Wrapper>
                <Link target="_self" href="/">
                    <Styled.Body>
                        <Image width={80} height={22} src={`${appConfig.staticUrl}logo_color.png`} alt="Filezon Logo" />
                        <Styled.Title>
                            <span className="tsBody500Small">{`© ${year} Filezon, LLC`}</span>
                        </Styled.Title>
                    </Styled.Body>
                </Link>
                <Styled.LanguageButtonContainer>
                    <Styled.LanguageButton onClick={openDeleteItemModal}>
                        <Image
                            width={24}
                            height={24}
                            src={`/images/icons/${i18n.language === "ru" ? "rus" : "eng"}.svg`}
                            alt="Language Icon"
                            style={{ marginRight: "4px" }}
                        />
                        <div>{`${t("language." + i18n.language)}`}</div>
                    </Styled.LanguageButton>
                </Styled.LanguageButtonContainer>
            </Styled.Wrapper>
            {isLanguageModalOpen && <SelectLanguageModal isMobile={isMobile} onClose={closeLanguageModal} />}
        </Styled.Footer>
    );
};

export default SimpleFooter;
