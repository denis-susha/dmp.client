import { FC } from "react";
import { Styled } from "./nonAuthPageLayout.styles";

interface INonAuthPageLayoutProps extends React.PropsWithChildren {
    isMobile: boolean;
}

export const NonAuthPageLayout: FC<INonAuthPageLayoutProps> = ({ isMobile, children }) => {
    return (
        <Styled.Layout $isMobile={isMobile}>
            <Styled.Container>
                <Styled.ContainerBg>
                    <Styled.FormColumn $isMobile={isMobile}>{children}</Styled.FormColumn>
                </Styled.ContainerBg>
            </Styled.Container>
        </Styled.Layout>
    );
};
