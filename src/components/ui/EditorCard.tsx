import React from 'react';

interface EditorCardProps {
    title: string;
    icon?: React.ComponentType<{ size?: string | number }>;
    children: React.ReactNode;
    className?: string;
}

export const EditorCard: React.FC<EditorCardProps> = ({
    title,
    icon: Icon,
    children,
    className = ""
}) => {
    return (
        <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 ${className}`}>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                {Icon && <Icon size={20} />}
                {title}
            </h2>
            {children}
        </div>
    );
};