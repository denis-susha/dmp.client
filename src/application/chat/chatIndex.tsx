import { useState, type FC } from "react";
import { useTranslation } from "next-i18next/pages";
import { Grid } from "@/components/grid/grid.styles";
import { Styled } from "../common/my/myContainer.styles";
import { Styled as CStyled } from "./chat.styles";
import { UserSettingsPanel } from "../common/my/userSettingsPanel/userSettingsPanel";
import Spinner from "@/components/common/Spinner";
import { useMainStore } from "@/contexts/mainStoreProvider";

export const ChatIndex: FC = () => {
    const { t } = useTranslation(["chat"]);
    const { userInfo, isMobile } = useMainStore((state) => state);
    const [isLoading] = useState(false);

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
                            <CStyled.Container>
                                <CStyled.ChatList $isMobile={isMobile}>
                                    <CStyled.ChatListWrapper>
                                        <CStyled.ChatListBox>
                                            <CStyled.ChatListItem $active={true}>
                                                <CStyled.ChatListItemAvatar />
                                                <CStyled.ChatListItemHdr className="tsBodyControl500Medium">
                                                    {t("chatHeader")}
                                                </CStyled.ChatListItemHdr>
                                                <CStyled.ChatListItemSubject>
                                                    {t("chatSubject")}
                                                </CStyled.ChatListItemSubject>
                                            </CStyled.ChatListItem>
                                        </CStyled.ChatListBox>
                                    </CStyled.ChatListWrapper>
                                </CStyled.ChatList>
                                <CStyled.ChatColumn>
                                    <CStyled.ChatWrapper>
                                        <CStyled.ChatBox>
                                            <CStyled.ChatItem>
                                                <CStyled.Message>
                                                    <CStyled.MessageAvatar />
                                                    <CStyled.MessageWrapper>
                                                        <CStyled.MessageBox>
                                                            <CStyled.MessageDiv>
                                                                <CStyled.MessageHdr>{t("botName")}</CStyled.MessageHdr>
                                                                <div className="tsBody500Medium">
                                                                    <p>{t("messageText1", { name: userInfo.name })}</p>
                                                                    <p>{t("messageText2")}</p>
                                                                    <p>{t("messageText3")}</p>
                                                                    <p>{t("messageText4")}</p>
                                                                    <p>{t("messageText5")}</p>
                                                                    <p>{t("messageText6")}</p>
                                                                    <p>{t("messageText7")}</p>
                                                                </div>
                                                            </CStyled.MessageDiv>
                                                        </CStyled.MessageBox>
                                                    </CStyled.MessageWrapper>
                                                </CStyled.Message>
                                            </CStyled.ChatItem>
                                        </CStyled.ChatBox>
                                    </CStyled.ChatWrapper>
                                </CStyled.ChatColumn>
                            </CStyled.Container>
                        </Styled.ListDiv>
                    </Styled.ListContainer>
                </Grid.Column>
            </Grid.Row>
        </Styled.Container>
    );
};
