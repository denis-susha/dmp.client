import { FC } from "react";
import { Styled } from "./topbar.styles";

interface Props {
    text: string;
    link: string;
    isSelf: boolean;
    stickOut?: boolean;
}

const Item: FC<Props> = ({ text, link, stickOut, isSelf }) => {
    return (
        <Styled.RightItem>
            <Styled.RightItemDiv>
                <Styled.RightItemLink
                    target={isSelf ? "_self" : "_blank"}
                    href={link}
                    rel="nofollow noopener"
                    $stickOut={stickOut}
                >
                    {text}
                </Styled.RightItemLink>
            </Styled.RightItemDiv>
        </Styled.RightItem>
    );
};

export default Item;
