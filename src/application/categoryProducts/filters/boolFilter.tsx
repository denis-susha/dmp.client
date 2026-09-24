import { useCallback, useEffect, useState, type FC } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import Switch from "@/components/common/Switch";
import { ICategoryFeature } from "@/services/models/catalog/categoryFeature";

export interface IBoolFilterProps {
    feature: ICategoryFeature;
}

export const BoolFilter: FC<IBoolFilterProps> = (props) => {
    const { feature: f } = props;

    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [isOn, setIsOn] = useState(false);

    useEffect(() => {
        if (searchParams && searchParams.has(f.name)) {
            const urlParamValue = searchParams.get(f.name);
            if (urlParamValue) {
                setIsOn(urlParamValue === "true");
            }
        } else {
            setIsOn(false);
        }
    }, [f.name, searchParams, setIsOn]);

    const onChange = useCallback(
        (checked: boolean) => {
            const nextSearchParams = new URLSearchParams((searchParams ?? "").toString());

            if (checked) {
                nextSearchParams.set(f.name, "true");
            } else {
                nextSearchParams.delete(f.name);
            }

            router.push(`${pathname}${nextSearchParams.size > 0 ? "?" : ""}${nextSearchParams}`, undefined, {
                scroll: false,
                shallow: false,
            });
        },
        [searchParams, router, pathname, f.name]
    );

    return (
        <div>
            <div className="items-center flex flex-row w-full">
                <div className="flex flex-[1_1] flex-col overflow-hidden">
                    <div className="flex flex-row h-full">
                        <span className="self-center tsCompactControl500Medium">{f.title}</span>
                    </div>
                </div>
                <div className="items-center flex flex-[0_1] ml-[8px]">
                    <Switch checked={isOn} onChange={onChange} />
                </div>
            </div>
        </div>
    );
};
