import { type FC } from "react";
import { Styled } from "./linkButton.styles";

export interface LinkButtonProps {
    title: string;
    onClick: () => void;
}

export const LinkButton: FC<LinkButtonProps> = ({ title, onClick }) => {
    return (
        <div>
            <Styled.LinkBtn style="simple" onClick={onClick}>
                <Styled.Arrow icon="long-arrow" size={16} viewBox="0 0 16 16" />
                <Styled.Title className="tsBodyControl500Medium">{title}</Styled.Title>
            </Styled.LinkBtn>
        </div>
    );
};
