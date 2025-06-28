import React from 'react';
import { Resume, FontFamily, LayoutStyle, TemplateId } from '../../../types/resume';
import { resumeFonts } from '../../../data/fonts';
import { resumeTemplates } from '../../../data/templates';
import { getColorTheme } from '../data/colors';
import { ResumeHeader } from '../sections/ResumeHeader';
import { LayoutRenderer } from '../layouts/LayoutRenderer';

interface UnifiedTemplateProps {
    resume: Resume;
    templateId: TemplateId;
    fontFamily?: FontFamily;
    layoutStyle?: LayoutStyle;
}

export const UnifiedTemplate: React.FC<UnifiedTemplateProps> = ({
    resume,
    templateId,
    fontFamily = 'inter',
    layoutStyle = 'single-column'
}) => {
    const selectedFont = resumeFonts.find(font => font.id === fontFamily);
    const fontFamilyStyle = selectedFont?.fontFamily || 'Inter, system-ui, -apple-system, sans-serif';

    const template = resumeTemplates.find(t => t.id === templateId);
    const primaryColor = template?.primaryColor || 'blue';

    const colors = getColorTheme(primaryColor);

    return (
        <div
            className="bg-white shadow-lg max-w-4xl mx-auto min-h-screen print:shadow-none print:max-w-none print:mx-0"
            style={{ fontFamily: fontFamilyStyle }}
        >
            <div className="resume-header">
                <ResumeHeader personalInfo={resume.personalInfo} colors={colors} />
            </div>
            <LayoutRenderer resume={resume} layoutStyle={layoutStyle} colors={colors} />
        </div>
    );
};