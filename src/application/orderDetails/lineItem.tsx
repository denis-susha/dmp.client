import { type FC } from "react";
import { useTranslation } from "next-i18next/pages";
import { Styled } from "./orderDetailsIndex.styles";
import Icon from "@/components/common/Icon";
import Button from "@/components/common/Button";
import { IGetOrderLineResponse } from "@/services/models/order/getOrderLineResponse";
import { useAppNotificationStore } from "@/components/common/Notification/stores/appNotificationStoreProvider";

export interface LinetemProps {
    item: IGetOrderLineResponse;
}

export const Linetem: FC<LinetemProps> = (props) => {
    const { item } = props;
    const { t } = useTranslation(["order"]);
    const { addNotification } = useAppNotificationStore((state) => state);

    const onBtnClick = () => {
        navigator.clipboard.writeText(item?.data?.lineData ?? "");
        addNotification(t("copied", { ns: "common" }), "success");
    };

    return (
        <Styled.DownloadItem>
            <Styled.DownloadItemIconContainer>
                <Icon icon="file" viewBox="0 0 24 24" />
            </Styled.DownloadItemIconContainer>
            <Styled.DownloadItemInfoContainer>
                <Styled.LineItemInfoTitle>{item.data?.lineData}</Styled.LineItemInfoTitle>
                <Styled.DownloadItemInfoSubtitle>{item.productName}</Styled.DownloadItemInfoSubtitle>
            </Styled.DownloadItemInfoContainer>
            <div>
                <Button size="small" onClick={onBtnClick}>
                    <div className="tsCompact500Medium">{t("copy", { ns: "common" })}</div>
                </Button>
            </div>
        </Styled.DownloadItem>
    );
};
