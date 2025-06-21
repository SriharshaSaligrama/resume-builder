import React from 'react';
import { Skill } from '../../types/resume';
import { Code, Plus, Trash2 } from 'lucide-react';
import { EditorCard } from '../ui/EditorCard';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { ActionButton } from '../ui/ActionButton';
import { EmptyState } from '../ui/EmptyState';
import { useSkillsEditor } from '../../hooks/useSkillsEditor';

interface SkillsEditorProps {
    skills: Skill[];
    onChange: (skills: Skill[]) => void;
}

export const SkillsEditor: React.FC<SkillsEditorProps> = ({
    skills,
    onChange,
}) => {
    const {
        addSkillCategory,
        updateSkillCategory,
        handleSkillItemsChange,
        removeSkillCategory,
        getSkillInputValue,
    } = useSkillsEditor(skills, onChange);

    return (
        <EditorCard title="Technical Skills" icon={Code}>
            <div className="flex justify-end mb-4">
                <ActionButton onClick={addSkillCategory} icon={Plus}>
                    Add Category
                </ActionButton>
            </div>

            <div className="space-y-4">
                {skills.map((skill, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex gap-4 items-start">
                            <div className="flex-1">
                                <Input
                                    label="Category"
                                    value={skill.category}
                                    onChange={(e) => updateSkillCategory(index, e.target.value)}
                                    placeholder="e.g., Programming Languages, Frameworks, Tools"
                                    className="mb-3"
                                />
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Skills (comma-separated)
                                    </label>
                                    <Textarea
                                        value={getSkillInputValue(index)}
                                        onChange={(e) => handleSkillItemsChange(index, e.target.value)}
                                        rows={2}
                                        placeholder="JavaScript, Python, React, Node.js"
                                    />
                                    {skill.items.length > 0 && (
                                        <div className="mt-2 flex flex-wrap gap-1">
                                            {skill.items.map((item, itemIndex) => (
                                                <span
                                                    key={itemIndex}
                                                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                                                >
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <ActionButton
                                variant="danger"
                                onClick={() => removeSkillCategory(index)}
                                className="p-1 mt-6"
                            >
                                <Trash2 size={16} />
                            </ActionButton>
                        </div>
                    </div>
                ))}
            </div>

            {skills.length === 0 && (
                <EmptyState
                    icon={Code}
                    title="No skill categories added yet."
                    description='Click "Add Category" to get started.'
                />
            )}
        </EditorCard>
    );
};