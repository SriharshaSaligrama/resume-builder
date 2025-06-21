import { useState } from 'react';
import { Experience } from '../types/resume';

export const useExperienceEditor = (experiences: Experience[], onChange: (experiences: Experience[]) => void) => {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [techInputs, setTechInputs] = useState<Record<string, string>>({});

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

    return {
        expandedId,
        setExpandedId,
        techInputs,
        addExperience,
        updateExperience,
        removeExperience,
        updateDescription,
        addDescriptionPoint,
        removeDescriptionPoint,
        handleTechnologiesChange,
        getTechInputValue,
    };
};