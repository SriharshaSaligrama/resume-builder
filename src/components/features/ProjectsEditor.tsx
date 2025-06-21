import React from 'react';
import { Project } from '../../types/resume';
import { FolderOpen, Plus } from 'lucide-react';
import { EditorCard } from '../ui/EditorCard';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { ActionButton } from '../ui/ActionButton';
import { DraggableCard } from '../ui/DraggableCard';
import { TagInput } from '../ui/TagInput';
import { EmptyState } from '../ui/EmptyState';
import { FormSection } from '../ui/FormSection';
import { DynamicFormList } from '../ui/DynamicFormList';
import { useProjectsEditor } from '../../hooks/useProjectsEditor';
import { useDragAndDrop } from '../../hooks/useDragAndDrop';

interface ProjectsEditorProps {
    projects: Project[];
    onChange: (projects: Project[]) => void;
}

export const ProjectsEditor: React.FC<ProjectsEditorProps> = ({
    projects,
    onChange,
}) => {
    const {
        expandedId,
        setExpandedId,
        addProject,
        updateProject,
        removeProject,
        updateHighlight,
        addHighlight,
        removeHighlight,
        handleTechnologiesChange,
        getTechInputValue,
    } = useProjectsEditor(projects, onChange);

    const {
        draggedIndex,
        dragOverIndex,
        handleDragStart,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        handleDragEnd,
    } = useDragAndDrop(projects, onChange);

    return (
        <EditorCard title="Projects" icon={FolderOpen}>
            <div className="flex justify-end mb-4">
                <ActionButton onClick={addProject} icon={Plus}>
                    Add Project
                </ActionButton>
            </div>

            <div className="space-y-4">
                {projects.map((project, index) => (
                    <DraggableCard
                        key={project.id}
                        index={index}
                        title={project.name || 'New Project'}
                        subtitle={project.description || 'Project description...'}
                        isExpanded={expandedId === project.id}
                        isDragging={draggedIndex === index}
                        isDragOver={dragOverIndex === index && draggedIndex !== index}
                        onToggleExpand={() => setExpandedId(expandedId === project.id ? null : project.id)}
                        onRemove={() => removeProject(project.id)}
                        onDragStart={handleDragStart}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onDragEnd={handleDragEnd}
                    >
                        <Input
                            label="Project Name"
                            value={project.name}
                            onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                            placeholder="My Awesome Project"
                            className="mb-4"
                        />

                        <Textarea
                            label="Description"
                            value={project.description}
                            onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                            rows={3}
                            placeholder="Brief description of the project..."
                            className="mb-4"
                        />

                        <FormSection>
                            <Input
                                label="GitHub URL (optional)"
                                type="url"
                                value={project.github || ''}
                                onChange={(e) => updateProject(project.id, 'github', e.target.value)}
                                placeholder="https://github.com/username/project"
                            />
                            <Input
                                label="Live Demo URL (optional)"
                                type="url"
                                value={project.demo || ''}
                                onChange={(e) => updateProject(project.id, 'demo', e.target.value)}
                                placeholder="https://myproject.com"
                            />
                        </FormSection>

                        <DynamicFormList
                            label="Key Highlights"
                            items={project.highlights}
                            onItemChange={(index, value) => updateHighlight(project.id, index, value)}
                            onAddItem={() => addHighlight(project.id)}
                            onRemoveItem={(index) => removeHighlight(project.id, index)}
                            placeholder="Key achievement or feature..."
                            addButtonText="Add highlight"
                        />

                        <TagInput
                            label="Technologies Used (comma-separated)"
                            value={getTechInputValue(project.id)}
                            placeholder="React, Node.js, MongoDB, Docker"
                            tags={project.technologies}
                            onChange={(value) => handleTechnologiesChange(project.id, value)}
                        />
                    </DraggableCard>
                ))}
            </div>

            {projects.length === 0 && (
                <EmptyState
                    icon={FolderOpen}
                    title="No projects added yet."
                    description='Click "Add Project" to showcase your work.'
                />
            )}
        </EditorCard>
    );
};