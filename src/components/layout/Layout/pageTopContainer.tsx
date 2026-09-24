import { FC } from "react";
import { Grid } from "@/components/grid/grid.styles";

interface IPageTopContainerProps extends React.PropsWithChildren {
    innerWallpaper?: boolean;
    bgColor?: string;
}

export const PageTopContainer: FC<IPageTopContainerProps> = ({ children, innerWallpaper, bgColor = "#ffffff" }) => {
    return <>{innerWallpaper ? <Grid.Wallpaper $bgColor={bgColor}>{children}</Grid.Wallpaper> : <>{children}</>}</>;
};
