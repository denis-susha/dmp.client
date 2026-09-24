import { appConfig } from "@/appConfig";
import styled from "styled-components";

const Container = styled.div`
    height: calc(-194px + 100vh);
    box-sizing: border-box;
    display: flex;
    min-height: 380px;
    overflow: hidden;
    width: 100%;
    flex-wrap: wrap;
`;

const ChatList = styled.div<{ $isMobile: boolean }>`
    box-sizing: border-box;
    margin-right: 8px;
    position: relative;
    width: ${(props) => (props.$isMobile ? "100%" : "332px")};
`;

const ChatListWrapper = styled.div`
    contain: strict;
    height: 100%;
    position: relative;
    grid-area: 2/2/2/2;
    overflow: hidden;
`;

const ChatListBox = styled.div`
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
    overscroll-behavior: contain;
    padding: 8px 8px 0;
    width: 100%;
    contain: strict;
    height: 100%;
    position: relative;
`;

const ChatListItem = styled.div<{ $active: boolean }>`
    background-color: ${(props) => (props.$active ? "rgba(0,150,255,.078)" : "inherit")};
    align-content: start;
    align-items: start;
    border-radius: 24px;
    box-sizing: border-box;
    cursor: pointer;
    display: grid;
    grid-auto-flow: row;
    grid-template-columns: repeat(2, minmax(0, min-content)) 1fr minmax(0, min-content);
    grid-template-rows: 20px minmax(20px, 40px);
    letter-spacing: var(0.2px);
    margin-bottom: 4px;
    min-height: 78px;
    overflow: hidden;
    padding: 8px 12px 8px 8px;
    position: relative;
    row-gap: 2px;
`;

const ChatListItemAvatar = styled.div`
    background: rgba(0, 48, 120, 0.039) url(${appConfig.staticUrl}chat_msg.png) center / contain no-repeat;
    align-self: center;
    grid-row: 1/3;
    margin-bottom: 6px;
    margin-right: 12px;
    position: relative;
    border-radius: 16px;
    height: 56px;
    width: 56px;
`;

const ChatListItemHdr = styled.span`
    grid-area: 1/2/1/3;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const ChatListItemDate = styled.span`
    grid-area: 1/4/1/5;
    margin-left: 12px;
    top: 2px;
    flex-direction: row-reverse;
    justify-content: flex-start;
    text-align: end;
    width: auto;
    display: flex;
    float: right;
`;

const ChatListItemSubject = styled.span`
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    grid-area: 2/2/2/4;
    overflow: hidden;
    overflow-wrap: break-word;
    text-overflow: ellipsis;
    white-space: pre-line;
`;

const ChatColumn = styled.div`
    contain: strict;
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-bottom: 12px;
    overflow: hidden;
    position: relative;
    top: 0;
`;

const ChatWrapper = styled.div`
    border: 1px solid #ccd6e499;
    border-radius: 24px;
    box-sizing: border-box;
    flex: 1;
    height: 100%;
    overflow: hidden;
    position: relative;
    width: 100%;
`;

const ChatBox = styled.div`
    box-sizing: border-box;
    contain: strict;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    overscroll-behavior: contain;
    position: relative;
    text-align: center;
    width: 100%;
`;

const ChatItem = styled.div`
    contain: layout style;
    margin-bottom: 10px;
    margin-top: 10px;
`;

const Message = styled.div`
    padding: 0 16px;
    align-items: flex-end;
    display: grid;
    grid-template-columns: fit-content(28px) 100%;
    grid-template-rows: auto auto auto;
`;

const MessageAvatar = styled.div`
    background: rgba(0, 48, 120, 0.039) url(${appConfig.staticUrl}support_avatar.png) center / contain no-repeat;
    bottom: 8px;
    grid-area: 3/1/3/1;
    margin-right: 4px;
    position: sticky;
    border-radius: 6px;
    height: 24px;
    width: 24px;
    align-items: center;
    box-sizing: border-box;
    color: var(--textTertiary);
    display: flex;
    justify-content: center;
    overflow: hidden;
    vertical-align: top;
`;

const MessageWrapper = styled.div`
    max-width: 80%;
    grid-column: 2/2;
    grid-row: 3;
    width: 100%;
`;

const MessageBox = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 100%) fit-content(36px);
    max-width: 100%;
    position: relative;
    scroll-margin-bottom: 8px;
    text-align: left;
    width: -moz-fit-content;
    width: fit-content;
`;

const MessageDiv = styled.div`
    padding-bottom: 10px;
    padding-top: 8px;
    grid-column: 1;
    text-align: left;
    border-radius: 16px 16px 0 0;
    background-color: rgb(245, 247, 250);
    overflow: hidden;
    position: relative;
    width: 100%;
    word-wrap: break-word;
    box-sizing: border-box;
    padding: 4px 12px 0;
    white-space: pre-line;
    word-break: break-word;
`;

const MessageHdr = styled.div`
    align-items: center;
    color: #001a3499;
    display: flex;
    font: var(--fBodyM);
    grid-column: 1/3;
    letter-spacing: var(--fBodyMLS);
    margin-bottom: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
`;

const MessageDate = styled.span`
    color: #001a3499;
    display: flex;
    float: right;
    justify-content: flex-end;
    position: relative;
    text-align: right;
    top: 6px;
    width: 36px;
`;

export const Styled = {
    Container,
    ChatList,
    ChatListWrapper,
    ChatListBox,
    ChatListItem,
    ChatListItemAvatar,
    ChatListItemHdr,
    ChatListItemDate,
    ChatListItemSubject,
    ChatColumn,
    ChatWrapper,
    ChatBox,
    ChatItem,
    Message,
    MessageAvatar,
    MessageWrapper,
    MessageBox,
    MessageDiv,
    MessageHdr,
    MessageDate,
};
