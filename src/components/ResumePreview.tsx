import React from 'react';
import { Resume, TemplateId, FontFamily, LayoutStyle } from '../types/resume';
import { ModernBlueTemplate } from './templates/ModernBlueTemplate';
import { ElegantPurpleTemplate } from './templates/ElegantPurpleTemplate';
import { ProfessionalGreenTemplate } from './templates/ProfessionalGreenTemplate';
import { CreativeOrangeTemplate } from './templates/CreativeOrangeTemplate';
import { MinimalGrayTemplate } from './templates/MinimalGrayTemplate';

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
  const renderTemplate = () => {
    const templateProps = { resume, fontFamily, layoutStyle };
    
    switch (templateId) {
      case 'modern-blue':
        return <ModernBlueTemplate {...templateProps} />;
      case 'elegant-purple':
        return <ElegantPurpleTemplate {...templateProps} />;
      case 'professional-green':
        return <ProfessionalGreenTemplate {...templateProps} />;
      case 'creative-orange':
        return <CreativeOrangeTemplate {...templateProps} />;
      case 'minimal-gray':
        return <MinimalGrayTemplate {...templateProps} />;
      default:
        return <ModernBlueTemplate {...templateProps} />;
    }
  };

  return renderTemplate();
};