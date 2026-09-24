import Icon from "@/components/common/Icon";
import { FC } from "react";
import { Styled } from "./header.styles";
import Badge from "@/components/common/Badge";

interface Props {
    name: string;
    iconName: string;
    href: string;
    badgeCount: number | undefined;
    isMobile?: boolean;
    isSelf: boolean;
}

const HeaderAction: FC<Props> = ({ name, iconName, href, badgeCount, isMobile = false, isSelf }) => {
    return (
        <Styled.HeaderAction>
            <Styled.HeaderActionLink
                target={isSelf ? "_self" : "_blank"}
                href={href}
                rel="noopener"
                $isMobile={isMobile}
            >
                <Badge count={badgeCount} color="error">
                    <Icon width={24} height={24} viewBox="0 0 24 24" icon={iconName} />
                </Badge>
                {!isMobile && <Styled.HeaderActionName className="header-action-name">{name}</Styled.HeaderActionName>}
            </Styled.HeaderActionLink>
        </Styled.HeaderAction>
    );
};

export default HeaderAction;
