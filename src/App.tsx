import { useState } from 'react';
import { FileText, Download, Eye, EyeOff, Save } from 'lucide-react';
import { Resume, TemplateId, FontFamily, LayoutStyle } from './types/resume';
import { ResumePreview } from './components/ResumePreview';
import { TabNavigation } from './components/TabNavigation';
import { TabContent } from './components/TabContent';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTabNavigation } from './hooks/useTabNavigation';
import { resumeTabs } from './data/tabs';

const initialResume: Resume = {
    personalInfo: {
        fullName: '',
        title: '',
        email: '',
        phone: '',
        location: '',
        portfolio: '',
        linkedin: '',
        github: '',
        summary: '',
    },
    experiences: [],
    projects: [],
    education: [],
    skills: [
        {
            category: 'Programming Languages',
            items: [],
        },
        {
            category: 'Frameworks & Libraries',
            items: [],
        },
        {
            category: 'Tools & Technologies',
            items: [],
        },
    ],
};

function App() {
    const [resume, setResume] = useLocalStorage<Resume>('resume-data', initialResume);
    const [selectedTemplate, setSelectedTemplate] = useLocalStorage<TemplateId>('selected-template', 'modern-blue');
    const [selectedFont, setSelectedFont] = useLocalStorage<FontFamily>('selected-font', 'inter');
    const [selectedLayout, setSelectedLayout] = useLocalStorage<LayoutStyle>('selected-layout', 'single-column');
    const [showPreview, setShowPreview] = useState(false);
    const { activeTab, handleTabChange } = useTabNavigation('personal');

    const handleExport = () => {
        const dataStr = JSON.stringify(resume, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

        const exportFileDefaultName = 'resume-data.json';

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200 print:hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center gap-3">
                            <FileText className="text-blue-600" size={32} />
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
                                <p className="text-sm text-gray-600">Resume for Professionals</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setShowPreview(!showPreview)}
                                className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                            >
                                {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
                                {showPreview ? 'Hide Preview' : 'Show Preview'}
                            </button>

                            <button
                                onClick={handleExport}
                                className="flex items-center gap-2 px-4 py-2 text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                            >
                                <Download size={16} />
                                Export Data
                            </button>

                            <button
                                onClick={handlePrint}
                                className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                            >
                                <Save size={16} />
                                Print/Save PDF
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:max-w-none print:mx-0 print:px-0 print:py-0">
                <div className="space-y-8 print:space-y-0">
                    {/* Editor Panel */}
                    <div className="space-y-6 print:hidden">
                        {/* Tab Navigation */}
                        <TabNavigation
                            tabs={resumeTabs}
                            activeTab={activeTab}
                            onTabChange={handleTabChange}
                        />

                        {/* Tab Content */}
                        <TabContent
                            activeTab={activeTab}
                            resume={resume}
                            selectedTemplate={selectedTemplate}
                            selectedFont={selectedFont}
                            selectedLayout={selectedLayout}
                            onResumeChange={setResume}
                            onTemplateChange={setSelectedTemplate}
                            onFontChange={setSelectedFont}
                            onLayoutChange={setSelectedLayout}
                        />
                    </div>

                    {/* Preview Panel */}
                    {showPreview && (
                        <div className="w-full print:hidden">
                            <div className="bg-gray-100 p-4 rounded-lg">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                    <Eye size={20} />
                                    Live Preview
                                </h2>
                                <div className="bg-white rounded-lg overflow-hidden shadow-lg print-container">
                                    <ResumePreview
                                        resume={resume}
                                        templateId={selectedTemplate}
                                        fontFamily={selectedFont}
                                        layoutStyle={selectedLayout}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Print-only Resume */}
                    <div className="hidden print:block">
                        <ResumePreview
                            resume={resume}
                            templateId={selectedTemplate}
                            fontFamily={selectedFont}
                            layoutStyle={selectedLayout}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;