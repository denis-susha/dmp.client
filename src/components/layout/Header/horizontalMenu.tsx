import { FC } from "react";

import { MenuIconMap } from "../Catalog";
import { Styled } from "./header.styles";
import { useMainStore } from "@/contexts/mainStoreProvider";
import { usePathname } from "next/navigation";

type ItemProps = {
    title: string;
    url: string;
    isSelf: boolean;
    iconName?: string;
};

const Item = (props: ItemProps) => {
    return (
        <Styled.HorizontalMenuListItem>
            <Styled.StyledLink target={props.isSelf ? "_self" : "_blank"} href={props.url} rel="noopener">
                {props.iconName ? (
                    <Styled.StyledIcon
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        icon={props.iconName}
                        isLazy={false}
                    />
                ) : (
                    ""
                )}
                {props.title}
            </Styled.StyledLink>
        </Styled.HorizontalMenuListItem>
    );
};

const HorizontalMenu: FC = () => {
    const pathname = usePathname();
    const { menu } = useMainStore((state) => state);

    const items = menu?.categories
        ?.filter((c) => c.parentId === null)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .slice(0, 8)
        .map((category) => {
            return {
                title: category.title,
                url: `/${category.url}`,
                iconName: MenuIconMap[category.menuCategoryId],
            };
        });

    const isSelf = pathname.replace("/", "").trim().length > 0;

    return (
        <Styled.HorizontalMenu>
            <div>
                <Styled.Wrapper>
                    <Styled.List>
                        {items &&
                            items.length > 0 &&
                            items.map((item, idx) => <Item {...item} key={idx} isSelf={isSelf} />)}
                    </Styled.List>
                </Styled.Wrapper>
            </div>
        </Styled.HorizontalMenu>
    );
};

export default HorizontalMenu;
