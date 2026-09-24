import { FC } from "react";
import Icon from "@/components/common/Icon";
import { twMerge } from "tailwind-merge";
import { IMenuCategory } from "@/services/models/catalog/menuCategory";

interface Props {
    menuCategory: IMenuCategory;
    isSelected: boolean;
    iconName: string;
    onHoverSelect: (menuCategoryId: number) => void;
}

const MenuItem: FC<Props> = (props) => {
    const { isSelected, menuCategory, iconName, onHoverSelect } = props;

    return (
        <li onMouseEnter={() => onHoverSelect(menuCategory.menuCategoryId)} className="tsBody500Medium">
            <a
                target="_blank"
                href={`/${menuCategory.url}`}
                className={twMerge(
                    isSelected ? "bg-[#f5f7fa] text-[#005bff]" : "text-[#070707]",
                    "flex items-center box-border gap-[8px] min-h-[48px] p-[5px_8px] rounded-[12px] transition-colors"
                )}
            >
                <Icon
                    width={24}
                    height={24}
                    icon={iconName}
                    isLazy={true}
                    className={twMerge(isSelected ? "text-[#005bff]" : "text-[rgba(0,26,52,0.2)]", "shrink-0")}
                />
                <span>{menuCategory.title}</span>
            </a>
        </li>
    );
};

export default MenuItem;
