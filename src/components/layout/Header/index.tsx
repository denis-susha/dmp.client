import { FC, RefObject, useEffect, useState } from "react";
import Icon from "@/components/common/Icon";
import HeaderAction from "./action";
import HorizontalMenu from "./horizontalMenu";
import CatalogBtn from "./catalogBtn/catalogBtn";
import Tooltip from "@/components/common/Tooltip";
import { SearchBar } from "./searchBar/searchBar";
import { appConfig } from "@/appConfig";
import { Styled } from "./header.styles";
import Badge from "@/components/common/Badge";
import { useMainStore } from "@/contexts/mainStoreProvider";
import { useLocalStorage } from "@/hooks";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next/pages";
import LazyHydrate from "@/components/common/LazyHydrate";
import { usePathname } from "next/navigation";

const UserMenuTooltip = dynamic(() => import("./userMenuTooltip/userMenuTooltip"), { ssr: false });
const LoginTooltipContent = dynamic(() => import("./loginTooltipContent/loginTooltipContent"), { ssr: false });

interface Props {
    btnRef: RefObject<HTMLDivElement | null>;
    stickyHeader: boolean;
}

const Header: FC<Props> = ({ btnRef, stickyHeader }) => {
    const { t } = useTranslation(["common"]);
    const pathname = usePathname();
    const { isAuthValid, dynamicInfo, userInfo } = useMainStore((state) => state);
    const [scroll, setScroll] = useState(false);
    const [favorites] = useLocalStorage<number[] | null>("favorites", null);

    const handleScroll = () => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 50);
        });
    };

    useEffect(() => {
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isSelf = pathname.replace("/", "").trim().length > 0;

    return (
        <Styled.Header>
            <div>
                <Styled.StickyBox $sticky={scroll && stickyHeader}>
                    <Styled.LogoLink target="_self" href="/">
                        <Styled.Logo
                            width={128}
                            height={35}
                            src={`${appConfig.staticUrl}logo_color.png`}
                            alt="Filezon"
                        />
                    </Styled.LogoLink>
                    <Styled.CatalogBtnWrapper>
                        <CatalogBtn btnRef={btnRef} />
                    </Styled.CatalogBtnWrapper>
                    <Styled.SearchBarBox>
                        <div>
                            <SearchBar />
                        </div>
                    </Styled.SearchBarBox>
                    <Styled.HeaderActionAccount>
                        <Styled.HeaderActionAccountWrapper>
                            <Styled.HeaderActionNameBox>
                                <Tooltip
                                    content={
                                        isAuthValid ? (
                                            <UserMenuTooltip />
                                        ) : (
                                            <LazyHydrate whenVisible>{<LoginTooltipContent />}</LazyHydrate>
                                        )
                                    }
                                    position="bottom"
                                    trigger="hover"
                                    minWidth={264}
                                    maxWidth={264}
                                >
                                    <Styled.HeaderActionLink
                                        target="_blank"
                                        href={"/login"}
                                        rel="noopener"
                                        $isMobile={false}
                                    >
                                        <Badge dot showZero={!isAuthValid} color="error">
                                            <Icon width={24} height={24} viewBox="0 0 24 24" icon={"user"} />
                                        </Badge>
                                        <Styled.HeaderActionName className="header-action-name">
                                            {isAuthValid ? userInfo.name : t("signIn")}
                                        </Styled.HeaderActionName>
                                    </Styled.HeaderActionLink>
                                </Tooltip>
                            </Styled.HeaderActionNameBox>
                        </Styled.HeaderActionAccountWrapper>
                        <HeaderAction
                            name={t("orders")}
                            iconName="boxes"
                            href="/my/orderlist"
                            badgeCount={dynamicInfo?.pendingOrdersCount}
                            isSelf={isSelf}
                        />
                        <HeaderAction
                            name={t("favorites")}
                            iconName="folder"
                            href="/my/favorites"
                            badgeCount={favorites?.length}
                            isSelf={isSelf}
                        />
                        <HeaderAction
                            name={t("cart")}
                            iconName="shopping-cart"
                            href="/cart"
                            badgeCount={dynamicInfo?.cartCount}
                            isSelf={isSelf}
                        />
                    </Styled.HeaderActionAccount>
                </Styled.StickyBox>
                <HorizontalMenu />
            </div>
        </Styled.Header>
    );
};

export default Header;
