import { FC } from "react";
import { Styled } from "./layout.styles";
import { Grid } from "@/components/grid/grid.styles";

interface ILayoutContainerProps extends React.PropsWithChildren {
    innerWallpaper?: boolean;
    bgColor?: string;
}

export const LayoutContainer: FC<ILayoutContainerProps> = ({ children, innerWallpaper, bgColor }) => {
    return (
        <Styled.LayoutContainer>
            {innerWallpaper ? <Grid.Wallpaper $bgColor={bgColor}>{children}</Grid.Wallpaper> : <>{children}</>}
        </Styled.LayoutContainer>
    );
};
