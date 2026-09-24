import { useState, type FC } from "react";
import { useTranslation } from "next-i18next/pages";
import { Styled } from "../styles";
import { Styled as MStyled } from "./styles";
import { IMenuCategoryData } from "@/services/models/catalog/menuCategoryData";
import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";
import Modal from "@/components/common/Modal/modal";
import { CategoryFilters } from "../filters/categoryFilters";

export interface IMobileFiltersProps {
    categoryData: IMenuCategoryData;
}

export const MobileFilters: FC<IMobileFiltersProps> = (props) => {
    const { categoryData } = props;
    const { t } = useTranslation(["category-data", "common"]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <MStyled.MobileFilterBtnColumn>
                <MStyled.MobileFiltersBtn style="icon" fill={false} onClick={openModal}>
                    <MStyled.MobileFiltersBtnInner>
                        <MStyled.MobileFiltersBtnContent>
                            <Icon icon="filters" size={16} />
                        </MStyled.MobileFiltersBtnContent>
                    </MStyled.MobileFiltersBtnInner>
                </MStyled.MobileFiltersBtn>
            </MStyled.MobileFilterBtnColumn>
            <Modal
                isMobile
                isOpen={isModalOpen}
                onClose={closeModal}
                headerTite={t("filters")}
                text={
                    <Styled.FiltersColumn>
                        <CategoryFilters categoryData={categoryData} />
                    </Styled.FiltersColumn>
                }
                wide
            >
                <MStyled.ModalBtnsBox>
                    <div>
                        <Button onClick={closeModal}>
                            <div className="tsBodyControl500Medium">{t("close", { ns: "common" })}</div>
                        </Button>
                    </div>
                </MStyled.ModalBtnsBox>
            </Modal>
        </>
    );
};
