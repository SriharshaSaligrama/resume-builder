import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
    label,
    className = "",
    ...props
}) => {
    const textareaElement = (
        <textarea
            {...props}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${className}`}
        />
    );

    if (label) {
        return (
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
                {textareaElement}
            </div>
        );
    }

    return textareaElement;
};