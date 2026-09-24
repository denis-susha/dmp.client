import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";
import { Grid } from "@/components/grid/grid.styles";
import Image from "next/image";
import styled, { css } from "styled-components";

const ItemsColumnContainer = styled(Grid.Column)<{ $isMobile: boolean }>`
    flex-basis: ${(props) =>
        props.$isMobile ? "calc(100% - var(--margin-size-grid))" : "calc(66.6666% - var(--margin-size))"};
    max-width: ${(props) =>
        props.$isMobile ? "calc(100% - var(--margin-size-grid))" : "calc(66.6666% - var(--margin-size))"};
    flex-grow: 0;
    flex-shrink: 0;
    margin-top: ${(props) => (props.$isMobile ? "10px" : "0")};
`;

const OrderColumnContainer = styled(Grid.Column)<{ $isMobile: boolean }>`
    flex-basis: ${(props) =>
        props.$isMobile ? "calc(100% - var(--margin-size-grid))" : "calc(33.3333% - var(--margin-size))"};
    max-width: ${(props) =>
        props.$isMobile ? "calc(100% - var(--margin-size-grid))" : "calc(33.3333% - var(--margin-size))"};
    flex-grow: 0;
    flex-shrink: 0;
    position: relative;
`;

const ControlsContainer = styled.div`
    border-radius: 24px;
    display: flex;
    align-items: center;
    background-color: #fff;
    justify-content: space-between;
    min-height: 48px;
    padding: 0 16px;
    position: relative;
`;

const ControlsActionsContainer = styled.div`
    display: flex;
`;

const Wrapper = styled.div`
    --margin-size: var(--gap);
`;

const ItemsMainContainer = styled.div`
    margin-top: 8px;
    border-top: none;
    border-bottom-left-radius: 24px;
    border-bottom-right-radius: 24px;
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    background-color: #fff;
    padding: 0 16px;
    position: relative;
    padding-top: 16px;
`;

const CartItemRow = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px 0;
`;

const CartItemWrapper = styled.div<{ $isMobile: boolean }>`
    border-bottom: none;
    min-height: 108px;
    padding-bottom: 0;
    background-color: #fff;
    box-sizing: border-box;
    color: #070707;
    display: flex;
    flex-direction: column;
    max-width: ${(props) => (props.$isMobile ? "100%" : "902px")};
    width: 100%;
`;

const CartItemBlock = styled.div`
    border-bottom: none;
    min-height: 108px;
    padding-bottom: 0;
    display: flex;
`;

const CartItemDiv = styled.div`
    flex-grow: 2;
`;

const CartItemGrid = styled.div<{ $isMobile: boolean }>`
    grid-column-gap: 0;
    grid-row-gap: 0;
    display: grid;
    grid-template-areas:
        "checkbox image title price quantity"
        "checkbox image title progressive-text progressive-text";
    grid-template-columns: min-content min-content 3.5fr 2fr min-content;
    grid-template-rows: min-content 1fr;

    ${(props) =>
        props.$isMobile &&
        css`
            @media ${({ theme }) => theme.media.sm} {
                grid-template-areas:
                    "checkbox image price"
                    "checkbox image title"
                    "checkbox quantity quantity";
                grid-template-columns: min-content min-content 3.5fr;
                grid-template-rows: min-content 1fr 0.5fr;
            }

            @media ${({ theme }) => theme.media.xs} {
                grid-template-columns: min-content min-content 120px;
            }
        `};
`;

const CartItemGridCheckbox = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    grid-area: checkbox;
`;

const CartItemCheckboxContainer = styled.div`
    flex-grow: 0;
    align-items: center;
    display: flex;
    justify-content: center;
`;

const CartItemGridElImg = styled.div`
    cursor: pointer;
    grid-area: image;
    padding-left: 12px;
    padding-right: 8px;
    align-items: center;
    display: flex;
    justify-content: center;
`;

const CartItemGridImgContainer = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    flex-shrink: 0;
    height: 92px;
    position: relative;
    width: 92px;
`;

const CartItemGridImg = styled(Image)`
    max-height: 92px;
    max-width: 92px;
`;

const CartItemGridElDescr = styled.div<{ $isMobile: boolean }>`
    grid-area: title;
    max-width: ${(props) => (props.$isMobile ? "100%" : "444px")};
    width: 100%;
`;

const CartItemGridDescrContainer = styled.div<{ $isMobile: boolean }>`
    align-items: flex-start;
    padding-left: ${(props) => (props.$isMobile ? "0.4rem" : "24px")};
    padding-right: 8px;
    display: flex;
    flex-direction: column;
`;

const CartItemGridDescrHr = styled.hr`
    height: 4px;
    border: none;
    margin: 0;
`;

const CartItemGridDescrTitleContainer = styled.div`
    color: rgba(7, 7, 7, 1);
    cursor: pointer;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    word-break: break-word;
`;

const CartItemGridDescrPropertyContainer = styled.div`
    color: rgba(0, 26, 52, 0.6);
    margin: 0;
    -webkit-line-clamp: 1;
    min-height: auto;
    word-break: break-all;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    box-sizing: border-box;
`;

const CartItemGridDescrActionsContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const CartItemGridDescrActions = styled.div`
    margin-top: 12px;
`;

const CartItemGridDescrActionsWrapper = styled.div`
    display: flex;
`;

const CartItemGridDescrActionBtn = styled(Button)<{ $isFavorites?: boolean }>`
    background-color: ${(props) => (props.$isFavorites ? "rgba(255, 121, 140, 0.078)" : "rgba(0, 48, 120, 0.039)")};
    color: ${(props) => (props.$isFavorites ? "rgba(241, 17, 126, 1)" : "rgba(0, 26, 52, 1)")};
    margin-right: 8px;
    height: 32px;
    min-width: 32px;
`;

const CartItemGridDescrActionBtnInner = styled.div<{ $disabled?: boolean }>`
    background-color: ${(props) => (props.$disabled ? "rgba(0, 26, 52, 1)" : "#005bff")};
    border-radius: inherit;
    bottom: 0;
    left: 0;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;

    &:hover {
        ${(props) =>
            !props.$disabled &&
            css`
                opacity: 0.1;
            `};
    }
`;

const CartItemGridDescrActionBtnFavoriteInner = styled(CartItemGridDescrActionBtnInner)<{ $isFavorites: boolean }>`
    background-color: ${(props) => (props.$isFavorites ? "rgba(241, 17, 126, 1)" : "#005bff")};
`;

const CartItemGridElPrice = styled.div`
    grid-area: price;
`;

const CartItemGridPriceContainer = styled.div`
    align-items: flex-start;
    padding-left: 24px;
    padding-right: 8px;
    display: flex;
    flex-direction: column;
`;

const CartItemGridPriceWrapper = styled.div`
    display: flex;
    overflow: hidden;
    position: relative;
    width: 180px;
`;

const CartItemGridPriceDiv = styled.div`
    margin-bottom: 1px;
    overflow: hidden;
    color: #070707;
    display: inline-flex;
    position: relative;
    max-width: 100%;
`;

const CartItemGridPrice = styled.div`
    overflow: hidden;
    display: inline-flex;
    position: relative;
`;

const CartItemGridPriceValue = styled.span`
    line-height: 20px;
    display: inline;
    white-space: nowrap;
`;

const CartItemGridElQty = styled.div<{ $isMobile: boolean }>`
    display: flex;
    grid-area: quantity;
    justify-content: ${(props) => (props.$isMobile ? "center" : "flex-end")};
    align-items: center;
    padding-left: ${(props) => (props.$isMobile ? "0.4rem" : "initial")};
`;

const CartItemGridQtyContainer = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    position: relative;
`;

const CartItemGridQtyActionBtnIcon = styled(Icon)<{ $disabled?: boolean }>`
    color: ${(props) => (props.$disabled ? "rgba(0, 26, 52, 0.4)" : "#005bff")};
`;

const CartItemGridQtyInputContainer = styled.div`
    width: 51px;
`;

const CartItemGridElEmpty = styled.div`
    display: flex;
    flex-direction: column;
    grid-area: progressive-text;
    justify-content: flex-start;
`;

const UnavailableItemsHdr = styled.div`
    display: flex;
    gap: 8px;
`;

const UnavailableItemsHdrWrapper = styled.div`
    background-color: rgba(245, 247, 250, 1);
    border-radius: 12px;
    align-items: center;
    color: #070707;
    display: flex;
    font-size: 14px;
    justify-content: space-between;
    padding: 16px;
    flex-grow: 1;
`;

const UnavailableItemsHdrBox = styled.div`
    justify-content: space-between;
    width: 100%;
    align-items: center;
    display: flex;
    flex-direction: row;
    height: available;
`;

const UnavailableItemsHdrTitleBox = styled.div`
    color: rgba(249, 17, 85, 1);
    margin-bottom: 0;
    margin-right: 24px;
    width: auto;
    align-items: center;
    box-sizing: border-box;
    display: flex;
    word-break: break-word;
`;

const UnavailableItemsHdrDelete = styled.span`
    align-items: center;
    color: #f91155;
    cursor: pointer;
    display: flex;
    font-size: 14px;
    line-height: 20px;
`;

const EmptyCart = styled.div`
    align-items: flex-start;
    display: flex;
    flex-direction: column;
`;

const EmptyCartHdrContainer = styled.div`
    color: rgb(7, 7, 7);
    width: max-content;
    align-items: center;
    box-sizing: border-box;
    display: flex;
    word-break: break-word;
`;

const EmptyCartHdrTitle = styled.span`
    line-height: 32px;
`;

const EmptyCartTextContainer = styled.div`
    color: rgba(0, 26, 52, 0.6);
    text-align: left;
    display: block;
    margin-top: 8px;
    box-sizing: border-box;
    word-break: break-word;
`;

const ModalDeleteItemBtnContainer = styled.div`
    height: 16px;
    display: flex;
    white-space: nowrap;
    width: 100%;
    align-items: center;
    justify-content: center;
`;

const ModalDeleteItemBtnTitle = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
`;

export const Styled = {
    ItemsColumnContainer,
    OrderColumnContainer,
    ControlsContainer,
    ControlsActionsContainer,
    Wrapper,
    ItemsMainContainer,
    CartItemRow,
    CartItemWrapper,
    CartItemBlock,
    CartItemDiv,
    CartItemGrid,
    CartItemGridCheckbox,
    CartItemCheckboxContainer,
    CartItemGridElImg,
    CartItemGridImgContainer,
    CartItemGridImg,
    CartItemGridElDescr,
    CartItemGridDescrContainer,
    CartItemGridDescrHr,
    CartItemGridDescrTitleContainer,
    CartItemGridDescrPropertyContainer,
    CartItemGridDescrActionsContainer,
    CartItemGridDescrActions,
    CartItemGridDescrActionsWrapper,
    CartItemGridDescrActionBtnInner,
    CartItemGridDescrActionBtnFavoriteInner,
    CartItemGridDescrActionBtn,
    CartItemGridElPrice,
    CartItemGridPriceContainer,
    CartItemGridPriceWrapper,
    CartItemGridPriceDiv,
    CartItemGridPrice,
    CartItemGridPriceValue,
    CartItemGridElQty,
    CartItemGridQtyContainer,
    CartItemGridQtyActionBtnIcon,
    CartItemGridQtyInputContainer,
    CartItemGridElEmpty,
    UnavailableItemsHdr,
    UnavailableItemsHdrWrapper,
    UnavailableItemsHdrBox,
    UnavailableItemsHdrTitleBox,
    UnavailableItemsHdrDelete,
    EmptyCart,
    EmptyCartHdrContainer,
    EmptyCartHdrTitle,
    EmptyCartTextContainer,
    ModalDeleteItemBtnContainer,
    ModalDeleteItemBtnTitle,
};
