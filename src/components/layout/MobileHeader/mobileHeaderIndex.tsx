import { FC, useState } from "react";
import { useTranslation } from "next-i18next/pages";
import dynamic from "next/dynamic";
import Icon from "@/components/common/Icon";
import { useMainStore } from "@/contexts/mainStoreProvider";
import { Styled } from "./mobileHeader.styles";
import { LogoControl } from "../Layout/NonAuth/logoControl";
import Tooltip from "@/components/common/Tooltip";
import LazyHydrate from "@/components/common/LazyHydrate";
import Badge from "@/components/common/Badge";
import HeaderAction from "../Header/action";
import Button from "@/components/common/Button";
import { MobileMenu } from "./sideMenu/sideMenu";
import { SearchBar } from "../Header/searchBar/searchBar";
import { usePathname } from "next/navigation";

const UserMenuTooltip = dynamic(() => import("../Header/userMenuTooltip/userMenuTooltip"), { ssr: false });
const LoginTooltipContent = dynamic(() => import("../Header/loginTooltipContent/loginTooltipContent"), { ssr: false });

const MobileHeader: FC = () => {
    const { t } = useTranslation(["common"]);
    const pathname = usePathname();
    const { isAuthValid, dynamicInfo } = useMainStore((state) => state);
    const [open, setOpen] = useState(false);

    const openMenu = () => setOpen(true);
    const closeMenu = () => setOpen(false);

    const isSelf = pathname.replace("/", "").trim().length > 0;

    return (
        <Styled.Header>
            <Styled.ToolbarWrapper>
                <Styled.LeftPart>
                    <Button style="icon" onClick={openMenu}>
                        <Icon icon="hamburger" size={22} viewBox="0 0 22 18" />
                    </Button>
                    <MobileMenu open={open} closeMenu={closeMenu} />
                    <Styled.LogoWrapper>
                        <LogoControl />
                    </Styled.LogoWrapper>
                </Styled.LeftPart>
                <Styled.RightPart>
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
                                trigger="click"
                                minWidth={264}
                                maxWidth={264}
                            >
                                <Styled.HeaderAction>
                                    <Badge dot showZero={!isAuthValid} color="error">
                                        <Icon width={24} height={24} viewBox="0 0 24 24" icon={"user"} />
                                    </Badge>
                                </Styled.HeaderAction>
                            </Tooltip>
                        </Styled.HeaderActionNameBox>
                        <HeaderAction
                            name={t("cart")}
                            iconName="shopping-cart"
                            href="/cart"
                            badgeCount={dynamicInfo?.cartCount}
                            isMobile
                            isSelf={isSelf}
                        />
                    </Styled.HeaderActionAccountWrapper>
                </Styled.RightPart>
            </Styled.ToolbarWrapper>
            <div>
                <SearchBar />
            </div>
        </Styled.Header>
    );
};

export default MobileHeader;
