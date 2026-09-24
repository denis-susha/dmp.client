import { FC, useCallback, useState } from "react";
import Icon from "@/components/common/Icon";
import styled from "styled-components";
import { useTranslation } from "next-i18next/pages";
import { useRouter } from "next/router";
import { IMenuCategory } from "@/services/models/catalog/menuCategory";

const item = (c: IMenuCategory, target: string) => {
    return (
        <a
            key={c.menuCategoryId}
            target={target}
            href={`/${c.url}`}
            rel="noopener"
            className="flex items-center text-[rgba(0,26,52,0.6)] transition-colors tsBody400Small hover:text-inherit"
        >
            {c.title}
        </a>
    );
};

interface IStyledIconProps {
    $btnIsOpen: boolean;
}

const StyledIcon = styled(Icon)<IStyledIconProps>`
    transform: ${(props) => (props.$btnIsOpen ? "rotate(180deg);" : "none")};
    transition: 0.3s;
`;

interface Props {
    category: IMenuCategory;
}

const CategoryItem: FC<Props> = ({ category }) => {
    const [btnIsOpen, setBtnIsOpen] = useState(false);
    const { t } = useTranslation(["common"]);
    const router = useRouter();

    const target = router.route.includes("/category/") ? "_self" : "_blank";

    const onToggleMoreBtn = useCallback(() => {
        setBtnIsOpen(!btnIsOpen);
    }, [btnIsOpen]);

    const openListCategories = category.children?.slice(0, 5);
    const hiddenListCategories = category.children?.slice(6);

    return (
        <div className="flex flex-col gap-[8px] w-full">
            <a
                target={target}
                href={`/${category.url}`}
                rel="noopener"
                className="text-[#070707] transition-colors tsBodyControl500Medium"
            >
                {category.title}
            </a>
            {openListCategories &&
                openListCategories.length > 0 &&
                openListCategories.map((c: IMenuCategory) => item(c, target))}
            {hiddenListCategories && hiddenListCategories.length > 0 && (
                <>
                    {btnIsOpen && hiddenListCategories.map((c: IMenuCategory) => item(c, target))}
                    <button
                        onClick={onToggleMoreBtn}
                        className="flex items-center bg-transparent border-0 m-0 p-0 text-left text-[#005bff] tsBody400Small hover:text-inherit"
                    >
                        <span>{t(btnIsOpen ? "collapse" : "more")}</span>
                        <StyledIcon $btnIsOpen={btnIsOpen} width={24} height={24} icon={"list-arrow"} />
                    </button>
                </>
            )}
        </div>
    );
};

export default CategoryItem;
