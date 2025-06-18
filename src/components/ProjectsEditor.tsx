import React, { useState } from 'react';
import { Project } from '../types/resume';
import { FolderOpen, Plus, Trash2, GripVertical } from 'lucide-react';

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
    
    // Remove the dragged item from its original position
    newProjects.splice(draggedIndex, 1);
    
    // Calculate the correct insertion index
    // If we're moving the item to a position after its original position,
    // we need to account for the fact that we've already removed it    
    // Insert the item at the new position
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <FolderOpen size={20} />
          Projects
        </h2>
        <button
          onClick={addProject}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          Add Project
        </button>
      </div>

      <div className="space-y-4">
        {projects.map((project, index) => (
          <div
            key={project.id}
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
                    setExpandedId(expandedId === project.id ? null : project.id)
                  }
                  className="text-left flex-1"
                >
                  <h3 className="font-medium text-gray-800 break-words">
                    {project.name || 'New Project'}
                  </h3>
                  <p className="text-sm text-gray-600 break-words line-clamp-2 mt-1">
                    {project.description || 'Project description...'}
                  </p>
                </button>
              </div>
              <button
                onClick={() => removeProject(project.id)}
                className="text-red-600 hover:text-red-800 p-1 flex-shrink-0 ml-2"
              >
                <Trash2 size={16} />
              </button>
            </div>

            {expandedId === project.id && (
              <div className="space-y-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={project.name}
                    onChange={(e) =>
                      updateProject(project.id, 'name', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="My Awesome Project"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={project.description}
                    onChange={(e) =>
                      updateProject(project.id, 'description', e.target.value)
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Brief description of the project..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      GitHub URL (optional)
                    </label>
                    <input
                      type="url"
                      value={project.github || ''}
                      onChange={(e) =>
                        updateProject(project.id, 'github', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://github.com/username/project"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Live Demo URL (optional)
                    </label>
                    <input
                      type="url"
                      value={project.demo || ''}
                      onChange={(e) =>
                        updateProject(project.id, 'demo', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://myproject.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Key Highlights
                  </label>
                  {project.highlights.map((highlight, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <textarea
                        value={highlight}
                        onChange={(e) =>
                          updateHighlight(project.id, index, e.target.value)
                        }
                        rows={2}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        placeholder="Key achievement or feature..."
                      />
                      {project.highlights.length > 1 && (
                        <button
                          onClick={() => removeHighlight(project.id, index)}
                          className="text-red-600 hover:text-red-800 p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => addHighlight(project.id)}
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                  >
                    <Plus size={14} />
                    Add highlight
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Technologies Used (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={getTechInputValue(project.id)}
                    onChange={(e) => handleTechnologiesChange(project.id, e.target.value)}
                    placeholder="React, Node.js, MongoDB, Docker"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {project.technologies.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {project.technologies.map((tech, index) => (
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

      {projects.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <FolderOpen size={48} className="mx-auto mb-3 opacity-30" />
          <p>No projects added yet.</p>
          <p className="text-sm">Click "Add Project" to showcase your work.</p>
        </div>
      )}
    </div>
  );
};