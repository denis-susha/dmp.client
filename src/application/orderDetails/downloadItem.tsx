import { type FC } from "react";
import { useTranslation } from "next-i18next/pages";
import { Styled } from "./orderDetailsIndex.styles";
import Icon from "@/components/common/Icon";
import Button from "@/components/common/Button";
import { appConfig } from "@/appConfig";
import { FormatFileSize } from "../common/fileSizeFormat";
import { IGetOrderLineResponse } from "@/services/models/order/getOrderLineResponse";

export interface DownloadItemProps {
    orderId: number;
    item: IGetOrderLineResponse;
}

export const DownloadItem: FC<DownloadItemProps> = (props) => {
    const { item, orderId } = props;
    const { t } = useTranslation(["order"]);

    const onBtnClick = () => {
        window.open(
            `${appConfig.apiHost}/download?orderId=${orderId}&fileLineIdentificator=${item.data?.fileLineIdentificator}`,
            "_blank"
        );
    };

    return (
        <Styled.DownloadItem>
            <Styled.DownloadItemIconContainer>
                <Icon icon="file" viewBox="0 0 24 24" />
            </Styled.DownloadItemIconContainer>
            <Styled.DownloadItemInfoContainer>
                <Styled.DownloadItemInfoTitle>{item.data?.fileName}</Styled.DownloadItemInfoTitle>
                <Styled.DownloadItemInfoSubtitle>
                    <FormatFileSize bytes={item.data?.fileSize ?? 0} />
                </Styled.DownloadItemInfoSubtitle>
            </Styled.DownloadItemInfoContainer>
            <div>
                <Button size="small" onClick={onBtnClick}>
                    <div className="tsCompact500Medium">{t("download")}</div>
                </Button>
            </div>
        </Styled.DownloadItem>
    );
};
