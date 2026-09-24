import React from "react";
import { Styled } from "./spinner.styles";

const Spinner: React.FC<{ full?: boolean }> = ({ full = false }) => (
    <Styled.Container $full={full}>
        <Styled.Spin></Styled.Spin>
    </Styled.Container>
);

export default Spinner;
