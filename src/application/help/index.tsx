import React, { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Trans, useTranslation } from "next-i18next/pages";
import { LogoControl } from "@/components/layout/Layout/NonAuth/logoControl";
import Link from "next/link";

const Container = styled.div`
    display: flex;
    font-size: 15px;
    gap: 1rem;

    @media (max-width: 768px) {
        flex-direction: column;
        padding: 1rem;
        font-size: 1.5rem;
    }
`;

const TOC = styled.nav`
    flex: 0 0 250px;
    position: sticky;
    top: 0;
    height: max-content;
    margin-right: 2rem;
    border-right: 1px solid #ccc;
    padding: 2rem 0 0 2rem;
    display: flex;
    flex-direction: column;
    height: 100vh;

    @media (max-width: 768px) {
        position: static;
        border-right: none;
        border-bottom: 1px solid #ccc;
        padding: 0 0 1rem 0;
        overflow-x: auto;
        display: flex;
        gap: 1rem;
        flex-wrap: nowrap;
        margin-right: 0px;
        min-height: 400px;
    }
`;

const TOCItem = styled.div<{ level: number }>`
    margin-left: ${({ level }) => (level - 1) * 1.5}rem;
    margin-bottom: 0.5rem;
    cursor: pointer;
    font-weight: ${({ level }) => (level === 1 ? "bold" : "normal")};
    font-size: ${({ level }) => 1.2 - level * 0.1}rem;
    color: #333;

    &:hover {
        text-decoration: underline;
    }

    @media (max-width: 768px) {
        margin-left: 0;
        white-space: nowrap;
        font-size: ${({ level }) => 1.7 - level * 0.1}rem;
    }
`;

const Content = styled.div`
    flex: 1;
    max-width: 800px;
    margin-bottom: 3rem;

    h1,
    h2,
    h3 {
        scroll-margin-top: 80px;
    }

    h1 {
        font-size: 2rem;
        margin-top: 2rem;
    }
    h2 {
        font-size: 1.5rem;
        margin-top: 1.5rem;
    }
    h3 {
        font-size: 1.2rem;
        margin-top: 1.2rem;
    }

    @media (max-width: 768px) {
        max-width: 100%;
    }
`;

const GoToMarketplace = styled.div`
    margin-top: auto;
    font-size: 1.2rem;
    padding: 10px;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

const Contents = styled.div`
    overflow-y: auto;
`;

const Header = styled.div`
    margin-top: 15px;
    font-size: 1.2em;
`;

type TOCEntry = {
    id: string;
    text: string;
    level: number;
};

export const HelpPage: FC = () => {
    const { t } = useTranslation("help");
    const contentRef = useRef<HTMLDivElement>(null);
    const [toc, setToc] = useState<TOCEntry[]>([]);
    const usedIds = new Set<string>();

    useEffect(() => {
        const headings = contentRef.current?.querySelectorAll("h1, h2, h3");
        if (!headings) return;

        const entries: TOCEntry[] = [];

        headings.forEach((el) => {
            const level = parseInt(el.tagName.replace("H", ""), 10);
            const text = el.textContent || "";
            const id = el.id;

            // Ensure uniqueness
            let uniqueId = id;
            let counter = 1;
            while (usedIds.has(uniqueId)) {
                uniqueId = `${id}-${counter++}`;
            }
            usedIds.add(uniqueId);
            el.setAttribute("id", uniqueId);

            entries.push({ id: uniqueId, text, level });
        });

        setToc(entries);
    }, []);

    const scrollToHeading = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <Container>
            <TOC>
                <LogoControl />
                <Header>
                    <strong>{t("contents")}</strong>
                </Header>
                <Contents>
                    {toc.map((entry) => (
                        <TOCItem key={entry.id} level={entry.level} onClick={() => scrollToHeading(entry.id)}>
                            {entry.text}
                        </TOCItem>
                    ))}
                </Contents>
                <GoToMarketplace>
                    <Link href="/">{t("backToSite")}</Link>
                </GoToMarketplace>
            </TOC>
            <Content ref={contentRef}>
                <h1 id="my-order">{t("myOrder")}</h1>
                <h2 id="how-to-order">{t("howToOrder")}</h2>
                <p>{t("howToOrder1")}</p>
                <p>{t("howToOrder2")}</p>
                <p>{t("howToOrder3")}</p>
                <p>{t("howToOrder4")}</p>
                <p>{t("howToOrder5")}</p>

                <h1 id="payment">{t("payment")}</h1>
                <h2 id="payment-methods">{t("paymentMethods")}</h2>
                <p>{t("paymentMethodsTitle")}</p>
                <p>{t("paymentMethodsTitle2")}</p>
                <p>{t("paymentMethodsTitle3")}</p>
                <h2 id="payment-cryptocurrency">{t("cryptocurrency")}</h2>
                <h3 id="payment-cryptocurrency-fees">{t("cryptocurrencySubHdr")}</h3>
                <p>{t("cryptocurrencySubHdrTitle")}</p>

                <h1 id="receipt-product">{t("receiptProduct")}</h1>
                <p>{t("receiptProductTitle")}</p>

                <h1 id="refund">{t("refund")}</h1>
                <p>{t("refundTitle")}</p>

                <Trans
                    i18nKey="saleTerms"
                    ns="help"
                    values={{ dot: "• " }}
                    components={{ h1: <h1 />, p: <p />, h2: <h2 />, br: <br />, span: <span /> }}
                />
            </Content>
        </Container>
    );
};
