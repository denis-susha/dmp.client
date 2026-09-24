import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import LazyHydrate from "@/components/common/LazyHydrate";
import Footer from "../Footer";
import Header from "../Header";
import LayoutInner from "./LayoutInner/LayoutInner";
import Topbar from "../Topbar";
import { Styled } from "./layout.styles";
import NotificationComponent from "@/components/common/Notification";
import { NonAuthPageLayout } from "./NonAuth/nonAuthPageLayout";
import { LayoutContainer } from "./layoutContainer";
import { PageTopContainer } from "./pageTopContainer";
import SimpleFooter from "../Footer/simpleFooter";
import Spinner from "@/components/common/Spinner";
import Seo from "@/components/common/Seo";
import { AppNotificationStoreProvider } from "@/components/common/Notification/stores/appNotificationStoreProvider";
import MobileHeader from "../MobileHeader/mobileHeaderIndex";
import { Grid } from "@/components/grid/grid.styles";

type Props = {
    title: string;
    description?: string;
    descriptionPagination?: string;
    promoPage?: boolean;
    authPage?: boolean;
    simpleLayoutPage?: boolean;
    showFooter?: boolean;
    stickyHeader?: boolean;
    innerWallpaper?: boolean;
    children?: ReactNode;
    image?: string;
    isMobile?: boolean;
    isMobileWithFixedContainer?: boolean;
};

export const Layout: FC<Props> = ({
    title,
    description,
    descriptionPagination = "",
    promoPage = false,
    authPage = false,
    simpleLayoutPage = false,
    showFooter = true,
    stickyHeader = true,
    innerWallpaper = false,
    isMobile = false,
    children,
    image,
    isMobileWithFixedContainer = false,
}) => {
    const router = useRouter();

    const catalogBtnRef = useRef<HTMLDivElement>(null);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleStart = (url: string) => {
            console.log(`Loading started: ${url}`);
            setLoading(true);
        };

        const handleComplete = (url: string) => {
            console.log(`Loading completed: ${url}`);
            setLoading(false);
        };

        const handleError = (error: unknown) => {
            console.error("Route change error:", error);
            setLoading(false);
        };

        router.events.on("routeChangeStart", handleStart);
        router.events.on("routeChangeComplete", handleComplete);
        router.events.on("routeChangeError", handleError);

        // Cleanup event listeners on unmount
        return () => {
            router.events.off("routeChangeStart", handleStart);
            router.events.off("routeChangeComplete", handleComplete);
            router.events.off("routeChangeError", handleError);
        };
    }, [router]);

    return (
        <>
            {loading && <Spinner full={true} />}
            <Seo
                innerPage={innerWallpaper}
                title={title}
                description={description}
                descriptionPagination={descriptionPagination}
                image={image}
            />
            <AppNotificationStoreProvider>
                <Styled.LayoutPage $isMobile={isMobile}>
                    <LayoutContainer innerWallpaper={innerWallpaper}>
                        {!authPage && !simpleLayoutPage && (
                            <PageTopContainer innerWallpaper={innerWallpaper}>
                                {!isMobile ? (
                                    <>
                                        <Topbar />
                                        <Header stickyHeader={stickyHeader} btnRef={catalogBtnRef} />
                                    </>
                                ) : (
                                    <MobileHeader />
                                )}
                            </PageTopContainer>
                        )}
                        <main>
                            {promoPage ? (
                                <>{children}</>
                            ) : authPage ? (
                                <NonAuthPageLayout isMobile={isMobile}>{children}</NonAuthPageLayout>
                            ) : (
                                <LayoutInner catalogBtnRef={catalogBtnRef}>{children}</LayoutInner>
                            )}
                        </main>

                        {showFooter && (
                            <LazyHydrate whenVisible>{simpleLayoutPage ? <SimpleFooter /> : <Footer />}</LazyHydrate>
                        )}
                        {isMobile && isMobileWithFixedContainer && <Grid.Separator $height={100} />}
                    </LayoutContainer>
                </Styled.LayoutPage>
                <NotificationComponent />
            </AppNotificationStoreProvider>
        </>
    );
};
