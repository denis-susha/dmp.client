import { FC, useEffect, useRef, useState } from "react";
import { Styled } from "./styles";
import { twMerge } from "tailwind-merge";

export interface IDropdownListOption {
    value: string;
    label: string;
}

interface Props {
    options: IDropdownListOption[];
    value?: unknown | "";
    multiplySelect?: boolean;
    title?: string;
    isShowArrow?: boolean;
    withoutText?: boolean;
    closeListOnMouseLeave?: boolean;
    onSelect: (value: string) => void;
    handleDropdownClick?: () => void;
}

export const DropdownList: FC<Props> = ({
    options,
    value,
    title,
    withoutText = false,
    isShowArrow = true,
    multiplySelect = false,
    closeListOnMouseLeave = false,
    onSelect,
    handleDropdownClick,
}) => {
    const inputRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const [showList, toggleListShow] = useState<boolean>(false);

    const handleDropdownOpen = () => {
        if (handleDropdownClick) {
            handleDropdownClick();
        } else {
            toggleListShow(!showList);
        }
    };

    const handleSelect = (value: string) => {
        onSelect(value);
        if (!multiplySelect) {
            toggleListShow(false);
        }
    };

    const handleClickOutside = (e: MouseEvent) => {
        if (
            listRef &&
            e.target &&
            !listRef.current?.contains(e.target as Node) &&
            listRef &&
            !inputRef.current?.contains(e.target as Node)
        ) {
            toggleListShow(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    });

    const selectedOption = options.find((o) => o.value === value);
    const currentTitle = title ? title : selectedOption?.label;

    return (
        <>
            <Styled.SearchResultsSortInputWrapper
                ref={inputRef}
                onClick={() => {
                    handleDropdownOpen();
                }}
                className={twMerge(showList && "active")}
            >
                {!withoutText && currentTitle && (
                    <Styled.SearchResultsSortInput
                        readOnly
                        type="text"
                        title={currentTitle}
                        value={currentTitle}
                        className="tsBody500Medium"
                    />
                )}
                {isShowArrow && (
                    <Styled.ArrowsContainer>
                        <Styled.ArrowsIcon icon="drop-arrows" size={24} />
                    </Styled.ArrowsContainer>
                )}
            </Styled.SearchResultsSortInputWrapper>
            {showList && (
                <Styled.DropdownList ref={listRef} onMouseLeave={() => closeListOnMouseLeave && toggleListShow(false)}>
                    <Styled.DropdownListWrapper>
                        {options.map((option) => (
                            <div key={option.value} onClick={() => handleSelect(option.value)}>
                                <Styled.ChildContainer>
                                    <Styled.ChildLabel>
                                        <Styled.ChildLabelWrapper>
                                            <Styled.ChildLabelBox className="tsCompact500Medium">
                                                <span>{option.label}</span>
                                            </Styled.ChildLabelBox>
                                        </Styled.ChildLabelWrapper>
                                    </Styled.ChildLabel>
                                    {option.value === value && (
                                        <Styled.Selected>
                                            <Styled.SelectedContainer>
                                                <Styled.SelectedWrapper className="tsBodyControl500Medium">
                                                    <Styled.SelectedIcon
                                                        icon="checkmark"
                                                        size={24}
                                                        viewBox="0 0 24 24"
                                                    />
                                                </Styled.SelectedWrapper>
                                            </Styled.SelectedContainer>
                                        </Styled.Selected>
                                    )}
                                </Styled.ChildContainer>
                            </div>
                        ))}
                    </Styled.DropdownListWrapper>
                </Styled.DropdownList>
            )}
        </>
    );
};
