import { type FC } from "react";
import { useTranslation } from "next-i18next/pages";
import { OrderListItem } from "./item/orderListItem";
import { NoOrders } from "./noOrders/noOrders";
import { useOrderListStore } from "./stores/orderListStoreProvider";
import { MyContainer } from "../common/my/myContainer";
import { UserSettingsPanel } from "../common/my/userSettingsPanel/userSettingsPanel";

export const OrderListIndex: FC = () => {
    const { t } = useTranslation(["order"]);
    const { orderList, request, totalCount } = useOrderListStore((state) => state);

    return (
        <MyContainer
            leftColumn={<UserSettingsPanel />}
            pagination={request.pagination}
            totalCount={totalCount}
            header={t("pageHeader")}
        >
            {orderList && orderList.map((order, idx) => <OrderListItem key={idx} order={order} />)}
            {(!orderList || !orderList.length) && <NoOrders />}
        </MyContainer>
    );
};
