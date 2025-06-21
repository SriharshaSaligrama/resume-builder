import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon?: React.ComponentType<{ size?: string | number }>;
}

export const Input: React.FC<InputProps> = ({
    label,
    icon: Icon,
    className = "",
    ...props
}) => {
    const inputElement = (
        <input
            {...props}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
        />
    );

    if (label) {
        return (
            <div>
                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    {Icon && <Icon size={14} />}
                    {label}
                </label>
                {inputElement}
            </div>
        );
    }

    return inputElement;
};