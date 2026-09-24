import { useCallback, useEffect, useState, type FC } from "react";
import { useTranslation } from "next-i18next/pages";
import { Styled } from "./userSettings.styles";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal/modal";
import { useUserSettingsStore } from "./stores/userSettingsStoreProvider";
import Input from "@/components/common/Input";
import { RegExps } from "../constants";
import { useRouter } from "next/router";
import { useAppNotificationStore } from "@/components/common/Notification/stores/appNotificationStoreProvider";
import { useMainStore } from "@/contexts/mainStoreProvider";

export const UserProfileControl: FC = () => {
    const { t } = useTranslation(["settings", "common"]);
    const router = useRouter();
    const { isMobile } = useMainStore((state) => state);
    const { addNotification } = useAppNotificationStore((state) => state);
    const { userProfile, sendUserProfileSettings, error } = useUserSettingsStore((state) => state);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isNicknameError, setIsNicknameError] = useState(false);
    const [nicknameErrorTxt, setNicknameErrorTxt] = useState("");
    const [tempNickname, setTempNickname] = useState("");

    const openModal = () => {
        setTempNickname(userProfile.nickname);
        setIsModalOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        if (error) {
            addNotification(t("errors.common", { ns: "common" }), "error");
        }
    }, [addNotification, error, t]);

    const validateNickname = useCallback(
        (value: string): boolean => {
            if (!RegExps.isValidNickname.test(value)) {
                setNicknameErrorTxt(t("invalidNickname"));
                return true;
            }

            return false;
        },
        [t]
    );

    const validateForm = useCallback(() => {
        const tempNicknameHasError = validateNickname(tempNickname);
        setIsNicknameError(tempNicknameHasError);

        const formIsValid = !tempNicknameHasError;

        return formIsValid;
    }, [validateNickname, tempNickname]);

    const onNicknameFocus = () => {
        setIsNicknameError(false);
    };

    const onSaveClick = useCallback(() => {
        if (validateForm()) {
            closeModal();
            sendUserProfileSettings({ nickname: tempNickname.trim() });
            router.reload();
        }
    }, [router, sendUserProfileSettings, tempNickname, validateForm]);

    return (
        <>
            <Styled.UserProfileContainer $isMobile={isMobile}>
                <Styled.AvatarBox $isMobile={isMobile}>
                    <div>
                        <Styled.Avatar icon={"user"} size={isMobile ? 42 : 62} viewBox="0 0 24 24" />
                    </div>
                </Styled.AvatarBox>
                <div>
                    <Styled.NameBox>{userProfile.nickname}</Styled.NameBox>
                    <Styled.ChangeBtnBox>
                        <Button style="simple" onClick={openModal}>
                            <div className="tsBodyControl400Small">{t("change", { ns: "common" })}</div>
                        </Button>
                    </Styled.ChangeBtnBox>
                </div>
            </Styled.UserProfileContainer>
            <Modal
                isMobile={isMobile}
                isOpen={isModalOpen}
                onClose={closeModal}
                headerTite={t("changeData")}
                text={
                    <Styled.ModalFieldsBox>
                        <Input
                            label={t("nickname")}
                            name="nickname"
                            type="text"
                            inputValue={tempNickname}
                            onChange={setTempNickname}
                            autoFocus
                            isError={isNicknameError}
                            errorText={nicknameErrorTxt}
                            onFocus={onNicknameFocus}
                            maxLength={200}
                            autoComplete="off"
                        />
                    </Styled.ModalFieldsBox>
                }
            >
                <Styled.ModalButtonsBlock>
                    <div>
                        <Button onClick={closeModal} style="outlined" fill={false}>
                            <div className="tsBodyControl500Medium">{t("cancel", { ns: "common" })}</div>
                        </Button>
                    </div>
                    <div>
                        <Button onClick={onSaveClick} fill={false}>
                            <div className="tsBodyControl500Medium">{t("save", { ns: "common" })}</div>
                        </Button>
                    </div>
                </Styled.ModalButtonsBlock>
            </Modal>
        </>
    );
};
