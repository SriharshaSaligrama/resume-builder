import React from 'react';
import { Education } from '../types/resume';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';

interface EducationEditorProps {
    education: Education[];
    onChange: (education: Education[]) => void;
}

export const EducationEditor: React.FC<EducationEditorProps> = ({
    education,
    onChange,
}) => {
    const addEducation = () => {
        const newEducation: Education = {
            id: Date.now().toString(),
            institution: '',
            degree: '',
            field: '',
            graduationDate: '',
            location: '',
        };
        onChange([...education, newEducation]);
    };

    const updateEducation = (id: string, field: keyof Education, value: string) => {
        onChange(
            education.map((edu) =>
                edu.id === id ? { ...edu, [field]: value } : edu
            )
        );
    };

    const removeEducation = (id: string) => {
        onChange(education.filter((edu) => edu.id !== id));
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <GraduationCap size={20} />
                    Education
                </h2>
                <button
                    onClick={addEducation}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    <Plus size={16} />
                    Add Education
                </button>
            </div>

            <div className="space-y-4">
                {education.map((edu) => (
                    <div
                        key={edu.id}
                        className="border border-gray-200 rounded-lg p-4"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="font-medium text-gray-800">
                                {edu.degree ? `${edu.degree} in ${edu.field}` : 'New Education Entry'}
                            </h3>
                            <button
                                onClick={() => removeEducation(edu.id)}
                                className="text-red-600 hover:text-red-800 p-1"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Institution
                                </label>
                                <input
                                    type="text"
                                    value={edu.institution}
                                    onChange={(e) =>
                                        updateEducation(edu.id, 'institution', e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="University of California, Berkeley"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    value={edu.location}
                                    onChange={(e) =>
                                        updateEducation(edu.id, 'location', e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Berkeley, CA"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Degree
                                </label>
                                <input
                                    type="text"
                                    value={edu.degree}
                                    onChange={(e) =>
                                        updateEducation(edu.id, 'degree', e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Bachelor of Science"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Field of Study
                                </label>
                                <input
                                    type="text"
                                    value={edu.field}
                                    onChange={(e) =>
                                        updateEducation(edu.id, 'field', e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Computer Science"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Graduation Date
                                </label>
                                <input
                                    type="text"
                                    value={edu.graduationDate}
                                    onChange={(e) =>
                                        updateEducation(edu.id, 'graduationDate', e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="May 2020"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    GPA (optional)
                                </label>
                                <input
                                    type="text"
                                    value={edu.gpa || ''}
                                    onChange={(e) =>
                                        updateEducation(edu.id, 'gpa', e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="3.8/4.0"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {education.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    <GraduationCap size={48} className="mx-auto mb-3 opacity-30" />
                    <p>No education entries added yet.</p>
                    <p className="text-sm">Click "Add Education" to get started.</p>
                </div>
            )}
        </div>
    );
};