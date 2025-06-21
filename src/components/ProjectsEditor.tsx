import React, { useState } from 'react';
import { Project } from '../types/resume';
import { FolderOpen, Plus, Trash2 } from 'lucide-react';
import { EditorCard } from './ui/EditorCard';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { ActionButton } from './ui/ActionButton';
import { DraggableCard } from './ui/DraggableCard';
import { TagInput } from './ui/TagInput';
import { EmptyState } from './ui/EmptyState';

interface ProjectsEditorProps {
    projects: Project[];
    onChange: (projects: Project[]) => void;
}

export const ProjectsEditor: React.FC<ProjectsEditorProps> = ({
    projects,
    onChange,
}) => {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [techInputs, setTechInputs] = useState<Record<string, string>>({});
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

    const addProject = () => {
        const newProject: Project = {
            id: Date.now().toString(),
            name: '',
            description: '',
            technologies: [],
            highlights: [''],
        };
        onChange([...projects, newProject]);
        setExpandedId(newProject.id);
        setTechInputs(prev => ({ ...prev, [newProject.id]: '' }));
    };

    const updateProject = <K extends keyof Project>(id: string, field: K, value: Project[K]) => {
        onChange(
            projects.map((project) =>
                project.id === id ? { ...project, [field]: value } : project
            )
        );
    };

    const removeProject = (id: string) => {
        onChange(projects.filter((project) => project.id !== id));
        setTechInputs(prev => {
            const newInputs = { ...prev };
            delete newInputs[id];
            return newInputs;
        });
    };

    const updateHighlight = (id: string, index: number, value: string) => {
        const project = projects.find((proj) => proj.id === id);
        if (project) {
            const newHighlights = [...project.highlights];
            newHighlights[index] = value;
            updateProject(id, 'highlights', newHighlights);
        }
    };

    const addHighlight = (id: string) => {
        const project = projects.find((proj) => proj.id === id);
        if (project) {
            updateProject(id, 'highlights', [...project.highlights, '']);
        }
    };

    const removeHighlight = (id: string, index: number) => {
        const project = projects.find((proj) => proj.id === id);
        if (project && project.highlights.length > 1) {
            const newHighlights = project.highlights.filter((_, i) => i !== index);
            updateProject(id, 'highlights', newHighlights);
        }
    };

    const handleTechnologiesChange = (id: string, value: string) => {
        setTechInputs(prev => ({ ...prev, [id]: value }));
        const technologies = value
            .split(',')
            .map((tech) => tech.trim())
            .filter((tech) => tech.length > 0);
        updateProject(id, 'technologies', technologies);
    };

    const getTechInputValue = (id: string) => {
        if (techInputs[id] !== undefined) {
            return techInputs[id];
        }
        const project = projects.find(proj => proj.id === id);
        return project ? project.technologies.join(', ') : '';
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

        const newProjects = [...projects];
        const draggedItem = newProjects[draggedIndex];

        newProjects.splice(draggedIndex, 1);
        newProjects.splice(dropIndex, 0, draggedItem);

        onChange(newProjects);
        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
        setDragOverIndex(null);
    };

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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Key Highlights
                            </label>
                            {project.highlights.map((highlight, index) => (
                                <div key={index} className="flex gap-2 mb-2">
                                    <Textarea
                                        value={highlight}
                                        onChange={(e) => updateHighlight(project.id, index, e.target.value)}
                                        rows={2}
                                        placeholder="Key achievement or feature..."
                                        className="flex-1"
                                    />
                                    {project.highlights.length > 1 && (
                                        <ActionButton
                                            variant="danger"
                                            onClick={() => removeHighlight(project.id, index)}
                                            className="p-1"
                                        >
                                            <Trash2 size={16} />
                                        </ActionButton>
                                    )}
                                </div>
                            ))}
                            <ActionButton
                                variant="secondary"
                                onClick={() => addHighlight(project.id)}
                                icon={Plus}
                                className="text-sm"
                            >
                                Add highlight
                            </ActionButton>
                        </div>

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