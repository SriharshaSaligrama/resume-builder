import React from 'react';

interface TagInputProps {
    label: string;
    value: string;
    placeholder: string;
    tags: string[];
    onChange: (value: string) => void;
}

export const TagInput: React.FC<TagInputProps> = ({
    label,
    value,
    placeholder,
    tags,
    onChange
}) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};