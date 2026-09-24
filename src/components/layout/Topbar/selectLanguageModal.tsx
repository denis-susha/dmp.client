import { FC, useEffect, useMemo, useState } from "react";
import useModalData from "@/components/common/Modal/useModalData";
import Button from "@/components/common/Button";
import { DropdownList, IDropdownListOption } from "@/components/common/DropdownList";
import { useTranslation } from "next-i18next/pages";
import Modal from "@/components/common/Modal/modal";
import { appConfig } from "@/appConfig";
import { useRouter } from "next/router";
import { useAppNotificationStore } from "@/components/common/Notification/stores/appNotificationStoreProvider";

export interface ILanguageOption {
    code: string;
    displayName: string;
}

export interface ISelectLanguage {
    header: string;
    title: string;
    buttonText: string;
    languageOptions: ILanguageOption[];
}

interface Props {
    isMobile: boolean;
    onClose: () => void;
}

const SelectLanguageModal: FC<Props> = ({ isMobile, onClose }) => {
    const { t, i18n } = useTranslation(["common"]);
    const router = useRouter();
    const { addNotification } = useAppNotificationStore((state) => state);
    const { data, isLoading, error } = useModalData<ISelectLanguage>("selectLanguage");
    const [modalData, setModalData] = useState<ISelectLanguage | null>(null);
    const [selectedOption, setSelectedOption] = useState(i18n.language);

    useEffect(() => {
        if (data) {
            setModalData(data);
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            addNotification(t("errors.common", { ns: "common" }), "error");
        }
    }, [addNotification, error, t]);

    const options = useMemo(() => {
        return (
            modalData?.languageOptions.map((o) => {
                return { value: o.code, label: o.displayName } as IDropdownListOption;
            }) ?? []
        );
    }, [modalData]);

    const handleSelect = (value: string) => {
        setSelectedOption(value);
    };

    const setCookie = (locale: string) => {
        const date = new Date();
        date.setTime(date.getTime() + 60 * 24 * 60 * 60 * 1000);
        const expires = "expires=" + date.toUTCString();
        const cookie = `NEXT_LOCALE=${locale};domain=${appConfig.apiHost
            ?.replace(/^https?:\/\//, ".")
            .replace(/:\d+/, "")};${expires};path=/;samesite=Lax`;
        console.log(cookie);
        document.cookie = cookie;
    };

    const onSaveClick = () => {
        setCookie(selectedOption);
        onClose();
        const { pathname, query, asPath } = router;
        router.replace({ pathname, query }, asPath, { locale: selectedOption });
    };

    return (
        <Modal
            isMobile={isMobile}
            headerTite={modalData?.header}
            text={modalData?.title}
            isOpen={true}
            isLoading={isLoading}
            onClose={onClose}
        >
            <div className="flex flex-col">
                <div className="mb-[32px]">
                    <DropdownList options={options} value={selectedOption} onSelect={handleSelect} />
                </div>
                <div>
                    <Button onClick={onSaveClick} size="small" fill={false}>
                        {modalData?.buttonText}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default SelectLanguageModal;
