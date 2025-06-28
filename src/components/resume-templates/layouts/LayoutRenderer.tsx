import React from 'react';
import { Resume, LayoutStyle } from '../../../types/resume';
import { ColorTheme } from '../data/colors';
import { SummarySection } from '../sections/SummarySection';
import { ExperienceSection } from '../sections/ExperienceSection';
import { ProjectsSection } from '../sections/ProjectsSection';
import { SkillsSection } from '../sections/SkillsSection';
import { EducationSection } from '../sections/EducationSection';

interface LayoutRendererProps {
    resume: Resume;
    layoutStyle: LayoutStyle;
    colors: ColorTheme;
}

export const LayoutRenderer: React.FC<LayoutRendererProps> = ({
    resume,
    layoutStyle,
    colors,
}) => {
    const renderSingleColumn = () => (
        <div className="p-6 print:p-4 print:pt-0">
            <SummarySection summary={resume.personalInfo.summary} colors={colors} />
            <ExperienceSection experiences={resume.experiences} colors={colors} stackDetails={false} />
            <SkillsSection skills={resume.skills} colors={colors} />
            <ProjectsSection projects={resume.projects} colors={colors} stackUrls={false} />
            <EducationSection education={resume.education} colors={colors} stackDetails={false} />
        </div>
    );

    const renderTwoColumn = () => (
        <div className="p-6 print:p-4 print:pt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 print:grid-cols-2 gap-6 print:gap-4">
                <div className="space-y-6 print:space-y-4">
                    <SummarySection summary={resume.personalInfo.summary} colors={colors} />
                    <ExperienceSection experiences={resume.experiences} colors={colors} stackDetails={true} />
                    <SkillsSection skills={resume.skills} colors={colors} />
                </div>
                <div className="space-y-6 print:space-y-4">
                    <ProjectsSection projects={resume.projects} colors={colors} stackUrls={true} />
                    <EducationSection education={resume.education} colors={colors} stackDetails={true} />
                </div>
            </div>
        </div>
    );

    const renderSidebarLeft = () => (
        <div className="p-6 print:p-4 print:pt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 print:grid-cols-3 gap-6 print:gap-4">
                <div className="lg:col-span-1 print:col-span-1 space-y-6 print:space-y-4">
                    <SkillsSection skills={resume.skills} colors={colors} />
                    <EducationSection education={resume.education} colors={colors} stackDetails={true} />
                </div>
                <div className="lg:col-span-2 print:col-span-2 space-y-6 print:space-y-4">
                    <SummarySection summary={resume.personalInfo.summary} colors={colors} />
                    <ExperienceSection experiences={resume.experiences} colors={colors} stackDetails={true} />
                    <ProjectsSection projects={resume.projects} colors={colors} stackUrls={true} />
                </div>
            </div>
        </div>
    );

    const renderSidebarRight = () => (
        <div className="p-6 print:p-4 print:pt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 print:grid-cols-3 gap-6 print:gap-4">
                <div className="lg:col-span-2 print:col-span-2 space-y-6 print:space-y-4">
                    <SummarySection summary={resume.personalInfo.summary} colors={colors} />
                    <ExperienceSection experiences={resume.experiences} colors={colors} stackDetails={true} />
                    <ProjectsSection projects={resume.projects} colors={colors} stackUrls={true} />
                </div>
                <div className="lg:col-span-1 print:col-span-1 space-y-6 print:space-y-4">
                    <SkillsSection skills={resume.skills} colors={colors} />
                    <EducationSection education={resume.education} colors={colors} stackDetails={true} />
                </div>
            </div>
        </div>
    );

    const renderCompact = () => (
        <div className="p-4 print:p-3 print:pt-0 text-sm print:text-xs">
            <div className="space-y-4 print:space-y-3">
                <SummarySection summary={resume.personalInfo.summary} colors={colors} />
                <ExperienceSection experiences={resume.experiences} colors={colors} stackDetails={false} />
                <SkillsSection skills={resume.skills} colors={colors} />
                <ProjectsSection projects={resume.projects} colors={colors} stackUrls={false} />
                <EducationSection education={resume.education} colors={colors} stackDetails={false} />
            </div>
        </div>
    );

    switch (layoutStyle) {
        case 'two-column':
            return renderTwoColumn();
        case 'sidebar-left':
            return renderSidebarLeft();
        case 'sidebar-right':
            return renderSidebarRight();
        case 'compact':
            return renderCompact();
        default:
            return renderSingleColumn();
    }
};