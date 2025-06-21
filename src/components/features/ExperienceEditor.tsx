import React from 'react';
import { Experience } from '../../types/resume';
import { Briefcase, Plus } from 'lucide-react';
import { EditorCard } from '../ui/EditorCard';
import { Input } from '../ui/Input';
import { ActionButton } from '../ui/ActionButton';
import { DraggableCard } from '../ui/DraggableCard';
import { TagInput } from '../ui/TagInput';
import { EmptyState } from '../ui/EmptyState';
import { FormSection } from '../ui/FormSection';
import { DynamicFormList } from '../ui/DynamicFormList';
import { useExperienceEditor } from '../../hooks/useExperienceEditor';
import { useDragAndDrop } from '../../hooks/useDragAndDrop';

interface ExperienceEditorProps {
    experiences: Experience[];
    onChange: (experiences: Experience[]) => void;
}

export const ExperienceEditor: React.FC<ExperienceEditorProps> = ({
    experiences,
    onChange,
}) => {
    const {
        expandedId,
        setExpandedId,
        addExperience,
        updateExperience,
        removeExperience,
        updateDescription,
        addDescriptionPoint,
        removeDescriptionPoint,
        handleTechnologiesChange,
        getTechInputValue,
    } = useExperienceEditor(experiences, onChange);

    const {
        draggedIndex,
        dragOverIndex,
        handleDragStart,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        handleDragEnd,
    } = useDragAndDrop(experiences, onChange);

    return (
        <EditorCard title="Work Experience" icon={Briefcase}>
            <div className="flex justify-end mb-4">
                <ActionButton onClick={addExperience} icon={Plus}>
                    Add Experience
                </ActionButton>
            </div>

            <div className="space-y-4">
                {experiences.map((experience, index) => (
                    <DraggableCard
                        key={experience.id}
                        index={index}
                        title={`${experience.position || 'New Position'} at ${experience.company || 'Company Name'}`}
                        subtitle={`${experience.startDate} - ${experience.current ? 'Present' : experience.endDate}`}
                        isExpanded={expandedId === experience.id}
                        isDragging={draggedIndex === index}
                        isDragOver={dragOverIndex === index && draggedIndex !== index}
                        onToggleExpand={() => setExpandedId(expandedId === experience.id ? null : experience.id)}
                        onRemove={() => removeExperience(experience.id)}
                        onDragStart={handleDragStart}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onDragEnd={handleDragEnd}
                    >
                        <FormSection>
                            <Input
                                label="Company"
                                value={experience.company}
                                onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                            />
                            <Input
                                label="Position"
                                value={experience.position}
                                onChange={(e) => updateExperience(experience.id, 'position', e.target.value)}
                            />
                        </FormSection>

                        <FormSection columns={1}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Input
                                    label="Start Date"
                                    value={experience.startDate}
                                    onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                                    placeholder="Jan 2023"
                                />
                                <Input
                                    label="End Date"
                                    value={experience.endDate}
                                    onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                                    placeholder="Present"
                                    disabled={experience.current}
                                />
                                <div className="flex items-center">
                                    <label className="flex items-center gap-2 mt-6">
                                        <input
                                            type="checkbox"
                                            checked={experience.current}
                                            onChange={(e) => updateExperience(experience.id, 'current', e.target.checked)}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-sm text-gray-700">Current position</span>
                                    </label>
                                </div>
                            </div>
                        </FormSection>

                        <Input
                            label="Location"
                            value={experience.location}
                            onChange={(e) => updateExperience(experience.id, 'location', e.target.value)}
                            placeholder="San Francisco, CA"
                            className="mb-4"
                        />

                        <DynamicFormList
                            label="Description"
                            items={experience.description}
                            onItemChange={(index, value) => updateDescription(experience.id, index, value)}
                            onAddItem={() => addDescriptionPoint(experience.id)}
                            onRemoveItem={(index) => removeDescriptionPoint(experience.id, index)}
                            placeholder="Describe your achievements and responsibilities..."
                            addButtonText="Add bullet point"
                        />

                        <TagInput
                            label="Technologies Used (comma-separated)"
                            value={getTechInputValue(experience.id)}
                            placeholder="React, Node.js, PostgreSQL, AWS"
                            tags={experience.technologies}
                            onChange={(value) => handleTechnologiesChange(experience.id, value)}
                        />
                    </DraggableCard>
                ))}
            </div>

            {experiences.length === 0 && (
                <EmptyState
                    icon={Briefcase}
                    title="No work experience added yet."
                    description='Click "Add Experience" to get started.'
                />
            )}
        </EditorCard>
    );
};