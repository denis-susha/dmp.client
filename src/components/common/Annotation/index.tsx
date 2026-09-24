import React, { FC } from "react";
import { Styled } from "./styles";

interface IAnnotationProps extends React.PropsWithChildren {
    style?: "default" | "disabled";
    className?: string | undefined;
}

const Annotation: FC<IAnnotationProps> = (props) => {
    const { style = "disabled", children } = props;

    return (
        <Styled.Container className={props.className}>
            <Styled.Wrapper>
                <Styled.IconAnnotation style={style} icon="annotation-info" size={24} />
                <Styled.ContentContainer>{children}</Styled.ContentContainer>
            </Styled.Wrapper>
        </Styled.Container>
    );
};

export default Annotation;
