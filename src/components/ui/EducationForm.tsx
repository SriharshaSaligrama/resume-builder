import React from 'react';
import { Education } from '../../types/resume';
import { Input } from './Input';
import { FormSection } from './FormSection';

interface EducationFormProps {
    education: Education;
    onUpdate: (field: keyof Education, value: string) => void;
}

interface FormFieldConfig {
    field: keyof Education;
    label: string;
    placeholder: string;
    type?: string;
}

export const EducationForm: React.FC<EducationFormProps> = ({
    education,
    onUpdate,
}) => {
    const institutionFields: FormFieldConfig[] = [
        {
            field: 'institution',
            label: 'Institution',
            placeholder: 'University of California, Berkeley'
        },
        {
            field: 'location',
            label: 'Location',
            placeholder: 'Berkeley, CA'
        }
    ];

    const degreeFields: FormFieldConfig[] = [
        {
            field: 'degree',
            label: 'Degree',
            placeholder: 'Bachelor of Science'
        },
        {
            field: 'field',
            label: 'Field of Study',
            placeholder: 'Computer Science'
        }
    ];

    const graduationFields: FormFieldConfig[] = [
        {
            field: 'graduationDate',
            label: 'Graduation Date',
            placeholder: 'May 2020'
        },
        {
            field: 'gpa',
            label: 'GPA (optional)',
            placeholder: '3.8/4.0'
        }
    ];

    const renderFormFields = (fields: FormFieldConfig[]) => (
        fields.map(({ field, label, placeholder, type = 'text' }) => (
            <Input
                key={field}
                label={label}
                type={type}
                value={education[field] || ''}
                onChange={(e) => onUpdate(field, e.target.value)}
                placeholder={placeholder}
            />
        ))
    );

    return (
        <>
            <FormSection>
                {renderFormFields(institutionFields)}
            </FormSection>

            <FormSection>
                {renderFormFields(degreeFields)}
            </FormSection>

            <FormSection className="mb-0">
                {renderFormFields(graduationFields)}
            </FormSection>
        </>
    );
};