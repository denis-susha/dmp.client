import { useTranslation } from "next-i18next/pages";
import { FC } from "react";

export const FormatFileSize: FC<{ bytes: number }> = ({ bytes }) => {
    const { t } = useTranslation("common");

    if (bytes < 1024) {
        return `${bytes} ${t("fileSize.bytes")}`;
    } else if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(2)} ${t("fileSize.kb")}`;
    } else if (bytes < 1024 * 1024 * 1024) {
        return `${(bytes / (1024 * 1024)).toFixed(2)} ${t("fileSize.mb")}`;
    } else {
        return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} ${t("fileSize.gb")}`;
    }
};
