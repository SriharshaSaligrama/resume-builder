import React from 'react';
import { LayoutStyle } from '../../../types/resume';
import { resumeLayouts } from '../../../data/layouts';
import { Layout } from 'lucide-react';
import { LayoutPreview } from './LayoutPreview';

interface LayoutSelectorProps {
    selectedLayout: LayoutStyle;
    onLayoutChange: (layoutId: LayoutStyle) => void;
}

export const LayoutSelector: React.FC<LayoutSelectorProps> = ({
    selectedLayout,
    onLayoutChange,
}) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
                <Layout size={20} />
                <h2 className="text-xl font-semibold text-gray-800">Choose Layout</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {resumeLayouts.map((layout) => (
                    <LayoutPreview
                        key={layout.id}
                        layout={layout}
                        isSelected={selectedLayout === layout.id}
                        onSelect={onLayoutChange}
                    />
                ))}
            </div>
        </div>
    );
};