import React, { useState, ReactNode } from "react";
import { Styled } from "./styles";

interface Tab {
    label: string;
    content: ReactNode;
}

interface TabsProps {
    tabs: Tab[];
    classNames?: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, classNames }) => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const handleTabClick = (index: number) => {
        setActiveTabIndex(index);
    };

    return (
        <div>
            <Styled.TabHeaders>
                {tabs.map((tab, index) => (
                    <Styled.TabHeader
                        key={index}
                        $isActive={index === activeTabIndex}
                        onClick={() => handleTabClick(index)}
                        className={classNames}
                    >
                        {tab.label}
                    </Styled.TabHeader>
                ))}
            </Styled.TabHeaders>
            <Styled.TabContent>{tabs[activeTabIndex]?.content}</Styled.TabContent>
        </div>
    );
};

export default Tabs;
