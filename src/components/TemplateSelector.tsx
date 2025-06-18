import React from 'react';
import { TemplateId, FontFamily, LayoutStyle } from '../types/resume';
import { resumeTemplates } from '../data/templates';
import { FontSelector } from './FontSelector';
import { LayoutSelector } from './LayoutSelector';
import { Palette, Check } from 'lucide-react';

interface TemplateSelectorProps {
  selectedTemplate: TemplateId;
  selectedFont: FontFamily;
  selectedLayout: LayoutStyle;
  onTemplateChange: (templateId: TemplateId) => void;
  onFontChange: (fontId: FontFamily) => void;
  onLayoutChange: (layoutId: LayoutStyle) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  selectedFont,
  selectedLayout,
  onTemplateChange,
  onFontChange,
  onLayoutChange,
}) => {
  const getColorClasses = (primaryColor: string) => {
    const colorMap = {
      blue: 'from-blue-600 to-blue-800',
      purple: 'from-purple-600 to-purple-800',
      emerald: 'from-emerald-600 to-emerald-800',
      orange: 'from-orange-600 to-orange-800',
      gray: 'from-gray-600 to-gray-800',
    };
    return colorMap[primaryColor as keyof typeof colorMap] || 'from-blue-600 to-blue-800';
  };

  const getBorderColor = (primaryColor: string) => {
    const colorMap = {
      blue: 'border-blue-500',
      purple: 'border-purple-500',
      emerald: 'border-emerald-500',
      orange: 'border-orange-500',
      gray: 'border-gray-500',
    };
    return colorMap[primaryColor as keyof typeof colorMap] || 'border-blue-500';
  };

  return (
    <div className="space-y-6">
      {/* Template Selection */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Palette size={20} />
          <h2 className="text-xl font-semibold text-gray-800">Choose Color Theme</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resumeTemplates.map((template) => (
            <div
              key={template.id}
              onClick={() => onTemplateChange(template.id)}
              className={`relative cursor-pointer rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                selectedTemplate === template.id
                  ? `${getBorderColor(template.primaryColor)} bg-${template.primaryColor}-50`
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Template Preview */}
              <div className="p-4">
                <div className={`h-24 rounded-md bg-gradient-to-r ${getColorClasses(template.primaryColor)} mb-3 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-white bg-opacity-10">
                    <div className="p-3 text-white">
                      <div className="h-2 bg-white bg-opacity-80 rounded mb-1 w-3/4"></div>
                      <div className="h-1.5 bg-white bg-opacity-60 rounded mb-2 w-1/2"></div>
                      <div className="flex gap-1">
                        <div className="h-1 bg-white bg-opacity-40 rounded w-8"></div>
                        <div className="h-1 bg-white bg-opacity-40 rounded w-8"></div>
                        <div className="h-1 bg-white bg-opacity-40 rounded w-8"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-800">{template.name}</h3>
                  <p className="text-sm text-gray-600">{template.description}</p>
                </div>
              </div>
              
              {/* Selection Indicator */}
              {selectedTemplate === template.id && (
                <div className={`absolute top-2 right-2 w-6 h-6 bg-${template.primaryColor}-600 rounded-full flex items-center justify-center`}>
                  <Check size={14} className="text-white" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Layout Selection */}
      <LayoutSelector 
        selectedLayout={selectedLayout}
        onLayoutChange={onLayoutChange}
      />

      {/* Font Selection */}
      <FontSelector 
        selectedFont={selectedFont}
        onFontChange={onFontChange}
      />
    </div>
  );
};