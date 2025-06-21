import { useState } from 'react';
import { Project } from '../types/resume';

export const useProjectsEditor = (projects: Project[], onChange: (projects: Project[]) => void) => {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [techInputs, setTechInputs] = useState<Record<string, string>>({});

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

    return {
        expandedId,
        setExpandedId,
        techInputs,
        addProject,
        updateProject,
        removeProject,
        updateHighlight,
        addHighlight,
        removeHighlight,
        handleTechnologiesChange,
        getTechInputValue,
    };
};