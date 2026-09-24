import React, { FC } from "react";
import { Styled } from "./styles";
import Link from "next/link";

const Separator: FC = () => <Styled.BreadCrumbsItemTitle className="mx-[10px]">/</Styled.BreadCrumbsItemTitle>;

interface BreadCrumb {
    link: string;
    title: string;
}

interface BreadCrumbsProps {
    first: BreadCrumb;
    second?: BreadCrumb;
}

const BreadCrumbs: FC<BreadCrumbsProps> = (props) => {
    const { first, second } = props;
    return (
        <Styled.BreadCrumbs>
            <Styled.BreadCrumbsList className="tsBodyControl400Small">
                {second && (
                    <>
                        <Styled.BreadCrumbsItem>
                            <Styled.BreadCrumbsItemTitle>
                                <Link href={`/${second.link}`}>{second.title}</Link>
                            </Styled.BreadCrumbsItemTitle>
                        </Styled.BreadCrumbsItem>
                        <Separator />
                    </>
                )}
                <Styled.BreadCrumbsItem>
                    <Styled.BreadCrumbsItemTitle>
                        <Link href={`/${first.link}`}>{first.title}</Link>
                    </Styled.BreadCrumbsItemTitle>
                </Styled.BreadCrumbsItem>
            </Styled.BreadCrumbsList>
        </Styled.BreadCrumbs>
    );
};

export default BreadCrumbs;
