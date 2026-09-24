import { type FC } from "react";
import { useTranslation } from "next-i18next/pages";
import { appConfig } from "@/appConfig";
import Image from "next/image";
import Link from "next/link";

export const ProductsEmpty: FC<{ withFilters: boolean }> = ({ withFilters }) => {
    const { t } = useTranslation(["product"]);

    return (
        <div className="flex mb-[200px] mt-[20px]">
            <div className="mr-[24px] min-w-[48px] w-[48px]">
                <Image
                    alt="not_found_icon"
                    className="max-w-full max-h-full"
                    width={100}
                    height={100}
                    loading="lazy"
                    src={appConfig.staticUrl + (withFilters ? "filters_error_icon.webp" : "not_found_error_icon.webp")}
                ></Image>
            </div>
            <div>
                <div className="text-[#070707] text-[16px] leading-[1.38] max-w-[520px]">
                    {t(withFilters ? "filterError" : "productsNotFound")}
                </div>
                <div className="text-[16px] mt-[8px]">
                    <Link href={withFilters ? window.location.pathname : "/"} className="text-[#005bff]">
                        {withFilters ? t("resetFilters") : t("goToHome", { ns: "common" })}
                    </Link>
                </div>
            </div>
        </div>
    );
};
