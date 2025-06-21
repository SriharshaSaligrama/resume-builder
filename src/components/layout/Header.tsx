import React from 'react';
import { FileText, Download, Eye, EyeOff, Save } from 'lucide-react';

interface HeaderProps {
    showPreview: boolean;
    onTogglePreview: () => void;
    onExport: () => void;
    onPrint: () => void;
}

export const Header: React.FC<HeaderProps> = ({
    showPreview,
    onTogglePreview,
    onExport,
    onPrint,
}) => {
    return (
        <header className="bg-white shadow-sm border-b border-gray-200 print:hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Logo and Title */}
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 mr-4">
                        <FileText className="text-blue-600 flex-shrink-0" size={28} />
                        <div className="min-w-0 flex-1">
                            <h1 className="text-lg sm:text-2xl font-bold text-gray-900 leading-tight">
                                Resume Builder
                            </h1>
                            <p className="text-sm text-gray-600 leading-relaxed hidden sm:block">
                                Transform Your Experience Into Opportunity
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                        <button
                            onClick={onTogglePreview}
                            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                        >
                            {showPreview ? <EyeOff size={14} className="sm:w-4 sm:h-4" /> : <Eye size={14} className="sm:w-4 sm:h-4" />}
                            <span className="hidden sm:inline">{showPreview ? 'Hide Preview' : 'Show Preview'}</span>
                            <span className="sm:hidden">{showPreview ? 'Hide' : 'Show'}</span>
                        </button>

                        <button
                            onClick={onExport}
                            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                        >
                            <Download size={14} className="sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">Export Data</span>
                            <span className="sm:hidden">Export</span>
                        </button>

                        <button
                            onClick={onPrint}
                            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            <Save size={14} className="sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">Print/Save PDF</span>
                            <span className="sm:hidden">Print</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};