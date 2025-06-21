import React from 'react';

interface FormFieldProps {
    label: string;
    icon?: React.ComponentType<{ size?: string | number }>;
    children: React.ReactNode;
    className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
    label,
    icon: Icon,
    children,
    className = ""
}) => {
    return (
        <div className={className}>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                {Icon && <Icon size={14} />}
                {label}
            </label>
            {children}
        </div>
    );
};