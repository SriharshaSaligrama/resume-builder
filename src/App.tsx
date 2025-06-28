import { useState } from 'react';
import { Resume, TemplateId, FontFamily, LayoutStyle } from './types/resume';
import { ResumePreview } from './components/resume-templates/preview/ResumePreview';
import { TabNavigation } from './components/layout/TabNavigation';
import { TabContent } from './components/layout/TabContent';
import { Header } from './components/layout/Header';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTabNavigation } from './hooks/useTabNavigation';
import { resumeTabs } from './data/tabs';
import { Eye } from 'lucide-react';
import { exportToWord } from './utils/wordExport';

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

    const handleExportWord = () => {
        exportToWord(resume);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header
                showPreview={showPreview}
                onTogglePreview={() => setShowPreview(!showPreview)}
                onExport={handleExport}
                onPrint={handlePrint}
                onExportWord={handleExportWord}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:max-w-none print:mx-0 print:px-0 print:py-0">
                <div className="space-y-8 print:space-y-0">
                    {/* Editor Panel */}
                    <div className="space-y-6 print:hidden">
                        <TabNavigation
                            tabs={resumeTabs}
                            activeTab={activeTab}
                            onTabChange={handleTabChange}
                        />

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