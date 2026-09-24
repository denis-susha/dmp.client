import { useCallback, useEffect, useRef, useState, type FC } from "react";
import { useTranslation } from "next-i18next/pages";
import { Styled } from "./cartIndex.styles";
import Checkbox from "@/components/common/Checkbox";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { twMerge } from "tailwind-merge";
import { ICartItemSelection } from "@/services/models/cart/cartItemSelection";
import { appConfig } from "@/appConfig";
import Modal from "@/components/common/Modal/modal";
import { Constants } from "../constants";
import { ICartItem } from "@/services/models/cart/cartItem";
import { useCartStore } from "./stores/cartStoreProvider";
import { useAppNotificationStore } from "@/components/common/Notification/stores/appNotificationStoreProvider";
import Link from "next/link";
import { useMainStore } from "@/contexts/mainStoreProvider";
import Icon from "@/components/common/Icon";

const maxQty = 2000;

export interface CartItemProps {
    item: ICartItem;
    isUnavailable: boolean;
    isFavorites: boolean;
    onFavoritesClick: (productId: number) => void;
}

export const CartItem: FC<CartItemProps> = (props) => {
    const { t } = useTranslation(["cart", "common"]);
    const { selectCartItems, removeItems, updateItem, setItemQty, error } = useCartStore((state) => state);
    const { isMobile } = useMainStore((state) => state);
    const { addNotification } = useAppNotificationStore((state) => state);
    const { item, isUnavailable, isFavorites, onFavoritesClick } = props;

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [plusQtyDisabled, setPlusQtyDisabled] = useState(false);
    const [minusQtyDisabled, setMinusQtyDisabled] = useState(false);

    const [isDeleteItemModalOpen, setIsDeleteItemModalOpen] = useState(false);

    const openDeleteItemModal = () => setIsDeleteItemModalOpen(true);
    const closeDeleteItemModal = () => setIsDeleteItemModalOpen(false);

    useEffect(() => {
        if (item.quantity && item.quantity >= maxQty) {
            setPlusQtyDisabled(true);
        } else {
            setPlusQtyDisabled(false);
        }

        if (!item.quantity || item.quantity <= 1) {
            setMinusQtyDisabled(true);
        } else {
            setMinusQtyDisabled(false);
        }
    }, [item.quantity]);

    useEffect(() => {
        if (error) {
            addNotification(t("errors.common", { ns: "common" }), "error");
        }
    }, [addNotification, error, t]);

    const select = (checked: boolean) => {
        const selection: ICartItemSelection[] = [];
        selection.push({ productId: item.productId, selected: checked });

        selectCartItems(selection);
    };

    const onDeleteItem = () => {
        closeDeleteItemModal();
        const ids: number[] = [];
        ids.push(item.productId);

        removeItems(ids);
    };

    const onQuantityChange = (value: string) => {
        const val = Math.round(Number(value));
        setItemQty(item.productId, val === 0 ? null : val);
    };

    const onQuantityBlur = () => {
        let value = item.quantity;
        if (!value) {
            value = 1;
            setItemQty(item.productId, value);
        }
        if (value && value > 0 && value <= maxQty) {
            updateItem(item.productId, value);
        }
    };

    const handleQtyClick = useCallback(
        (val: number) => {
            const newQty = (item.quantity ?? 0) + val;
            setItemQty(item.productId, newQty);

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                updateItem(item.productId, newQty);
            }, 1000);
        },
        [item.productId, item.quantity, setItemQty, updateItem]
    );

    const linkToProduct = `/product/${item.slug}-${item.productId}`;
    const previewLink =
        appConfig.imagesHost +
        (item.imgLink ? `/images/product/${item.productId}/original/${item.imgLink}` : Constants.noImagePath);

    const onGoToProductClick = () => {
        window.open(linkToProduct);
        return;
    };

    const enabledQtyBtnClass = "[&&]:bg-[rgba(0,150,255,.078)] [&&]:text-[#005bff]";
    const disabledQtyBtnClass = "[&&]:bg-[rgba(0,48,120,.039)] [&&]:text-[rgba(0,26,52,.4)]";

    return (
        <Styled.CartItemRow>
            <Styled.CartItemWrapper $isMobile={isMobile}>
                <Styled.CartItemBlock>
                    <Styled.CartItemDiv>
                        <Styled.CartItemGrid $isMobile={isMobile}>
                            <Styled.CartItemGridCheckbox>
                                <Styled.CartItemCheckboxContainer>
                                    <Checkbox
                                        disabled={isUnavailable}
                                        checked={isUnavailable ? false : item.selected}
                                        onChange={isUnavailable ? undefined : select}
                                    />
                                </Styled.CartItemCheckboxContainer>
                            </Styled.CartItemGridCheckbox>
                            <Styled.CartItemGridElImg>
                                <Link target="_blank" href={linkToProduct}>
                                    <Styled.CartItemGridImgContainer>
                                        <Styled.CartItemGridImg
                                            loading="lazy"
                                            fill
                                            src={previewLink}
                                            alt="Product Image"
                                        />
                                    </Styled.CartItemGridImgContainer>
                                </Link>
                            </Styled.CartItemGridElImg>
                            <Styled.CartItemGridElDescr $isMobile={isMobile}>
                                <Styled.CartItemGridDescrContainer $isMobile={isMobile}>
                                    <div>
                                        <Styled.CartItemGridDescrHr />
                                        <div>
                                            <Styled.CartItemGridDescrTitleContainer onClick={onGoToProductClick}>
                                                <span className="tsBodyM">{item.name}</span>
                                            </Styled.CartItemGridDescrTitleContainer>
                                        </div>
                                        <Styled.CartItemGridDescrHr />
                                        <Styled.CartItemGridDescrPropertyContainer>
                                            <span className="tsBody400Small">{item.featuresValues}</span>
                                        </Styled.CartItemGridDescrPropertyContainer>
                                    </div>
                                    <Styled.CartItemGridDescrActionsContainer>
                                        <Styled.CartItemGridDescrActions>
                                            <Styled.CartItemGridDescrActionsWrapper>
                                                <Styled.CartItemGridDescrActionBtn
                                                    style="icon"
                                                    size="small"
                                                    $isFavorites={isFavorites}
                                                    onClick={() => onFavoritesClick(item.productId)}
                                                >
                                                    <Icon icon="favorite-heart-filled" size={16} />
                                                    <Styled.CartItemGridDescrActionBtnFavoriteInner
                                                        $isFavorites={isFavorites}
                                                    />
                                                </Styled.CartItemGridDescrActionBtn>
                                                <Styled.CartItemGridDescrActionBtn
                                                    onClick={openDeleteItemModal}
                                                    style="icon"
                                                    size="small"
                                                >
                                                    <Icon icon="waste-basket-filled" size={16} />
                                                    <Styled.CartItemGridDescrActionBtnInner />
                                                </Styled.CartItemGridDescrActionBtn>
                                            </Styled.CartItemGridDescrActionsWrapper>
                                        </Styled.CartItemGridDescrActions>
                                    </Styled.CartItemGridDescrActionsContainer>
                                </Styled.CartItemGridDescrContainer>
                            </Styled.CartItemGridElDescr>
                            {!isUnavailable && (
                                <>
                                    <Styled.CartItemGridElPrice>
                                        <Styled.CartItemGridPriceContainer>
                                            <Styled.CartItemGridPriceWrapper>
                                                <Styled.CartItemGridPriceDiv>
                                                    <Styled.CartItemGridPrice>
                                                        <Styled.CartItemGridPriceValue className="tsHeadline400Small">
                                                            {`${item.price} USD`}
                                                        </Styled.CartItemGridPriceValue>
                                                    </Styled.CartItemGridPrice>
                                                </Styled.CartItemGridPriceDiv>
                                            </Styled.CartItemGridPriceWrapper>
                                        </Styled.CartItemGridPriceContainer>
                                    </Styled.CartItemGridElPrice>
                                    <Styled.CartItemGridElQty $isMobile={isMobile}>
                                        <div>
                                            <Styled.CartItemGridQtyContainer>
                                                <Button
                                                    onClick={() => handleQtyClick(-1)}
                                                    disabled={minusQtyDisabled}
                                                    style="icon"
                                                    size="small"
                                                    className={twMerge(
                                                        minusQtyDisabled ? disabledQtyBtnClass : enabledQtyBtnClass,
                                                        "[&&]:mr-[8px] [&&]:h-[32px] [&&]:min-w-[32px]"
                                                    )}
                                                >
                                                    <Styled.CartItemGridQtyActionBtnIcon
                                                        $disabled={minusQtyDisabled}
                                                        icon="minus-qty-cart"
                                                        size={24}
                                                    />
                                                    <Styled.CartItemGridDescrActionBtnInner $disabled={true} />
                                                </Button>
                                                <Styled.CartItemGridQtyInputContainer>
                                                    <Input
                                                        label=""
                                                        name="quantity"
                                                        type="number"
                                                        inputMode="numeric"
                                                        maxLength={4}
                                                        inputValue={item.quantity ?? ""}
                                                        onChange={onQuantityChange}
                                                        onBlur={onQuantityBlur}
                                                        onEnterDown={onQuantityBlur}
                                                        canClear={false}
                                                        inputClassName="[&&]:p-[5px_10px] [&&]:text-center [&&]:text-[14px] [&&]:leading-[18px]"
                                                        containerClassName="[&&]:m-0"
                                                        min={1}
                                                        max={maxQty}
                                                        pattern="[0-9]*"
                                                    />
                                                </Styled.CartItemGridQtyInputContainer>
                                                <Button
                                                    onClick={() => handleQtyClick(1)}
                                                    disabled={plusQtyDisabled}
                                                    style="icon"
                                                    size="small"
                                                    className={twMerge(
                                                        plusQtyDisabled ? disabledQtyBtnClass : enabledQtyBtnClass,
                                                        "[&&]:ml-[8px] [&&]:h-[32px] [&&]:min-w-[32px]"
                                                    )}
                                                >
                                                    <Styled.CartItemGridQtyActionBtnIcon
                                                        $disabled={plusQtyDisabled}
                                                        icon="plus-qty-cart"
                                                        size={24}
                                                    />
                                                    <Styled.CartItemGridDescrActionBtnInner
                                                        $disabled={plusQtyDisabled}
                                                    />
                                                </Button>
                                            </Styled.CartItemGridQtyContainer>
                                        </div>
                                    </Styled.CartItemGridElQty>
                                </>
                            )}
                            <Styled.CartItemGridElEmpty />
                        </Styled.CartItemGrid>
                    </Styled.CartItemDiv>
                </Styled.CartItemBlock>
            </Styled.CartItemWrapper>
            <Modal
                isMobile={isMobile}
                isOpen={isDeleteItemModalOpen}
                onClose={closeDeleteItemModal}
                headerTite={t("deleteModal.header")}
                text={t("deleteModal.title")}
            >
                <>
                    <Button onClick={onDeleteItem} size="small" fill={false}>
                        <Styled.ModalDeleteItemBtnContainer>
                            <Styled.ModalDeleteItemBtnTitle className="tsBodyControl400Small">
                                {t("deleteModal.button")}
                            </Styled.ModalDeleteItemBtnTitle>
                        </Styled.ModalDeleteItemBtnContainer>
                    </Button>
                </>
            </Modal>
        </Styled.CartItemRow>
    );
};
