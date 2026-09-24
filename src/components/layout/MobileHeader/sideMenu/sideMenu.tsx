import React, { FC, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { LogoControl } from "../../Layout/NonAuth/logoControl";
import Link from "next/link";
import { useMainStore } from "@/contexts/mainStoreProvider";
import { useTranslation } from "next-i18next/pages";
import Badge from "@/components/common/Badge";
import { useLocalStorage } from "@/hooks";
import { UserRoleEnum } from "@/services/models/userRoleEnum";
import { appConfig } from "@/appConfig";
import Icon from "@/components/common/Icon";
import SelectLanguageModal from "../../Topbar/selectLanguageModal";

const MenuWrapper = styled.div<{ open: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    pointer-events: ${({ open }: { open: boolean }) => (open ? "auto" : "none")};
    z-index: 1000;
`;

const Overlay = styled.div<{ open: boolean }>`
    background: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
    opacity: ${({ open }: { open: boolean }) => (open ? 1 : 0)};
    transition: opacity 0.3s ease;
    pointer-events: ${({ open }: { open: boolean }) => (open ? "auto" : "none")};
`;

const SideMenu = styled.div<{ open: boolean }>`
    background: #fff;
    width: 80%;
    max-width: 80%;
    height: 100%;
    position: absolute;
    top: 0;
    left: ${({ open }: { open: boolean }) => (open ? "0" : "-100%")};
    transition: left 0.3s ease;
    padding: 1rem 1.5rem 1.5rem 1.5rem;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);
    overflow-y: auto;
`;

const CloseButton = styled.button`
    margin: 1rem;
    position: absolute;
    z-index: 1001;
    left: 80%;
    border: none;
    cursor: pointer;
    font-weight: bold;
    background: #fff;
    color: rgba(0, 26, 52, 0.6);
    border-radius: 50%;
    height: 30px;
    min-width: 30px;

    .close-btn-content {
        position: relative;
        top: -1px;
        font-size: 20px;
    }
`;

const LogoContainer = styled.div`
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: center;
`;

const List = styled.ul`
    padding: 0.8rem 0;
    list-style: none;
    margin: 0;
    max-width: none;
`;

const Separator = styled.h2`
    border-top: 1px solid #d1d2e0;
    margin-left: -1.2rem;
    margin-right: -1.2rem;
    font-weight: 700;
    padding-left: 1.2rem;
    padding-top: 1rem;
    font-size: 0.925rem;
    color: ${({ theme }) => theme.colors.text["gray1"]};
`;

const CatalogTitle = styled.div`
    color: ${({ theme }) => theme.colors["primary"]};
`;

const MenuLink = styled(Link)`
    padding: 0.4rem 0;
    display: flex;
`;

const GlobalStyle = createGlobalStyle`

body {
    overflow: hidden;    
}
`;

const LanguageButton = styled.button`
    align-items: center;
    background: rgba(0, 48, 120, 0.039);
    border: none;
    border-radius: 2px;
    box-sizing: border-box;
    color: rgba(0, 26, 52, 0.6);
    cursor: pointer;
    display: flex;
    flex-shrink: 0;
    font-family: var(--mainFont);
    font-size: 12px;
    height: 20px;
    padding: 2px 4px 2px 2px;
    transition: var(--transition);
    transition-property: background-color;
    text-transform: none;
    margin-right: 12px;
`;

const LanguageButtonContainer = styled.div`
    align-items: center;
    display: flex;
`;

export const MobileMenu: FC<{ open: boolean; closeMenu: () => void }> = ({ open, closeMenu }) => {
    const { t, i18n } = useTranslation(["common"]);
    const { dynamicInfo, userInfo, isMobile } = useMainStore((state) => state);
    const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
    const [favorites] = useLocalStorage<number[] | null>("favorites", null);
    const isSeller = userInfo && userInfo.role === UserRoleEnum.Seller;

    const openLanguageModal = () => {
        closeMenu();
        setIsLanguageModalOpen(true);
    };
    const closeLanguageModal = () => setIsLanguageModalOpen(false);

    return (
        <MenuWrapper open={open}>
            {open && <GlobalStyle />}
            <Overlay open={open} onClick={closeMenu}>
                <CloseButton onClick={closeMenu}>
                    <div className="close-btn-content">&times;</div>
                </CloseButton>
            </Overlay>
            <SideMenu open={open}>
                <LogoContainer>
                    <LogoControl />
                </LogoContainer>
                <nav>
                    <List>
                        <li>
                            <MenuLink target="_blank" href={"/category"} rel="noopener">
                                <CatalogTitle>{t("catalog")}</CatalogTitle>
                            </MenuLink>
                        </li>
                    </List>
                    <Separator>{"My Filezon"}</Separator>
                    <List>
                        <li>
                            <MenuLink target="_blank" href="/my/orderlist" rel="noopener">
                                <Badge count={dynamicInfo?.pendingOrdersCount} color="error">
                                    <div>{t("orders")}</div>
                                </Badge>
                            </MenuLink>
                        </li>
                        <li>
                            <MenuLink target="_blank" href="/my/favorites" rel="noopener">
                                <Badge count={favorites?.length} color="error">
                                    <div>{t("favorites")}</div>
                                </Badge>
                            </MenuLink>
                        </li>
                    </List>
                    <Separator />
                    <List>
                        <li>
                            <MenuLink
                                target="_blank"
                                href={`${isSeller ? appConfig.sellerHost : "/seller"}`}
                                rel="noopener"
                            >
                                <div>{isSeller ? t("myStore") : t("becomeSeller")}</div>
                            </MenuLink>
                        </li>
                        <li>
                            <MenuLink target="_blank" href="/help" rel="noopener">
                                <div>{t("help")}</div>
                            </MenuLink>
                        </li>
                    </List>
                </nav>
                <LanguageButtonContainer>
                    <LanguageButton onClick={openLanguageModal}>
                        <Icon
                            size={24}
                            icon={i18n.language === "ru" ? "rus" : "eng"}
                            isLazy={false}
                            className="mr-[4px]"
                        />
                        <div>{`${t("language." + i18n.language)} • USD`}</div>
                    </LanguageButton>
                </LanguageButtonContainer>
            </SideMenu>
            {isLanguageModalOpen && <SelectLanguageModal isMobile={isMobile} onClose={closeLanguageModal} />}
        </MenuWrapper>
    );
};
