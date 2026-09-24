import React from "react";

type SwitchProps = {
    checked: boolean;
    onChange: (checked: boolean) => void;
};

const Switch: React.FC<SwitchProps> = ({ checked, onChange }) => {
    return (
        <button
            className={`relative w-12 h-6 rounded-full transition-all duration-300 
        ${checked ? "bg-blue-600" : "bg-gray-300"}`}
            onClick={() => onChange(!checked)}
        >
            <span
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 
          ${checked ? "translate-x-6" : "translate-x-0"}`}
            />
        </button>
    );
};

export default Switch;
