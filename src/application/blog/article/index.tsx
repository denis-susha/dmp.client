import SimpleFooter from "@/components/layout/Footer/simpleFooter";
import { FC, useState } from "react";
import { Styled } from "../blog.styles";
import { Styled as AStyled } from "./article.styles";
import Image from "next/image";
import { appConfig } from "@/appConfig";
import { useTranslation } from "next-i18next/pages";
import Markdown from "react-markdown";
import { IBlogArticleNextPageProps } from "@/pages/blog/[slug]";
import { formatDate } from "@/utils";

const BlogArticlePage: FC<IBlogArticleNextPageProps> = (props) => {
    const { t, i18n } = useTranslation(["blog", "common"]);
    const { post } = props;
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen((prev) => !prev);

    return (
        <>
            <Styled.GlobalStyle />
            <Styled.Page>
                <Styled.Header>
                    <Styled.HeaderBox>
                        <Styled.HeaderLogo>
                            <Styled.HeaderLogoLink aria-label="Filezon" href={"/blog"}>
                                <Image
                                    width={128}
                                    height={35}
                                    src={`${appConfig.staticUrl}logo_color.png`}
                                    alt="Filezon Logo"
                                />
                                <div>Blog</div>
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
                            <Styled.HeaderButtonsBox $open={isOpen}>
                                <Styled.HeaderButton href={"/"}>
                                    {<span className="tsBodyControl600Large">{t("goToMarketplace")}</span>}
                                </Styled.HeaderButton>
                                <Styled.HeaderButton href={`${appConfig.sellerHost}/login`}>
                                    {
                                        <span className="tsBodyControl600Large">
                                            {t("becomeSeller", { ns: "common" })}
                                        </span>
                                    }
                                </Styled.HeaderButton>
                            </Styled.HeaderButtonsBox>
                        </Styled.HeaderActions>
                    </Styled.HeaderBox>
                </Styled.Header>
                <main>
                    <Styled.IntroSection>
                        <Styled.Container>
                            <Styled.TopicContiner>
                                <AStyled.LinkToMain href={"/blog"}>{t("blog")}</AStyled.LinkToMain>
                                <Styled.TopicHeader>{post.title}</Styled.TopicHeader>
                            </Styled.TopicContiner>
                        </Styled.Container>
                    </Styled.IntroSection>
                    <Styled.ContentSection>
                        <Styled.Container>
                            <Styled.ContentWrapper>
                                <article>
                                    <AStyled.ArticleHeader>
                                        <Image
                                            width={840}
                                            height={508}
                                            src={`${appConfig.staticUrl}${post.coverPath}`}
                                            alt={post.title}
                                            loading="lazy"
                                        />
                                        <Styled.ArticleTitlesWrapper>
                                            <Styled.ArticleDate>
                                                {t("published")}
                                                <time dateTime={post.publishedAt}>
                                                    {formatDate(post.publishedAt, i18n.language, false)}
                                                </time>
                                                <span className="bull">•</span>
                                                {t("minRead", { value: post.minRead })}
                                            </Styled.ArticleDate>
                                        </Styled.ArticleTitlesWrapper>
                                    </AStyled.ArticleHeader>
                                    <AStyled.ContentContainer>
                                        <AStyled.ContentWrapper>
                                            <Markdown>{post.content}</Markdown>
                                        </AStyled.ContentWrapper>
                                    </AStyled.ContentContainer>
                                </article>
                            </Styled.ContentWrapper>
                        </Styled.Container>
                    </Styled.ContentSection>
                </main>
            </Styled.Page>
            <SimpleFooter />
        </>
    );
};

export default BlogArticlePage;
