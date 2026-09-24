import SimpleFooter from "@/components/layout/Footer/simpleFooter";
import { FC, useState } from "react";
import { Styled } from "./seller.styles";
import Image from "next/image";
import { appConfig } from "@/appConfig";
import Accordion from "@/components/common/Accordion";
import { useTranslation } from "next-i18next/pages";

const Tab = (props: { title: string; isActive: boolean; onClick: () => void }) => {
    return (
        <Styled.TabHeaderBox $isActive={props.isActive}>
            <Styled.TabHeader $isActive={props.isActive} onClick={props.onClick}>
                <span className="tsHeadline550Medium">{props.title}</span>
            </Styled.TabHeader>
        </Styled.TabHeaderBox>
    );
};

const OpportunitiesItem = (props: { header: string; title: string; image: string; alt: string }) => {
    return (
        <Styled.OpportunitiesItem>
            <Styled.OpportunitiesItemImage>
                <Image width={150} height={150} src={`${appConfig.staticUrl}${props.image}`} alt={props.alt} />
            </Styled.OpportunitiesItemImage>
            <Styled.OpportunitiesItemText>
                <Styled.OpportunitiesItemTextHdr>
                    <span>{props.header}</span>
                </Styled.OpportunitiesItemTextHdr>
                <Styled.OpportunitiesItemTextTitle>
                    <span>{props.title}</span>
                </Styled.OpportunitiesItemTextTitle>
            </Styled.OpportunitiesItemText>
        </Styled.OpportunitiesItem>
    );
};

const SellerPage: FC = () => {
    const { t } = useTranslation("seller");
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen((prev) => !prev);

    const handleTabClick = (index: number) => {
        setActiveTabIndex(index);
    };

    return (
        <>
            <Styled.GlobalStyle />
            <Styled.Page>
                <Styled.Header>
                    <Styled.HeaderBox>
                        <Styled.HeaderLogo>
                            <Styled.HeaderLogoLink aria-label="Filezon Seller" href={appConfig.sellerHost}>
                                <Image
                                    width={128}
                                    height={35}
                                    src={`${appConfig.staticUrl}logo_black.png`}
                                    alt="Filezon Logo"
                                />
                                <div>Seller</div>
                            </Styled.HeaderLogoLink>
                        </Styled.HeaderLogo>
                        <Styled.HeaderActions $open={isOpen}>
                            <Styled.BurgerButton onClick={toggleMenu} $open={isOpen}>
                                <span className={isOpen ? "open" : ""}>
                                    <span />
                                    <span />
                                    <span />
                                </span>
                            </Styled.BurgerButton>
                            <Styled.HeaderNav $open={isOpen}>
                                <Styled.HeaderNavLink href="#opportunities" onClick={toggleMenu}>
                                    <span>{t("advantages")}</span>
                                </Styled.HeaderNavLink>
                                <Styled.HeaderNavLink href="#how-to-start" onClick={toggleMenu}>
                                    <span>{t("howToStart")}</span>
                                </Styled.HeaderNavLink>
                                <Styled.HeaderNavLink href="#faq" onClick={toggleMenu}>
                                    <span>{t("faq")}</span>
                                </Styled.HeaderNavLink>
                            </Styled.HeaderNav>
                            <Styled.HeaderButtonsBox $open={isOpen}>
                                <Styled.HeaderButton href={`${appConfig.sellerHost}/login`}>
                                    {<span className="tsBodyControl600Large">{t("signIn")}</span>}
                                </Styled.HeaderButton>
                                <Styled.HeaderButton href={`${appConfig.sellerHost}/registration`}>
                                    {<span className="tsBodyControl600Large">{t("registration")}</span>}
                                </Styled.HeaderButton>
                            </Styled.HeaderButtonsBox>
                        </Styled.HeaderActions>
                    </Styled.HeaderBox>
                </Styled.Header>
                <main>
                    <Styled.IntroSection>
                        <Styled.IntroImageBox>
                            <Image
                                width={680}
                                height={345}
                                src={`${appConfig.staticUrl}seller_promopage.png`}
                                alt="seller"
                            />
                        </Styled.IntroImageBox>
                        <Styled.IntroTitleBox>
                            <Styled.IntroTitleWrapper>
                                <Styled.IntroHeader>
                                    <span>{t("pageHeader")}</span>
                                </Styled.IntroHeader>
                                <Styled.IntroHeaderTitle>
                                    <span>{t("pageTitle")}</span>
                                </Styled.IntroHeaderTitle>
                            </Styled.IntroTitleWrapper>
                            <Styled.IntroActionWrapper>
                                <Styled.LinkButton href={`${appConfig.sellerHost}/become-seller`}>
                                    <span className="tsHeadline600Medium">{t("becomeSeller")}</span>
                                </Styled.LinkButton>
                            </Styled.IntroActionWrapper>
                        </Styled.IntroTitleBox>
                    </Styled.IntroSection>
                    <Styled.OpportunitiesSection id="opportunities">
                        <Styled.OpportunitiesHeader>
                            <span>{t("opportunitiesHeader")}</span>
                        </Styled.OpportunitiesHeader>
                        <Styled.OpportunitiesList>
                            <OpportunitiesItem
                                header={t("easyEnter")}
                                title={t("easyEnterTitle")}
                                image="welcome.png"
                                alt="Welcome"
                            />
                            <OpportunitiesItem
                                header={t("anonymity")}
                                title={t("anonymityTitle")}
                                image="anonymity.png"
                                alt="Anonymity"
                            />
                            <OpportunitiesItem
                                header={t("lowRate")}
                                title={t("lowRateTitle")}
                                image="low_rate.png"
                                alt="Low rate"
                            />
                            <OpportunitiesItem
                                header={t("youPayNothing")}
                                title={t("youPayNothingTitle")}
                                image="its_free.png"
                                alt="Free using"
                            />
                            <OpportunitiesItem
                                header={t("worldwide")}
                                title={t("worldwideTitle")}
                                image="worldwide.png"
                                alt="Worldwide"
                            />
                        </Styled.OpportunitiesList>
                        <Styled.OpportunitiesAction>
                            <Styled.LinkButton href={`${appConfig.sellerHost}/become-seller`}>
                                <span className="tsHeadline600Medium">{t("signUp")}</span>
                            </Styled.LinkButton>
                        </Styled.OpportunitiesAction>
                    </Styled.OpportunitiesSection>
                    <Styled.OpportunitiesSection id="how-to-start">
                        <Styled.OpportunitiesHeader>
                            <span>{t("howStartSelling")}</span>
                        </Styled.OpportunitiesHeader>
                        <Styled.Tabs>
                            <Styled.TabHeaders>
                                <Tab
                                    title={t("register")}
                                    isActive={0 === activeTabIndex}
                                    onClick={() => handleTabClick(0)}
                                />
                                <Tab
                                    title={t("uploadProducts")}
                                    isActive={1 === activeTabIndex}
                                    onClick={() => handleTabClick(1)}
                                />
                                <Tab
                                    title={t("startSelling")}
                                    isActive={2 === activeTabIndex}
                                    onClick={() => handleTabClick(2)}
                                />
                            </Styled.TabHeaders>
                            <Styled.TabContent>
                                {activeTabIndex === 0 && (
                                    <Styled.TabContentItem>
                                        <Styled.TabContentText>
                                            <p>{t("registerTitle")}</p>
                                            <p>{t("registerTitle2")}</p>
                                        </Styled.TabContentText>
                                        <Image
                                            width={380}
                                            height={380}
                                            src={`${appConfig.staticUrl}seller_how_to_begin_registration.png`}
                                            alt="How to begin. Registration"
                                        />
                                    </Styled.TabContentItem>
                                )}
                                {activeTabIndex === 1 && (
                                    <Styled.TabContentItem>
                                        <Styled.TabContentText>
                                            <p>{t("uploadProductsTitle")}</p>
                                            <Styled.TabContentTextList>
                                                <Styled.TabContentTextListItem>
                                                    <span>{t("uploadProductsTitle2")}</span>
                                                </Styled.TabContentTextListItem>
                                                <Styled.TabContentTextListItem>
                                                    <span>{t("uploadProductsTitle3")}</span>
                                                </Styled.TabContentTextListItem>
                                                <Styled.TabContentTextListItem>
                                                    <span>{t("uploadProductsTitle4")}</span>
                                                </Styled.TabContentTextListItem>
                                            </Styled.TabContentTextList>
                                            <p>{t("uploadProductsTitle5")}</p>
                                        </Styled.TabContentText>
                                        <Image
                                            width={380}
                                            height={380}
                                            src={`${appConfig.staticUrl}seller_how_to_begin_upload.png`}
                                            alt="How to begin. Upload product"
                                        />
                                    </Styled.TabContentItem>
                                )}
                                {activeTabIndex === 2 && (
                                    <Styled.TabContentItem>
                                        <Styled.TabContentText>
                                            <p>{t("startSellingTitle")}</p>
                                            <p>{t("startSellingTitle2")}</p>
                                            <p>{t("startSellingTitle3")}</p>
                                            <Styled.TabContentTextBtnBox>
                                                <Styled.LinkButtonSmall href={`${appConfig.sellerHost}/become-seller`}>
                                                    <span className="tsBodyControl600Large">{t("signUp")}</span>
                                                </Styled.LinkButtonSmall>
                                            </Styled.TabContentTextBtnBox>
                                        </Styled.TabContentText>
                                        <Image
                                            width={380}
                                            height={380}
                                            src={`${appConfig.staticUrl}seller_how_to_begin_sale.png`}
                                            alt="How to begin. Sale"
                                        />
                                    </Styled.TabContentItem>
                                )}
                            </Styled.TabContent>
                        </Styled.Tabs>
                        <Styled.MobileTabsBox>
                            <div>
                                <div>
                                    <h3>{`1/3 ${t("register")}`}</h3>
                                </div>
                                <Styled.TabContentItem>
                                    <Styled.TabContentText>
                                        <p>{t("registerTitle")}</p>
                                        <p>{t("registerTitle2")}</p>
                                    </Styled.TabContentText>
                                    <Image
                                        width={200}
                                        height={200}
                                        src={`${appConfig.staticUrl}seller_how_to_begin_registration.png`}
                                        alt="How to begin. Registration"
                                    />
                                </Styled.TabContentItem>
                            </div>
                            <div>
                                <div>
                                    <h3>{`2/3 ${t("uploadProducts")}`}</h3>
                                </div>
                                <Styled.TabContentItem>
                                    <Styled.TabContentText>
                                        <p>{t("uploadProductsTitle")}</p>
                                        <Styled.TabContentTextList>
                                            <Styled.TabContentTextListItem>
                                                <span>{t("uploadProductsTitle2")}</span>
                                            </Styled.TabContentTextListItem>
                                            <Styled.TabContentTextListItem>
                                                <span>{t("uploadProductsTitle3")}</span>
                                            </Styled.TabContentTextListItem>
                                            <Styled.TabContentTextListItem>
                                                <span>{t("uploadProductsTitle4")}</span>
                                            </Styled.TabContentTextListItem>
                                        </Styled.TabContentTextList>
                                        <p>{t("uploadProductsTitle5")}</p>
                                    </Styled.TabContentText>
                                    <Image
                                        width={200}
                                        height={200}
                                        src={`${appConfig.staticUrl}seller_how_to_begin_upload.png`}
                                        alt="How to begin. Upload product"
                                    />
                                </Styled.TabContentItem>
                            </div>
                            <div>
                                <div>
                                    <h3>{`3/3 ${t("startSelling")}`}</h3>
                                </div>
                                <Styled.TabContentItem>
                                    <Styled.TabContentText>
                                        <p>{t("startSellingTitle")}</p>
                                        <p>{t("startSellingTitle2")}</p>
                                        <p>{t("startSellingTitle3")}</p>
                                        <Styled.TabContentTextBtnBox>
                                            <Styled.LinkButtonSmall href={`${appConfig.sellerHost}/become-seller`}>
                                                <span className="tsBodyControl600Large">{t("signUp")}</span>
                                            </Styled.LinkButtonSmall>
                                        </Styled.TabContentTextBtnBox>
                                    </Styled.TabContentText>
                                    <Image
                                        width={200}
                                        height={200}
                                        src={`${appConfig.staticUrl}seller_how_to_begin_sale.png`}
                                        alt="How to begin. Sale"
                                    />
                                </Styled.TabContentItem>
                            </div>
                        </Styled.MobileTabsBox>
                    </Styled.OpportunitiesSection>
                    <Styled.FaqSection id="faq">
                        <Styled.FaqSectionHeader>
                            <Styled.FaqHeader>
                                <span>{t("faq")}</span>
                            </Styled.FaqHeader>
                        </Styled.FaqSectionHeader>
                        <Styled.FaqBody>
                            <Accordion title={t("whoCanSell")}>
                                <Styled.FaqAccordiinTitle>{t("anyPerson")}</Styled.FaqAccordiinTitle>
                            </Accordion>
                            <Accordion title={t("whatRates")}>
                                <Styled.FaqAccordiinTitle>{t("ratesTitle")}</Styled.FaqAccordiinTitle>
                            </Accordion>
                            <Accordion title={t("whatSell")}>
                                <Styled.FaqAccordiinTitle>{t("whatSellTitle")}</Styled.FaqAccordiinTitle>
                            </Accordion>
                            <Accordion title={t("howMuchData")}>
                                <Styled.FaqAccordiinTitle>{t("howMuchDataTitle")}</Styled.FaqAccordiinTitle>
                            </Accordion>
                            <Accordion title={t("howPayout")}>
                                <Styled.FaqAccordiinTitle>{t("howPayoutTitle")}</Styled.FaqAccordiinTitle>
                            </Accordion>
                        </Styled.FaqBody>
                    </Styled.FaqSection>
                </main>
            </Styled.Page>
            <SimpleFooter />
        </>
    );
};

export default SellerPage;
