import React from 'react';
import { FormGrid } from './FormGrid';

interface FormSectionProps {
    children: React.ReactNode;
    columns?: 1 | 2;
    className?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({
    children,
    columns = 2,
    className = "mb-4"
}) => {
    return (
        <FormGrid columns={columns} className={className}>
            {children}
        </FormGrid>
    );
};