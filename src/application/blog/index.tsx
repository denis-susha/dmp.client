import SimpleFooter from "@/components/layout/Footer/simpleFooter";
import { FC, useState } from "react";
import { Styled } from "./blog.styles";
import Image from "next/image";
import { appConfig } from "@/appConfig";
import { useTranslation } from "next-i18next/pages";
import BadgeChip from "@/components/common/BadgeChip";
import { IBlogNextPageProps } from "@/pages/blog";
import { formatDate } from "@/utils";

const BlogPage: FC<IBlogNextPageProps> = (props) => {
    const { t, i18n } = useTranslation(["blog", "common"]);
    const { posts } = props;

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
                                <Styled.TopicHeader>{t("latestPosts")}</Styled.TopicHeader>
                                <Styled.TopicTagsContainer>
                                    <BadgeChip size="small" variant="outlined">
                                        <button>{t("latestPostsTag")}</button>
                                    </BadgeChip>
                                    <BadgeChip size="small">
                                        <button>{t("platformNewsTag")}</button>
                                    </BadgeChip>
                                </Styled.TopicTagsContainer>
                            </Styled.TopicContiner>
                        </Styled.Container>
                    </Styled.IntroSection>
                    <Styled.ContentSection>
                        <Styled.Container>
                            <Styled.ContentWrapper>
                                <Styled.Articles>
                                    {posts.map((post, index) => (
                                        <article key={index}>
                                            <Styled.Article href={`/blog/${post.slug}`}>
                                                <Styled.ArticleImageContainer>
                                                    <Image
                                                        fill
                                                        src={`${appConfig.staticUrl}${post.coverPath}`}
                                                        alt={post.title}
                                                        loading="lazy"
                                                    />
                                                </Styled.ArticleImageContainer>
                                                <Styled.ArticleTitlesWrapper>
                                                    <Styled.ArticleDate>
                                                        <time dateTime={post.publishedAt}>
                                                            {formatDate(post.publishedAt, i18n.language, false)}
                                                        </time>
                                                        <span className="bull">•</span>
                                                        {t("minRead", { value: post.minRead })}
                                                    </Styled.ArticleDate>
                                                    <Styled.ArticleHeader>{post.title}</Styled.ArticleHeader>
                                                    <Styled.ArticleShortContent>
                                                        {post.shortContent}
                                                    </Styled.ArticleShortContent>
                                                </Styled.ArticleTitlesWrapper>
                                            </Styled.Article>
                                        </article>
                                    ))}
                                </Styled.Articles>
                                <Styled.Aside>
                                    <Styled.TryItBox>
                                        <Styled.TryItHeader>{t("asideHeader")}</Styled.TryItHeader>
                                        <Styled.TryItText>{t("asideText")}</Styled.TryItText>
                                        <Styled.LinkButtonSmall href={`${appConfig.sellerHost}/become-seller`}>
                                            <span className="tsBodyControl600Large">{t("tryItNow")}</span>
                                        </Styled.LinkButtonSmall>
                                    </Styled.TryItBox>
                                </Styled.Aside>
                            </Styled.ContentWrapper>
                        </Styled.Container>
                    </Styled.ContentSection>
                </main>
            </Styled.Page>
            <SimpleFooter />
        </>
    );
};

export default BlogPage;
