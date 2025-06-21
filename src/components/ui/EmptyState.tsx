import React from 'react';

interface EmptyStateProps {
    icon: React.ComponentType<{ size?: string | number, className?: string }>;
    title: string;
    description: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    icon: Icon,
    title,
    description
}) => {
    return (
        <div className="text-center py-8 text-gray-500">
            <Icon size={48} className="mx-auto mb-3 opacity-30" />
            <p>{title}</p>
            <p className="text-sm">{description}</p>
        </div>
    );
};