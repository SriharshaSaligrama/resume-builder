import { useState } from 'react';
import { Skill } from '../types/resume';

export const useSkillsEditor = (skills: Skill[], onChange: (skills: Skill[]) => void) => {
    const [skillInputs, setSkillInputs] = useState<Record<number, string>>({});

    const addSkillCategory = () => {
        const newSkill: Skill = {
            category: '',
            items: [],
        };
        const newIndex = skills.length;
        onChange([...skills, newSkill]);
        setSkillInputs(prev => ({ ...prev, [newIndex]: '' }));
    };

    const updateSkillCategory = (index: number, category: string) => {
        const newSkills = [...skills];
        newSkills[index].category = category;
        onChange(newSkills);
    };

    const handleSkillItemsChange = (index: number, value: string) => {
        setSkillInputs(prev => ({ ...prev, [index]: value }));

        const newSkills = [...skills];
        newSkills[index].items = value
            .split(',')
            .map((item) => item.trim())
            .filter((item) => item.length > 0);
        onChange(newSkills);
    };

    const removeSkillCategory = (index: number) => {
        onChange(skills.filter((_, i) => i !== index));
        setSkillInputs(prev => {
            const newInputs = { ...prev };
            delete newInputs[index];
            const reindexed: Record<number, string> = {};
            Object.entries(newInputs).forEach(([key, value]) => {
                const oldIndex = parseInt(key);
                if (oldIndex > index) {
                    reindexed[oldIndex - 1] = value;
                } else if (oldIndex < index) {
                    reindexed[oldIndex] = value;
                }
            });
            return reindexed;
        });
    };

    const getSkillInputValue = (index: number) => {
        if (skillInputs[index] !== undefined) {
            return skillInputs[index];
        }
        return skills[index] ? skills[index].items.join(', ') : '';
    };

    return {
        skillInputs,
        addSkillCategory,
        updateSkillCategory,
        handleSkillItemsChange,
        removeSkillCategory,
        getSkillInputValue,
    };
};