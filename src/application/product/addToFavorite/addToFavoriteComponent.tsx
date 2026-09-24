import { FC, useCallback, useMemo } from "react";
import { Styled } from "./styles";
import Icon from "@/components/common/Icon";
import { useLocalStorage } from "@/hooks";
import { useMainStore } from "@/contexts/mainStoreProvider";

export const AddToFavoriteComponent: FC<{ productId: number }> = ({ productId }) => {
    const [favorites, setFavorites] = useLocalStorage<number[] | null>("favorites", null);
    const { isMobile } = useMainStore((state) => state);

    const onFavoritesClick = useCallback(() => {
        if (favorites && favorites.includes(productId)) {
            setFavorites(favorites?.filter((p) => p !== productId));
        } else {
            setFavorites([...(favorites ?? []), productId]);
        }
    }, [favorites, productId, setFavorites]);

    const isFavorites = useMemo(() => {
        return !!favorites && favorites.includes(productId);
    }, [favorites, productId]);

    return (
        <Styled.AddToFavorite>
            <Styled.AddToFavoriteBtn onClick={onFavoritesClick} $isFavorite={isFavorites} $isMobile={isMobile}>
                <Icon size={isMobile ? 16 : 24} viewBox="0 0 24 24" icon="favorite-heart" isLazy={false} />
                <Styled.AddToFavoriteBackground $isMobile={isMobile} />
            </Styled.AddToFavoriteBtn>
        </Styled.AddToFavorite>
    );
};
