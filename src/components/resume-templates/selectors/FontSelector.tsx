import React from 'react';
import { FontFamily } from '../../../types/resume';
import { resumeFonts } from '../../../data/fonts';
import { Type, Check } from 'lucide-react';

interface FontSelectorProps {
    selectedFont: FontFamily;
    onFontChange: (fontId: FontFamily) => void;
}

export const FontSelector: React.FC<FontSelectorProps> = ({
    selectedFont,
    onFontChange,
}) => {
    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'modern':
                return '🚀';
            case 'classic':
                return '📚';
            case 'elegant':
                return '✨';
            default:
                return '📝';
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'modern':
                return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'classic':
                return 'bg-green-50 text-green-700 border-green-200';
            case 'elegant':
                return 'bg-purple-50 text-purple-700 border-purple-200';
            default:
                return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
                <Type size={20} />
                <h2 className="text-xl font-semibold text-gray-800">Choose Font</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resumeFonts.map((font) => (
                    <div
                        key={font.id}
                        onClick={() => onFontChange(font.id)}
                        className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 hover:shadow-md ${selectedFont === font.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                            }`}
                    >
                        {/* Font Preview */}
                        <div className="mb-3">
                            <div
                                className="text-lg font-semibold text-gray-800 mb-1"
                                style={{ fontFamily: font.fontFamily }}
                            >
                                {font.name}
                            </div>
                            <div
                                className="text-sm text-gray-600 mb-2"
                                style={{ fontFamily: font.fontFamily }}
                            >
                                The quick brown fox jumps over the lazy dog
                            </div>
                            <div
                                className="text-xs text-gray-500"
                                style={{ fontFamily: font.fontFamily }}
                            >
                                ABCDEFGHIJKLMNOPQRSTUVWXYZ 1234567890
                            </div>
                        </div>

                        {/* Font Info */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(font.category)}`}>
                                    {getCategoryIcon(font.category)} {font.category}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600">{font.description}</p>
                        </div>

                        {/* Selection Indicator */}
                        {selectedFont === font.id && (
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