import React from 'react';
import { Education } from '../types/resume';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import { EditorCard } from './ui/EditorCard';
import { Input } from './ui/Input';
import { ActionButton } from './ui/ActionButton';
import { EmptyState } from './ui/EmptyState';

interface EducationEditorProps {
    education: Education[];
    onChange: (education: Education[]) => void;
}

export const EducationEditor: React.FC<EducationEditorProps> = ({
    education,
    onChange,
}) => {
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

    return (
        <EditorCard title="Education" icon={GraduationCap}>
            <div className="flex justify-end mb-4">
                <ActionButton onClick={addEducation} icon={Plus}>
                    Add Education
                </ActionButton>
            </div>

            <div className="space-y-4">
                {education.map((edu) => (
                    <div key={edu.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="font-medium text-gray-800">
                                {edu.degree ? `${edu.degree} in ${edu.field}` : 'New Education Entry'}
                            </h3>
                            <ActionButton
                                variant="danger"
                                onClick={() => removeEducation(edu.id)}
                                className="p-1"
                            >
                                <Trash2 size={16} />
                            </ActionButton>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <Input
                                label="Institution"
                                value={edu.institution}
                                onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                                placeholder="University of California, Berkeley"
                            />
                            <Input
                                label="Location"
                                value={edu.location}
                                onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                                placeholder="Berkeley, CA"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <Input
                                label="Degree"
                                value={edu.degree}
                                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                                placeholder="Bachelor of Science"
                            />
                            <Input
                                label="Field of Study"
                                value={edu.field}
                                onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                                placeholder="Computer Science"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Graduation Date"
                                value={edu.graduationDate}
                                onChange={(e) => updateEducation(edu.id, 'graduationDate', e.target.value)}
                                placeholder="May 2020"
                            />
                            <Input
                                label="GPA (optional)"
                                value={edu.gpa || ''}
                                onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                                placeholder="3.8/4.0"
                            />
                        </div>
                    </div>
                ))}
            </div>

            {education.length === 0 && (
                <EmptyState
                    icon={GraduationCap}
                    title="No education entries added yet."
                    description='Click "Add Education" to get started.'
                />
            )}
        </EditorCard>
    );
};