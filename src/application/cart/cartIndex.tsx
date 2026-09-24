import { useCallback, type FC } from "react";
import { useTranslation } from "next-i18next/pages";
import { Grid } from "@/components/grid/grid.styles";
import { Styled } from "./cartIndex.styles";
import Button from "@/components/common/Button";
import Checkbox from "@/components/common/Checkbox";
import { CartItem } from "./cartItem";
import { CartOrder } from "./order/cartOrder";
import { ICartItemSelection } from "@/services/models/cart/cartItemSelection";
import Spinner from "@/components/common/Spinner";
import { CartEmpty } from "./cartEmpty";
import { useCartStore } from "./stores/cartStoreProvider";
import { Recommendations } from "./recommendations/recommendations";
import { useRouter } from "next/router";
import { useMainStore } from "@/contexts/mainStoreProvider";
import { useLocalStorage } from "@/hooks";

export const CartIndex: FC = () => {
    const { t } = useTranslation(["cart"]);
    const router = useRouter();
    const { isMobile } = useMainStore((state) => state);
    const { cartData, isAllSelected, updCartInProgress, selectCartItems, removeItems } = useCartStore((state) => state);
    const [favorites, setFavorites] = useLocalStorage<number[] | null>("favorites", null);
    const anySelected = cartData.items && cartData.items.findIndex((i) => i.selected) !== -1;

    const isFavorites = useCallback(
        (productId: number) => {
            return !!favorites && favorites.includes(productId);
        },
        [favorites]
    );

    const onFavoritesClick = useCallback(
        (productId: number) => {
            if (favorites && favorites.includes(productId)) {
                setFavorites(favorites?.filter((p) => p !== productId));
            } else {
                setFavorites([...(favorites ?? []), productId]);
            }
        },
        [favorites, setFavorites]
    );

    const selectAll = (checked: boolean) => {
        const selection: ICartItemSelection[] = [];
        cartData.items?.forEach((item) => {
            selection.push({ productId: item.productId, selected: checked });
        });

        selectCartItems(selection);
    };

    const removeSelected = () => {
        const ids = cartData.items?.filter((item) => item.selected).map((item) => item.productId);
        if (ids) {
            removeItems(ids);
        }
    };

    const onRemoveUnavailablesClick = () => {
        const ids = cartData.unavailableItems?.filter((item) => item.selected).map((item) => item.productId);
        if (ids) {
            removeItems(ids);
        }
    };

    const onGoCheckoutClick = () => {
        if (cartData.totalQuantity === 0) {
            return;
        }

        router.push("/gocheckout");
    };

    return (
        <>
            <Grid.Container $isMobile={isMobile}>
                <Grid.Row>
                    <Styled.ItemsColumnContainer $isMobile={isMobile}>
                        <Grid.Row>
                            <Grid.Column>
                                {cartData.items &&
                                cartData.items.length < 1 &&
                                cartData.unavailableItems &&
                                cartData.unavailableItems.length < 1 ? (
                                    <CartEmpty />
                                ) : (
                                    <>
                                        <Styled.ControlsContainer>
                                            <Styled.ControlsActionsContainer>
                                                <Checkbox
                                                    label={t("selectAll")}
                                                    checked={isAllSelected}
                                                    onChange={selectAll}
                                                    labelClassName="mr-[10px]"
                                                />
                                                {anySelected && (
                                                    <Button
                                                        style="simple"
                                                        className="flex [&&]:text-[14px] leading-[20px] mr-0 [&&]:text-[rgb(249,17,85)]"
                                                    >
                                                        <div
                                                            className="overflow-hidden text-ellipsis tsBodyControl400Small"
                                                            onClick={removeSelected}
                                                        >
                                                            {t("deleteSelected")}
                                                        </div>
                                                    </Button>
                                                )}
                                            </Styled.ControlsActionsContainer>
                                        </Styled.ControlsContainer>
                                        <Styled.Wrapper>
                                            <Styled.Wrapper>
                                                <Styled.ItemsMainContainer>
                                                    {cartData.items?.map((item, i) => (
                                                        <CartItem
                                                            key={i}
                                                            item={item}
                                                            isUnavailable={false}
                                                            isFavorites={isFavorites(item.productId)}
                                                            onFavoritesClick={onFavoritesClick}
                                                        />
                                                    ))}
                                                </Styled.ItemsMainContainer>
                                                {cartData.unavailableItems && cartData.unavailableItems.length > 0 && (
                                                    <Styled.ItemsMainContainer>
                                                        <Styled.UnavailableItemsHdr>
                                                            <Styled.UnavailableItemsHdrWrapper>
                                                                <Styled.UnavailableItemsHdrBox>
                                                                    <Styled.UnavailableItemsHdrTitleBox>
                                                                        <span className="tsBodyControl500Medium">
                                                                            {"notAvailable"}
                                                                        </span>
                                                                    </Styled.UnavailableItemsHdrTitleBox>
                                                                    <Styled.UnavailableItemsHdrDelete
                                                                        onClick={onRemoveUnavailablesClick}
                                                                    >
                                                                        {t("delete")}
                                                                    </Styled.UnavailableItemsHdrDelete>
                                                                </Styled.UnavailableItemsHdrBox>
                                                            </Styled.UnavailableItemsHdrWrapper>
                                                        </Styled.UnavailableItemsHdr>
                                                        {cartData.unavailableItems.map((item, i) => (
                                                            <CartItem
                                                                key={i}
                                                                item={item}
                                                                isUnavailable={true}
                                                                isFavorites={isFavorites(item.productId)}
                                                                onFavoritesClick={onFavoritesClick}
                                                            />
                                                        ))}
                                                    </Styled.ItemsMainContainer>
                                                )}
                                            </Styled.Wrapper>
                                        </Styled.Wrapper>
                                    </>
                                )}
                            </Grid.Column>
                        </Grid.Row>
                    </Styled.ItemsColumnContainer>
                    {cartData.items && cartData.items.length > 0 && (
                        <Styled.OrderColumnContainer $isMobile={isMobile}>
                            {updCartInProgress && <Spinner />}
                            <CartOrder isOrder={false} cartData={cartData} onBtnClick={onGoCheckoutClick} />
                        </Styled.OrderColumnContainer>
                    )}
                </Grid.Row>
            </Grid.Container>
            {isMobile && <Grid.Separator $height={10} />}
            <Recommendations />
        </>
    );
};
