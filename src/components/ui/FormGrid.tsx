import React from 'react';

interface FormGridProps {
    children: React.ReactNode;
    columns?: 1 | 2;
    className?: string;
}

export const FormGrid: React.FC<FormGridProps> = ({
    children,
    columns = 2,
    className = ""
}) => {
    const gridClass = columns === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2';

    return (
        <div className={`grid ${gridClass} gap-4 ${className}`}>
            {children}
        </div>
    );
};