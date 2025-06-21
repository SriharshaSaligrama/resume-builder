import { Education } from '../types/resume';

export const useEducationEditor = (education: Education[], onChange: (education: Education[]) => void) => {
    const addEducation = () => {
        const newEducation: Education = {
            id: Date.now().toString(),
            institution: '',
            degree: '',
            field: '',
            graduationDate: '',
            location: '',
        };
        onChange([...education, newEducation]);
    };

    const updateEducation = (id: string, field: keyof Education, value: string) => {
        onChange(
            education.map((edu) =>
                edu.id === id ? { ...edu, [field]: value } : edu
            )
        );
    };

    const removeEducation = (id: string) => {
        onChange(education.filter((edu) => edu.id !== id));
    };

    return {
        addEducation,
        updateEducation,
        removeEducation,
    };
};