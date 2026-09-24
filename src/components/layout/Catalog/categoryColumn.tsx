import { FC, useEffect } from "react";
import CategoryItem from "./categoryItem";
import { IMenuCategory } from "@/services/models/catalog/menuCategory";

interface Props {
    categories: IMenuCategory[];
}

const CategoryColumn: FC<Props> = ({ categories }) => {
    useEffect(() => {}, []);

    return (
        <div className="flex flex-col w-[calc(33%-20px)] gap-[30px]">
            {categories.map((c, idx) => (
                <CategoryItem key={idx} category={c} />
            ))}
        </div>
    );
};

export default CategoryColumn;
