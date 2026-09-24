import { FC, RefObject, useCallback } from "react";
import Icon from "@/components/common/Icon";
import { useMainStore } from "@/contexts/mainStoreProvider";
import { Styled } from "./catalogBtn.styles";
import { useTranslation } from "next-i18next/pages";

interface Props {
    btnRef: RefObject<HTMLDivElement | null>;
}

const CatalogBtn: FC<Props> = ({ btnRef }) => {
    const { t } = useTranslation(["common"]);
    const { menuIsOpen, toggleMenu } = useMainStore((state) => state);

    const handleClick = useCallback(() => {
        toggleMenu();
    }, [toggleMenu]);

    return (
        <Styled.Container ref={btnRef} onClick={handleClick}>
            <Styled.Button>
                <Styled.BtnContent $menuIsOpen={menuIsOpen}>
                    <Icon width={24} height={24} icon={"button-close"} isLazy={true} className={"button-close"} />
                    <Icon width={24} height={24} icon={"menu-catalog"} isLazy={false} className={"menu-catalog"} />
                    <Styled.BtnContentTitle>{t("catalog")}</Styled.BtnContentTitle>
                </Styled.BtnContent>
                <Styled.BtnBg />
            </Styled.Button>
        </Styled.Container>
    );
};

export default CatalogBtn;
