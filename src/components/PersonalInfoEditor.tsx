import React from 'react';
import { PersonalInfo } from '../types/resume';
import { User, Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';
import { EditorCard } from './ui/EditorCard';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';

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
        <EditorCard title="Personal Information" icon={User}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input
                    label="Full Name"
                    value={personalInfo.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    placeholder="John Doe"
                />

                <Input
                    label="Professional Title"
                    value={personalInfo.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="Senior Software Engineer"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input
                    label="Email"
                    icon={Mail}
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="john@example.com"
                />

                <Input
                    label="Phone"
                    icon={Phone}
                    type="tel"
                    value={personalInfo.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input
                    label="Location"
                    icon={MapPin}
                    value={personalInfo.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    placeholder="San Francisco, CA"
                />

                <Input
                    label="Portfolio"
                    icon={Globe}
                    type="url"
                    value={personalInfo.portfolio}
                    onChange={(e) => handleChange('portfolio', e.target.value)}
                    placeholder="https://johndoe.dev"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input
                    label="LinkedIn"
                    icon={Linkedin}
                    type="url"
                    value={personalInfo.linkedin}
                    onChange={(e) => handleChange('linkedin', e.target.value)}
                    placeholder="https://linkedin.com/in/johndoe"
                />

                <Input
                    label="GitHub"
                    icon={Github}
                    type="url"
                    value={personalInfo.github}
                    onChange={(e) => handleChange('github', e.target.value)}
                    placeholder="https://github.com/johndoe"
                />
            </div>

            <Textarea
                label="Professional Summary"
                value={personalInfo.summary}
                onChange={(e) => handleChange('summary', e.target.value)}
                rows={4}
                placeholder="Brief summary of your experience and skills..."
            />
        </EditorCard>
    );
};