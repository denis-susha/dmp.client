import React from "react";
import { Styled } from "./chip.styles";

interface IChipProps {
    label: string;
    bgColor?: string;
}

const Chip: React.FC<IChipProps> = ({ label, bgColor }) => (
    <Styled.Container $bgColor={bgColor}>
        <Styled.Title>{label}</Styled.Title>
    </Styled.Container>
);

export default Chip;
