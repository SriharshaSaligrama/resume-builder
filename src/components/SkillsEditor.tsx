import React, { useState } from 'react';
import { Skill } from '../types/resume';
import { Code, Plus, Trash2 } from 'lucide-react';

interface SkillsEditorProps {
  skills: Skill[];
  onChange: (skills: Skill[]) => void;
}

export const SkillsEditor: React.FC<SkillsEditorProps> = ({
  skills,
  onChange,
}) => {
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
    // Update the input state
    setSkillInputs(prev => ({ ...prev, [index]: value }));
    
    // Update the skills array
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
      // Reindex remaining inputs
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
    // If we have a stored input value, use it; otherwise use the joined items
    if (skillInputs[index] !== undefined) {
      return skillInputs[index];
    }
    return skills[index] ? skills[index].items.join(', ') : '';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Code size={20} />
          Technical Skills
        </h2>
        <button
          onClick={addSkillCategory}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          Add Category
        </button>
      </div>

      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex gap-4 items-start">
              <div className="flex-1">
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={skill.category}
                    onChange={(e) => updateSkillCategory(index, e.target.value)}
                    placeholder="e.g., Programming Languages, Frameworks, Tools"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Skills (comma-separated)
                  </label>
                  <textarea
                    value={getSkillInputValue(index)}
                    onChange={(e) => handleSkillItemsChange(index, e.target.value)}
                    rows={2}
                    placeholder="JavaScript, Python, React, Node.js"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
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
              <button
                onClick={() => removeSkillCategory(index)}
                className="text-red-600 hover:text-red-800 p-1 mt-6"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {skills.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Code size={48} className="mx-auto mb-3 opacity-30" />
          <p>No skill categories added yet.</p>
          <p className="text-sm">Click "Add Category" to get started.</p>
        </div>
      )}
    </div>
  );
};