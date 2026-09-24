import Button from "@/components/common/Button";
import { Grid } from "@/components/grid/grid.styles";
import styled from "styled-components";

const MobileFilterBtnColumn = styled(Grid.Column)`
    justify-content: center;
    max-width: 50px;
`;

const MobileFiltersBtn = styled(Button)`
    border-radius: 16px;
`;

const MobileFiltersBtnInner = styled.span`
    border-radius: 16px;
    padding: 4px;
    min-width: auto;
    background-color: #f2f5f9;
    color: #001a34;
    font-weight: 400;
    align-items: center;
    box-sizing: border-box;
    display: inline-flex;
    font-size: 14px;
    height: inherit;
    justify-content: center;
    line-height: 18px;
    min-height: 32px;
    text-align: center;
    transition:
        color 0.15s ease-in-out,
        background 0.15s ease-in-out,
        opacity 0.3s ease-in-out;
`;

const MobileFiltersBtnContent = styled.div`
    align-items: center;
    display: flex;
    padding: 0 8px;
`;

const ModalBtnsBox = styled.div`
    background: #fff;
    bottom: 0;
    box-sizing: border-box;
    left: 0;
    padding: 8px 16px;
    position: fixed;
    width: 100%;
    z-index: 100;
`;

export const Styled = {
    MobileFiltersBtn,
    MobileFiltersBtnInner,
    MobileFiltersBtnContent,
    MobileFilterBtnColumn,
    ModalBtnsBox,
};
