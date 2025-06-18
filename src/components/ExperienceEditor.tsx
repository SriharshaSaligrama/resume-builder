import React, { useState } from 'react';
import { Experience } from '../types/resume';
import { Briefcase, Plus, Trash2, GripVertical } from 'lucide-react';

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
    
    // Remove the dragged item from its original position
    newExperiences.splice(draggedIndex, 1);
    
    // Calculate the correct insertion index
    // If we're moving the item to a position after its original position,
    // we need to account for the fact that we've already removed it
    // Insert the item at the new position
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Briefcase size={20} />
          Work Experience
        </h2>
        <button
          onClick={addExperience}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          Add Experience
        </button>
      </div>

      <div className="space-y-4">
        {experiences.map((experience, index) => (
          <div
            key={experience.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            className={`border border-gray-200 rounded-lg p-4 transition-all duration-200 ${
              draggedIndex === index ? 'opacity-50 scale-95' : ''
            } ${
              dragOverIndex === index && draggedIndex !== index
                ? 'border-blue-400 bg-blue-50 transform scale-102'
                : ''
            } cursor-move hover:shadow-md`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <GripVertical 
                  size={16} 
                  className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing" 
                />
                <button
                  onClick={() =>
                    setExpandedId(expandedId === experience.id ? null : experience.id)
                  }
                  className="text-left flex-1"
                >
                  <h3 className="font-medium text-gray-800">
                    {experience.position || 'New Position'} at{' '}
                    {experience.company || 'Company Name'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {experience.startDate} - {experience.current ? 'Present' : experience.endDate}
                  </p>
                </button>
              </div>
              <button
                onClick={() => removeExperience(experience.id)}
                className="text-red-600 hover:text-red-800 p-1"
              >
                <Trash2 size={16} />
              </button>
            </div>

            {expandedId === experience.id && (
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      value={experience.company}
                      onChange={(e) =>
                        updateExperience(experience.id, 'company', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Position
                    </label>
                    <input
                      type="text"
                      value={experience.position}
                      onChange={(e) =>
                        updateExperience(experience.id, 'position', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="text"
                      value={experience.startDate}
                      onChange={(e) =>
                        updateExperience(experience.id, 'startDate', e.target.value)
                      }
                      placeholder="Jan 2023"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="text"
                      value={experience.endDate}
                      onChange={(e) =>
                        updateExperience(experience.id, 'endDate', e.target.value)
                      }
                      placeholder="Present"
                      disabled={experience.current}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="flex items-center gap-2 mt-6">
                      <input
                        type="checkbox"
                        checked={experience.current}
                        onChange={(e) =>
                          updateExperience(experience.id, 'current', e.target.checked)
                        }
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Current position</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={experience.location}
                    onChange={(e) =>
                      updateExperience(experience.id, 'location', e.target.value)
                    }
                    placeholder="San Francisco, CA"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  {experience.description.map((desc, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <textarea
                        value={desc}
                        onChange={(e) =>
                          updateDescription(experience.id, index, e.target.value)
                        }
                        rows={2}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="Describe your achievements and responsibilities..."
                      />
                      {experience.description.length > 1 && (
                        <button
                          onClick={() => removeDescriptionPoint(experience.id, index)}
                          className="text-red-600 hover:text-red-800 p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => addDescriptionPoint(experience.id)}
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                  >
                    <Plus size={14} />
                    Add bullet point
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Technologies Used (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={getTechInputValue(experience.id)}
                    onChange={(e) => handleTechnologiesChange(experience.id, e.target.value)}
                    placeholder="React, Node.js, PostgreSQL, AWS"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {experience.technologies.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {experience.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {experiences.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Briefcase size={48} className="mx-auto mb-3 opacity-30" />
          <p>No work experience added yet.</p>
          <p className="text-sm">Click "Add Experience" to get started.</p>
        </div>
      )}
    </div>
  );
};