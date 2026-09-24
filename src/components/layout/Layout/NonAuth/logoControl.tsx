import { FC } from "react";
import { Styled } from "./nonAuthPageLayout.styles";
import { appConfig } from "@/appConfig";
import Link from "next/link";

export const LogoControl: FC = () => {
    return (
        <Styled.LogoContainer>
            <Link href={"/"}>
                <Styled.LogoImg
                    loading="lazy"
                    width={130}
                    height={30}
                    priority={false}
                    src={`${appConfig.imagesHost}/static/logo_color.png`}
                    alt="Filezon"
                />
            </Link>
        </Styled.LogoContainer>
    );
};
