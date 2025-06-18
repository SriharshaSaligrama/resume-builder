import React from 'react';
import { PersonalInfo } from '../types/resume';
import { User, Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface PersonalInfoEditorProps {
    personalInfo: PersonalInfo;
    onChange: (personalInfo: PersonalInfo) => void;
}

export const PersonalInfoEditor: React.FC<PersonalInfoEditorProps> = ({
    personalInfo,
    onChange,
}) => {
    const handleChange = (field: keyof PersonalInfo, value: string) => {
        onChange({ ...personalInfo, [field]: value });
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <User size={20} />
                Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                    </label>
                    <input
                        type="text"
                        value={personalInfo.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="John Doe"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Professional Title
                    </label>
                    <input
                        type="text"
                        value={personalInfo.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Senior Software Engineer"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                        <Mail size={14} />
                        Email
                    </label>
                    <input
                        type="email"
                        value={personalInfo.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="john@example.com"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                        <Phone size={14} />
                        Phone
                    </label>
                    <input
                        type="tel"
                        value={personalInfo.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+1 (555) 123-4567"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                        <MapPin size={14} />
                        Location
                    </label>
                    <input
                        type="text"
                        value={personalInfo.location}
                        onChange={(e) => handleChange('location', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="San Francisco, CA"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                        <Globe size={14} />
                        Portfolio
                    </label>
                    <input
                        type="url"
                        value={personalInfo.portfolio}
                        onChange={(e) => handleChange('portfolio', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://johndoe.dev"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                        <Linkedin size={14} />
                        LinkedIn
                    </label>
                    <input
                        type="url"
                        value={personalInfo.linkedin}
                        onChange={(e) => handleChange('linkedin', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://linkedin.com/in/johndoe"
                    />
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                        <Github size={14} />
                        GitHub
                    </label>
                    <input
                        type="url"
                        value={personalInfo.github}
                        onChange={(e) => handleChange('github', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://github.com/johndoe"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Professional Summary
                </label>
                <textarea
                    value={personalInfo.summary}
                    onChange={(e) => handleChange('summary', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Brief summary of your experience and skills..."
                />
            </div>
        </div>
    );
};