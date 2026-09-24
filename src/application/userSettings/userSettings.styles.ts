import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";
import styled from "styled-components";

const UserProfileContainer = styled.div<{ $isMobile: boolean }>`
    padding: ${(props) => (props.$isMobile ? "20px 0" : "40px 0")};
    display: flex;
`;

const AvatarBox = styled.div<{ $isMobile: boolean }>`
    border-radius: 100px;
    height: ${(props) => (props.$isMobile ? "50px" : "152px")};
    width: ${(props) => (props.$isMobile ? "50px" : "152px")};
    margin-right: ${(props) => (props.$isMobile ? "24px" : "40px")};
    position: relative;
    background-color: #f2f3f5;
    display: flex;

    div {
        width: ${(props) => (props.$isMobile ? "42px" : "62px")};
        height: ${(props) => (props.$isMobile ? "42px" : "62px")};
        margin: auto;
        position: relative;
    }
`;

const Avatar = styled(Icon)`
    position: absolute;
    color: ${({ theme }) => theme.colors["primary"]};
`;

const NameBox = styled.div`
    color: #070707;
    font-size: 40px;
    font-weight: 700;
    line-height: 44px;
    margin-bottom: 28px;
`;

const ChangeBtnBox = styled.div`
    font-size: 14px;
    margin-top: 4px;
`;

const SettingsBox = styled.div`
    border-top: 1px solid rgba(204, 214, 228, 0.6);
    margin-bottom: 0;
    max-width: 900px;
    padding: 40px 0;
    box-sizing: border-box;
    color: #070707;
    font-size: 16px;
    line-height: 1.29;
    position: relative;
`;

const SettingsHeader = styled.h2`
    margin: 0 0 16px;
`;

const SettingsHeaderTitle = styled.p`
    color: rgba(0, 26, 52, 0.6);
    font-size: 16px;
    margin: 0;
    max-width: 644px;
`;

const SettingsList = styled.ul`
    display: flex;
    margin-top: 24px;
`;

const SettingsListItem = styled.li`
    flex-wrap: wrap;
    margin-bottom: 0;
    margin-right: 36px;
    display: flex;
    font-size: 16px;
    line-height: 20px;
    width: 50%;
`;

const SettingsListItemBox = styled.div`
    font-size: 16px;
    margin-right: 10px;
    padding: 8px 0;
`;

const SettingsListItemBoxTitle = styled.span`
    color: rgba(0, 26, 52, 0.6);
    display: block;
    font-size: 14px;
    line-height: 20px;
    margin-right: 16px;
`;

const SettingsListItemValue = styled.span`
    display: flex;
    margin-bottom: 12px;
`;

const ConfirmedEmail = styled.div`
    display: inline-flex;

    svg {
        color: ${({ theme }) => theme.colors["success"]};
        margin-left: 5px;
    }
`;

const HeaderWithAction = styled.div`
    align-items: flex-start;
    display: flex;
    justify-content: space-between;
`;

const AccountManagementBtn = styled(Button)`
    margin-top: 24px;

    & {
        color: rgba(241, 17, 126, 1);
    }

    &:hover {
        opacity: 0.9;
    }
`;

const DeleteAccountBtn = styled(AccountManagementBtn)`
    margin-top: 0px;
`;

const DropdownMenuBtnBox = styled.div`
    display: inline-flex;

    svg {
        color: #96a3ae;
        cursor: pointer;
    }
`;

const TooltipMenuContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const ModalButtonsBlock = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const ModalFieldsBox = styled.div`
    width: 100%;
    max-width: 300px;
`;

const DelAccWarning = styled.div`
    color: #f1117e;
    margin-bottom: 24px;
    background-color: #f2f5f9;
    border-radius: 16px;
    font-size: 14px;
    line-height: 18px;
    padding: 16px 24px 16px 16px;
    position: relative;
`;

const DelAccWarningWrapper = styled.div`
    align-items: flex-start;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
`;

const DelAccWarningTitle = styled.div`
    align-self: center;
    line-height: 18px;
    padding: 4px 0 2px;
    margin-left: 5px;
`;

const DelAccHeaderTitle = styled.div`
    font-size: 16px;
    font-weight: 700;
    line-height: 20px;
    color: #070707;
    margin-bottom: 8px;
`;

const DelAccTitleList = styled.ul`
    margin: 8px 0 24px;
    list-style: none;
    font-size: 16px;
`;

const DelAccTitleListItem = styled.li`
    margin-bottom: 3px;
`;

export const Styled = {
    UserProfileContainer,
    AvatarBox,
    Avatar,
    NameBox,
    ChangeBtnBox,
    SettingsBox,
    SettingsHeader,
    SettingsHeaderTitle,
    SettingsList,
    SettingsListItem,
    SettingsListItemBox,
    SettingsListItemBoxTitle,
    SettingsListItemValue,
    ConfirmedEmail,
    HeaderWithAction,
    AccountManagementBtn,
    DropdownMenuBtnBox,
    TooltipMenuContainer,
    DeleteAccountBtn,
    ModalButtonsBlock,
    ModalFieldsBox,
    DelAccWarning,
    DelAccWarningWrapper,
    DelAccWarningTitle,
    DelAccHeaderTitle,
    DelAccTitleList,
    DelAccTitleListItem,
};
