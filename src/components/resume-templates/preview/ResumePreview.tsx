import React from 'react';
import { Resume, TemplateId, FontFamily, LayoutStyle } from '../../../types/resume';
import { UnifiedTemplate } from '../templates/UnifiedTemplate';

interface ResumePreviewProps {
    resume: Resume;
    templateId?: TemplateId;
    fontFamily?: FontFamily;
    layoutStyle?: LayoutStyle;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({
    resume,
    templateId = 'modern-blue',
    fontFamily = 'inter',
    layoutStyle = 'single-column'
}) => {
    return (
        <UnifiedTemplate
            resume={resume}
            templateId={templateId}
            fontFamily={fontFamily}
            layoutStyle={layoutStyle}
        />
    );
};