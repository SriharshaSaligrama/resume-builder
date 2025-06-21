import React from 'react';
import { Resume, TemplateId, FontFamily, LayoutStyle } from '../types/resume';
import { PersonalInfoEditor } from './PersonalInfoEditor';
import { ExperienceEditor } from './ExperienceEditor';
import { ProjectsEditor } from './ProjectsEditor';
import { SkillsEditor } from './SkillsEditor';
import { EducationEditor } from './EducationEditor';
import { TemplateSelector } from './TemplateSelector';

interface TabContentProps {
    activeTab: string;
    resume: Resume;
    selectedTemplate: TemplateId;
    selectedFont: FontFamily;
    selectedLayout: LayoutStyle;
    onResumeChange: (resume: Resume) => void;
    onTemplateChange: (templateId: TemplateId) => void;
    onFontChange: (fontId: FontFamily) => void;
    onLayoutChange: (layoutId: LayoutStyle) => void;
}

export const TabContent: React.FC<TabContentProps> = ({
    activeTab,
    resume,
    selectedTemplate,
    selectedFont,
    selectedLayout,
    onResumeChange,
    onTemplateChange,
    onFontChange,
    onLayoutChange,
}) => {
    const tabComponents = {
        personal: (
            <PersonalInfoEditor
                personalInfo={resume.personalInfo}
                onChange={(personalInfo) => onResumeChange({ ...resume, personalInfo })}
            />
        ),
        experience: (
            <ExperienceEditor
                experiences={resume.experiences}
                onChange={(experiences) => onResumeChange({ ...resume, experiences })}
            />
        ),
        projects: (
            <ProjectsEditor
                projects={resume.projects}
                onChange={(projects) => onResumeChange({ ...resume, projects })}
            />
        ),
        skills: (
            <SkillsEditor
                skills={resume.skills}
                onChange={(skills) => onResumeChange({ ...resume, skills })}
            />
        ),
        education: (
            <EducationEditor
                education={resume.education}
                onChange={(education) => onResumeChange({ ...resume, education })}
            />
        ),
        template: (
            <TemplateSelector
                selectedTemplate={selectedTemplate}
                selectedFont={selectedFont}
                selectedLayout={selectedLayout}
                onTemplateChange={onTemplateChange}
                onFontChange={onFontChange}
                onLayoutChange={onLayoutChange}
            />
        ),
    };

    return (
        <div className="min-h-[600px]">
            {tabComponents[activeTab as keyof typeof tabComponents] || (
                <div className="text-center py-8 text-gray-500">
                    <p>Tab content not found</p>
                </div>
            )}
        </div>
    );
};