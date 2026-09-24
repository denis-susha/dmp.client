import { type FC } from "react";
import { useTranslation } from "next-i18next/pages";
import { Grid } from "@/components/grid/grid.styles";
import { Styled } from "../common/my/myContainer.styles";
import { UserSettingsPanel } from "../common/my/userSettingsPanel/userSettingsPanel";
import { UserProfileControl } from "./userProfileControl";
import { AccountingData } from "./accountingData";
import { AccountManagement } from "./accountManagement";
import { useUserSettingsStore } from "./stores/userSettingsStoreProvider";
import Spinner from "@/components/common/Spinner";
import { useMainStore } from "@/contexts/mainStoreProvider";

export const UserSettingsIndex: FC = () => {
    const { t } = useTranslation(["settings"]);
    const { isMobile } = useMainStore((state) => state);
    const { isLoading } = useUserSettingsStore((state) => state);

    return (
        <Styled.Container $isMobile={isMobile}>
            {isLoading && <Spinner full />}
            <Grid.Row>
                <Styled.LeftColumn $isMobile={isMobile}>
                    <Styled.LeftColumnContainer>
                        <UserSettingsPanel />
                    </Styled.LeftColumnContainer>
                </Styled.LeftColumn>
                <Grid.Column>
                    <Styled.ListContainer>
                        <Styled.ListDiv>
                            <Styled.ListContainerHeader>
                                <span className="tsHeadline700XLarge">{t("pageHeader")}</span>
                            </Styled.ListContainerHeader>
                            <div>
                                <UserProfileControl />
                                <AccountingData />
                                <AccountManagement />
                            </div>
                        </Styled.ListDiv>
                    </Styled.ListContainer>
                </Grid.Column>
            </Grid.Row>
        </Styled.Container>
    );
};
