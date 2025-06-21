import React from 'react';
import { LayoutStyle } from '../types/resume';
import { resumeLayouts } from '../data/layouts';
import { Layout, Check } from 'lucide-react';

interface LayoutSelectorProps {
    selectedLayout: LayoutStyle;
    onLayoutChange: (layoutId: LayoutStyle) => void;
}

export const LayoutSelector: React.FC<LayoutSelectorProps> = ({
    selectedLayout,
    onLayoutChange,
}) => {
    const getLayoutPreview = (layoutId: LayoutStyle) => {
        switch (layoutId) {
            case 'single-column':
                return (
                    <div className="h-20 bg-gray-100 rounded p-2 space-y-1">
                        <div className="h-2 bg-gray-300 rounded w-full"></div>
                        <div className="h-1.5 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-1.5 bg-gray-200 rounded w-full"></div>
                        <div className="h-1.5 bg-gray-200 rounded w-2/3"></div>
                        <div className="h-1.5 bg-gray-200 rounded w-full"></div>
                    </div>
                );
            case 'two-column':
                return (
                    <div className="h-20 bg-gray-100 rounded p-2 flex gap-2">
                        <div className="flex-1 space-y-1">
                            <div className="h-2 bg-gray-300 rounded w-full"></div>
                            <div className="h-1.5 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-1.5 bg-gray-200 rounded w-full"></div>
                            <div className="h-1.5 bg-gray-200 rounded w-2/3"></div>
                        </div>
                        <div className="flex-1 space-y-1">
                            <div className="h-2 bg-gray-300 rounded w-full"></div>
                            <div className="h-1.5 bg-gray-200 rounded w-2/3"></div>
                            <div className="h-1.5 bg-gray-200 rounded w-full"></div>
                            <div className="h-1.5 bg-gray-200 rounded w-3/4"></div>
                        </div>
                    </div>
                );
            case 'sidebar-left':
                return (
                    <div className="h-20 bg-gray-100 rounded p-2 flex gap-2">
                        <div className="w-1/3 space-y-1">
                            <div className="h-1.5 bg-gray-300 rounded w-full"></div>
                            <div className="h-1 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-1 bg-gray-200 rounded w-full"></div>
                            <div className="h-1 bg-gray-200 rounded w-2/3"></div>
                            <div className="h-1 bg-gray-200 rounded w-full"></div>
                        </div>
                        <div className="flex-1 space-y-1">
                            <div className="h-2 bg-gray-300 rounded w-full"></div>
                            <div className="h-1.5 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-1.5 bg-gray-200 rounded w-full"></div>
                            <div className="h-1.5 bg-gray-200 rounded w-2/3"></div>
                        </div>
                    </div>
                );
            case 'sidebar-right':
                return (
                    <div className="h-20 bg-gray-100 rounded p-2 flex gap-2">
                        <div className="flex-1 space-y-1">
                            <div className="h-2 bg-gray-300 rounded w-full"></div>
                            <div className="h-1.5 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-1.5 bg-gray-200 rounded w-full"></div>
                            <div className="h-1.5 bg-gray-200 rounded w-2/3"></div>
                        </div>
                        <div className="w-1/3 space-y-1">
                            <div className="h-1.5 bg-gray-300 rounded w-full"></div>
                            <div className="h-1 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-1 bg-gray-200 rounded w-full"></div>
                            <div className="h-1 bg-gray-200 rounded w-2/3"></div>
                            <div className="h-1 bg-gray-200 rounded w-full"></div>
                        </div>
                    </div>
                );
            case 'compact':
                return (
                    <div className="h-20 bg-gray-100 rounded p-2 space-y-0.5">
                        <div className="h-1.5 bg-gray-300 rounded w-full"></div>
                        <div className="h-1 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-1 bg-gray-200 rounded w-full"></div>
                        <div className="h-1 bg-gray-200 rounded w-2/3"></div>
                        <div className="h-1 bg-gray-200 rounded w-full"></div>
                        <div className="h-1 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-1 bg-gray-200 rounded w-full"></div>
                        <div className="h-1 bg-gray-200 rounded w-2/3"></div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
                <Layout size={20} />
                <h2 className="text-xl font-semibold text-gray-800">Choose Layout</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {resumeLayouts.map((layout) => (
                    <div
                        key={layout.id}
                        onClick={() => onLayoutChange(layout.id)}
                        className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 hover:shadow-md ${selectedLayout === layout.id
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                    >
                        {/* Layout Preview */}
                        <div className="mb-3">
                            {getLayoutPreview(layout.id)}
                        </div>

                        {/* Layout Info */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="text-lg">{layout.icon}</span>
                                <h3 className="font-semibold text-gray-800">{layout.name}</h3>
                            </div>
                            <p className="text-sm text-gray-600">{layout.description}</p>

                            {/* Features */}
                            <div className="space-y-1">
                                <p className="text-xs font-medium text-gray-700">Features:</p>
                                <div className="flex flex-wrap gap-1">
                                    {layout.features.slice(0, 2).map((feature, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded"
                                        >
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Best For */}
                            <div className="space-y-1">
                                <p className="text-xs font-medium text-gray-700">Best for:</p>
                                <p className="text-xs text-gray-600">{layout.bestFor.slice(0, 2).join(', ')}</p>
                            </div>
                        </div>

                        {/* Selection Indicator */}
                        {selectedLayout === layout.id && (
                            <div className="absolute top-2 right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                                <Check size={14} className="text-white" />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};