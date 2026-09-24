import { FC } from "react";
import CategoryColumn from "./categoryColumn";
import { IMenuCategory } from "@/services/models/catalog/menuCategory";

interface Props {
    categoryColumns: IMenuCategory[][];
}

const CategoriesBlock: FC<Props> = ({ categoryColumns }) => {
    if (!categoryColumns || !categoryColumns.length) {
        return null;
    }

    return (
        <div className="flex gap-[56px]">
            <div className="flex gap-[30px] w-[calc(100%-164px)]">
                {categoryColumns.map((c, idx) => (
                    <CategoryColumn key={idx} categories={c} />
                ))}
            </div>
            <div className="flex flex-col w-[108px] gap-[18px]"></div>
        </div>
    );
};

export default CategoriesBlock;
