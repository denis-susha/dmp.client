import { FC } from "react";
import { Styled } from "./footer.styles";
import { useTranslation } from "next-i18next/pages";
import { usePathname } from "next/navigation";

const year = new Date().getFullYear();

const Footer: FC = () => {
    const { t } = useTranslation(["common"]);
    const pathname = usePathname();

    const isSelf = pathname.replace("/", "").trim().length > 0;

    return (
        <Styled.Footer>
            <div className="box-border mx-auto max-w-[1472px] p-10 w-full">
                <div className="flex">
                    <div className="flex flex-col justify-between w-full">
                        <Styled.Legend>
                            <Styled.Column>
                                <Styled.HeaderTitle className="tsBodyControl500Medium">
                                    {t("footer.marketplace")}
                                </Styled.HeaderTitle>
                                <Styled.StyledLink target={isSelf ? "_self" : "_blank"} href={"/category"}>
                                    {t("catalog")}
                                </Styled.StyledLink>
                                <Styled.StyledLink target={isSelf ? "_self" : "_blank"} href={"/blog"}>
                                    {t("footer.blog")}
                                </Styled.StyledLink>
                            </Styled.Column>
                            <Styled.Column>
                                <Styled.HeaderTitle className="tsBodyControl500Medium">
                                    {t("footer.earn")}
                                </Styled.HeaderTitle>
                                <Styled.StyledLink target={isSelf ? "_self" : "_blank"} href={"/seller"}>
                                    {t("becomeSeller")}
                                </Styled.StyledLink>
                            </Styled.Column>
                            <Styled.Column>
                                <Styled.HeaderTitle className="tsBodyControl500Medium">
                                    {t("footer.help")}
                                </Styled.HeaderTitle>
                                <Styled.StyledLink target={isSelf ? "_self" : "_blank"} href={"/help#how-to-order"}>
                                    {t("footer.howToOrder")}
                                </Styled.StyledLink>
                                <Styled.StyledLink target={isSelf ? "_self" : "_blank"} href={"/help#payment-methods"}>
                                    {t("footer.paymentMethods")}
                                </Styled.StyledLink>
                                <Styled.StyledLink
                                    target={isSelf ? "_self" : "_blank"}
                                    href={"/help#payment-cryptocurrency"}
                                >
                                    {t("footer.cryptocurrency")}
                                </Styled.StyledLink>
                                <Styled.StyledLink target={isSelf ? "_self" : "_blank"} href={"/help#receipt-product"}>
                                    {t("footer.receiptProducts")}
                                </Styled.StyledLink>
                                <Styled.StyledLink target={isSelf ? "_self" : "_blank"} href={"/help#refund"}>
                                    {t("footer.refund")}
                                </Styled.StyledLink>
                            </Styled.Column>
                        </Styled.Legend>
                        <div className="flex items-end justify-end">
                            <div>
                                <div className="text-[rgba(0,26,52,0.6)] text-[12px] leading-[16px] mb-4 mt-6 max-w-[272px] block mx-0 my-2">
                                    <div className="text-[rgba(0,26,52,0.6)] items-center box-border flex w-full wrap-break-word">
                                        <span className="tracking-[0.2px] leading-[22px] text-sm">
                                            {`© ${year} Filezon, LLC`}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Styled.Footer>
    );
};

export default Footer;
