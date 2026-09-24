import { useState, type FC } from "react";
import { useTranslation } from "next-i18next/pages";
import { Styled } from "./userSettings.styles";
import Icon from "@/components/common/Icon";
import Tooltip from "@/components/common/Tooltip";
import Modal from "@/components/common/Modal/modal";
import Button from "@/components/common/Button";
import { fetchData } from "@/utils/api/apiAxious";
import { useRouter } from "next/router";
import { useMainStore } from "@/contexts/mainStoreProvider";

type TooltipMenuProps = {
    onDeleteAccClick: () => void;
};

const TooltipMenu = (props: TooltipMenuProps) => {
    const { t } = useTranslation(["settings", "common"]);
    return (
        <Styled.TooltipMenuContainer>
            <div>
                <Styled.DeleteAccountBtn style="simple" onClick={props.onDeleteAccClick}>
                    <div className="tsBodyControl400Small">{t("deleteAccount")}</div>
                </Styled.DeleteAccountBtn>
            </div>
        </Styled.TooltipMenuContainer>
    );
};

const DeleteAccModalBody = () => {
    const { t } = useTranslation(["settings"]);
    return (
        <>
            <Styled.DelAccWarning>
                <Styled.DelAccWarningWrapper>
                    <Icon icon="warning" size={24} viewBox="0 0 24 24" />
                    <Styled.DelAccWarningTitle>
                        <div>{t("delAccWarning")}</div>
                    </Styled.DelAccWarningTitle>
                </Styled.DelAccWarningWrapper>
            </Styled.DelAccWarning>
            <Styled.DelAccHeaderTitle>{t("delAccTitle")}</Styled.DelAccHeaderTitle>
            <div>
                <Styled.DelAccTitleList>
                    <Styled.DelAccTitleListItem>{t("delAccList1")}</Styled.DelAccTitleListItem>
                    <Styled.DelAccTitleListItem>{t("delAccList2")}</Styled.DelAccTitleListItem>
                    <Styled.DelAccTitleListItem>{t("delAccList3")}</Styled.DelAccTitleListItem>
                </Styled.DelAccTitleList>
            </div>
        </>
    );
};

export const AccountManagement: FC = () => {
    const { t } = useTranslation(["settings", "common"]);
    const router = useRouter();
    const { isMobile } = useMainStore((state) => state);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDelAccModalOpen, setIsDelAccModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openDelAccModal = () => setIsDelAccModalOpen(true);
    const closeDelAccModal = () => setIsDelAccModalOpen(false);

    const onLogoutClick = () => {
        const logout = async () => {
            await fetchData("/auth/logout");
        };

        logout().then(() => {
            router.reload();
        });
    };

    const onDeleteAccClick = () => {
        const deleteAccount = async () => {
            await fetchData("/user/delete");
        };

        deleteAccount().then(() => {
            router.reload();
        });
    };

    return (
        <>
            <Styled.SettingsBox>
                <Styled.HeaderWithAction>
                    <Styled.SettingsHeader className="tsHeadline500Medium">
                        {t("accountManagement")}
                    </Styled.SettingsHeader>
                    <Styled.DropdownMenuBtnBox>
                        <Tooltip content={<TooltipMenu onDeleteAccClick={openDelAccModal} />} trigger="click">
                            <Icon icon="dropdown-menu" size={24} viewBox="0 0 24 24" />
                        </Tooltip>
                    </Styled.DropdownMenuBtnBox>
                </Styled.HeaderWithAction>
                <section>
                    <Styled.AccountManagementBtn style="simple" onClick={openModal}>
                        <div className="tsBodyControl400Small">{t("logOut")}</div>
                    </Styled.AccountManagementBtn>
                </section>
            </Styled.SettingsBox>
            <Modal
                isMobile={isMobile}
                isOpen={isModalOpen}
                onClose={closeModal}
                headerTite={t("logOutModalHeader")}
                text={t("logOutModalTitle")}
            >
                <Styled.ModalButtonsBlock>
                    <div>
                        <Button onClick={closeModal} style="outlined" fill={false}>
                            <div className="tsBodyControl500Medium">{t("cancel", { ns: "common" })}</div>
                        </Button>
                    </div>
                    <div>
                        <Button onClick={onLogoutClick} fill={false}>
                            <div className="tsBodyControl500Medium">{t("logOutBtn")}</div>
                        </Button>
                    </div>
                </Styled.ModalButtonsBlock>
            </Modal>

            <Modal
                isMobile={isMobile}
                isOpen={isDelAccModalOpen}
                onClose={closeDelAccModal}
                headerTite={t("accountDeletion")}
                text={<DeleteAccModalBody />}
                wide
            >
                <Styled.ModalButtonsBlock>
                    <div>
                        <Button onClick={closeDelAccModal} style="outlined" fill={false}>
                            <div className="tsBodyControl500Medium">{t("cancel", { ns: "common" })}</div>
                        </Button>
                    </div>
                    <div>
                        <Button onClick={onDeleteAccClick} fill={false}>
                            <div className="tsBodyControl500Medium">{t("continue", { ns: "common" })}</div>
                        </Button>
                    </div>
                </Styled.ModalButtonsBlock>
            </Modal>
        </>
    );
};
