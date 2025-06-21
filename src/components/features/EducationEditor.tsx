import React from 'react';
import { Education } from '../../types/resume';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import { EditorCard } from '../ui/EditorCard';
import { ActionButton } from '../ui/ActionButton';
import { EmptyState } from '../ui/EmptyState';
import { EducationForm } from '../ui/EducationForm';
import { useEducationEditor } from '../../hooks/useEducationEditor';

interface EducationEditorProps {
    education: Education[];
    onChange: (education: Education[]) => void;
}

export const EducationEditor: React.FC<EducationEditorProps> = ({
    education,
    onChange,
}) => {
    const { addEducation, updateEducation, removeEducation } = useEducationEditor(education, onChange);

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

                        <EducationForm
                            education={edu}
                            onUpdate={(field, value) => updateEducation(edu.id, field, value)}
                        />
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