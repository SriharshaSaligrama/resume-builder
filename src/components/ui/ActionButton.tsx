import React from 'react';

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
    icon?: React.ComponentType<{ size?: string | number }>;
    children: React.ReactNode;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
    variant = 'primary',
    icon: Icon,
    children,
    className = "",
    ...props
}) => {
    const baseClasses = "flex items-center gap-2 px-4 py-2 rounded-md transition-colors";

    const variantClasses = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
        danger: "text-red-600 hover:text-red-800"
    };

    return (
        <button
            {...props}
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        >
            {Icon && <Icon size={16} />}
            {children}
        </button>
    );
};