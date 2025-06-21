import React, { useState } from 'react';
import { Experience } from '../types/resume';
import { Briefcase, Plus, Trash2 } from 'lucide-react';
import { EditorCard } from './ui/EditorCard';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { ActionButton } from './ui/ActionButton';
import { DraggableCard } from './ui/DraggableCard';
import { TagInput } from './ui/TagInput';
import { EmptyState } from './ui/EmptyState';

interface ExperienceEditorProps {
    experiences: Experience[];
    onChange: (experiences: Experience[]) => void;
}

export const ExperienceEditor: React.FC<ExperienceEditorProps> = ({
    experiences,
    onChange,
}) => {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [techInputs, setTechInputs] = useState<Record<string, string>>({});
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

    const addExperience = () => {
        const newExperience: Experience = {
            id: Date.now().toString(),
            company: '',
            position: '',
            startDate: '',
            endDate: '',
            current: false,
            location: '',
            description: [''],
            technologies: [],
        };
        onChange([...experiences, newExperience]);
        setExpandedId(newExperience.id);
        setTechInputs(prev => ({ ...prev, [newExperience.id]: '' }));
    };

    const updateExperience = <K extends keyof Experience>(id: string, field: K, value: Experience[K]) => {
        onChange(
            experiences.map((exp) =>
                exp.id === id ? { ...exp, [field]: value } : exp
            )
        );
    };

    const removeExperience = (id: string) => {
        onChange(experiences.filter((exp) => exp.id !== id));
        setTechInputs(prev => {
            const newInputs = { ...prev };
            delete newInputs[id];
            return newInputs;
        });
    };

    const updateDescription = (id: string, index: number, value: string) => {
        const experience = experiences.find((exp) => exp.id === id);
        if (experience) {
            const newDescription = [...experience.description];
            newDescription[index] = value;
            updateExperience(id, 'description', newDescription);
        }
    };

    const addDescriptionPoint = (id: string) => {
        const experience = experiences.find((exp) => exp.id === id);
        if (experience) {
            updateExperience(id, 'description', [...experience.description, '']);
        }
    };

    const removeDescriptionPoint = (id: string, index: number) => {
        const experience = experiences.find((exp) => exp.id === id);
        if (experience && experience.description.length > 1) {
            const newDescription = experience.description.filter((_, i) => i !== index);
            updateExperience(id, 'description', newDescription);
        }
    };

    const handleTechnologiesChange = (id: string, value: string) => {
        setTechInputs(prev => ({ ...prev, [id]: value }));
        const technologies = value
            .split(',')
            .map((tech) => tech.trim())
            .filter((tech) => tech.length > 0);
        updateExperience(id, 'technologies', technologies);
    };

    const getTechInputValue = (id: string) => {
        if (techInputs[id] !== undefined) {
            return techInputs[id];
        }
        const experience = experiences.find(exp => exp.id === id);
        return experience ? experience.technologies.join(', ') : '';
    };

    // Drag and Drop handlers
    const handleDragStart = (e: React.DragEvent, index: number) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', '');
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        setDragOverIndex(index);
    };

    const handleDragLeave = () => {
        setDragOverIndex(null);
    };

    const handleDrop = (e: React.DragEvent, dropIndex: number) => {
        e.preventDefault();

        if (draggedIndex === null || draggedIndex === dropIndex) {
            setDraggedIndex(null);
            setDragOverIndex(null);
            return;
        }

        const newExperiences = [...experiences];
        const draggedItem = newExperiences[draggedIndex];

        newExperiences.splice(draggedIndex, 1);
        newExperiences.splice(dropIndex, 0, draggedItem);

        onChange(newExperiences);
        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
        setDragOverIndex(null);
    };

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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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

                        <Input
                            label="Location"
                            value={experience.location}
                            onChange={(e) => updateExperience(experience.id, 'location', e.target.value)}
                            placeholder="San Francisco, CA"
                            className="mb-4"
                        />

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            {experience.description.map((desc, index) => (
                                <div key={index} className="flex gap-2 mb-2">
                                    <Textarea
                                        value={desc}
                                        onChange={(e) => updateDescription(experience.id, index, e.target.value)}
                                        rows={2}
                                        placeholder="Describe your achievements and responsibilities..."
                                        className="flex-1"
                                    />
                                    {experience.description.length > 1 && (
                                        <ActionButton
                                            variant="danger"
                                            onClick={() => removeDescriptionPoint(experience.id, index)}
                                            className="p-1"
                                        >
                                            <Trash2 size={16} />
                                        </ActionButton>
                                    )}
                                </div>
                            ))}
                            <ActionButton
                                variant="secondary"
                                onClick={() => addDescriptionPoint(experience.id)}
                                icon={Plus}
                                className="text-sm"
                            >
                                Add bullet point
                            </ActionButton>
                        </div>

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