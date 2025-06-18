import { useState } from 'react';
import { Resume } from './types/resume';
import { PersonalInfoEditor } from './components/PersonalInfoEditor';
import { ExperienceEditor } from './components/ExperienceEditor';
import { ProjectsEditor } from './components/ProjectsEditor';
import { SkillsEditor } from './components/SkillsEditor';
import { EducationEditor } from './components/EducationEditor';
import { ResumePreview } from './components/ResumePreview';
import { useLocalStorage } from './hooks/useLocalStorage';
import { FileText, Download, Eye, EyeOff, Save } from 'lucide-react';

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
    const [showPreview, setShowPreview] = useState(false);
    const [activeTab, setActiveTab] = useState('personal');

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

    const tabs = [
        { id: 'personal', label: 'Personal Info', icon: '👤' },
        { id: 'experience', label: 'Experience', icon: '💼' },
        { id: 'projects', label: 'Projects', icon: '🚀' },
        { id: 'skills', label: 'Skills', icon: '🛠️' },
        { id: 'education', label: 'Education', icon: '🎓' },
    ];

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
                                <p className="text-sm text-gray-600">Professional resume for software engineers</p>
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
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1">
                            <nav className="flex space-x-1">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === tab.id
                                                ? 'bg-blue-600 text-white'
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                            }`}
                                    >
                                        <span>{tab.icon}</span>
                                        <span className="hidden sm:inline">{tab.label}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Tab Content */}
                        <div className="min-h-[600px]">
                            {activeTab === 'personal' && (
                                <PersonalInfoEditor
                                    personalInfo={resume.personalInfo}
                                    onChange={(personalInfo) => setResume({ ...resume, personalInfo })}
                                />
                            )}

                            {activeTab === 'experience' && (
                                <ExperienceEditor
                                    experiences={resume.experiences}
                                    onChange={(experiences) => setResume({ ...resume, experiences })}
                                />
                            )}

                            {activeTab === 'projects' && (
                                <ProjectsEditor
                                    projects={resume.projects}
                                    onChange={(projects) => setResume({ ...resume, projects })}
                                />
                            )}

                            {activeTab === 'skills' && (
                                <SkillsEditor
                                    skills={resume.skills}
                                    onChange={(skills) => setResume({ ...resume, skills })}
                                />
                            )}

                            {activeTab === 'education' && (
                                <EducationEditor
                                    education={resume.education}
                                    onChange={(education) => setResume({ ...resume, education })}
                                />
                            )}
                        </div>
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
                                    <ResumePreview resume={resume} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Print-only Resume */}
                    <div className="hidden print:block">
                        <ResumePreview resume={resume} />
                    </div>
                </div>
            </div>

            {/* Enhanced Print Styles */}
            <style>{`
        @media print {
          @page {
            size: A4;
            margin: 0.75in 0.6in 0.75in 0.6in;
          }
          
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            font-size: 11px;
            line-height: 1.3;
            color: #1f2937;
          }
          
          .print\\:hidden {
            display: none !important;
          }
          
          .print\\:block {
            display: block !important;
          }
          
          .print\\:break-inside-avoid {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          
          .print\\:break-after-avoid {
            break-after: avoid;
            page-break-after: avoid;
          }
          
          .print\\:break-before-page {
            break-before: page;
            page-break-before: always;
          }
          
          /* Section spacing */
          .print\\:mb-4 {
            margin-bottom: 1rem;
          }
          
          .print\\:mb-5 {
            margin-bottom: 1.25rem;
          }
          
          .print\\:mb-6 {
            margin-bottom: 1.5rem;
          }
          
          .print\\:pt-0 {
            padding-top: 0;
          }
          
          /* Spacing utilities */
          .print\\:space-y-0 > * + * {
            margin-top: 0;
          }
          
          .print\\:space-y-0\\.5 > * + * {
            margin-top: 0.125rem;
          }
          
          .print\\:space-y-1 > * + * {
            margin-top: 0.25rem;
          }
          
          .print\\:space-y-2 > * + * {
            margin-top: 0.5rem;
          }
          
          .print\\:space-y-3 > * + * {
            margin-top: 0.75rem;
          }
          
          .print\\:space-y-4 > * + * {
            margin-top: 1rem;
          }
          
          /* Ensure proper spacing between major sections */
          section {
            margin-bottom: 1.5rem;
            break-inside: avoid;
            page-break-inside: avoid;
          }
          
          section:last-child {
            margin-bottom: 0;
          }
          
          /* Better handling of section headers */
          h3 {
            break-after: avoid;
            page-break-after: avoid;
            orphans: 3;
            widows: 3;
          }
          
          /* Experience and project entries */
          .print\\:break-inside-avoid {
            orphans: 2;
            widows: 2;
          }
          
          /* Ensure content doesn't get cut off at page edges */
          * {
            box-decoration-break: clone;
            -webkit-box-decoration-break: clone;
          }
          
          /* Better list handling */
          ul, ol {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          
          li {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          
          /* Technology tags */
          .print\\:gap-1 {
            gap: 0.25rem;
          }
          
          /* Header gradient for print */
          .print\\:bg-blue-700 {
            background-color: #1d4ed8 !important;
            background-image: none !important;
          }
          
          /* Text colors for print */
          .print\\:text-blue-700 {
            color: #1d4ed8 !important;
          }
          
          .print\\:text-blue-900 {
            color: #1e3a8a !important;
          }
          
          .print\\:text-gray-700 {
            color: #374151 !important;
          }
          
          .print\\:text-gray-800 {
            color: #1f2937 !important;
          }
          
          .print\\:text-gray-900 {
            color: #111827 !important;
          }
          
          /* Background colors for print */
          .print\\:bg-blue-50 {
            background-color: #eff6ff !important;
          }
          
          .print\\:bg-gray-50 {
            background-color: #f9fafb !important;
          }
          
          /* Font sizes for print */
          .print\\:text-xs {
            font-size: 0.75rem;
            line-height: 1rem;
          }
          
          .print\\:text-sm {
            font-size: 0.875rem;
            line-height: 1.25rem;
          }
          
          .print\\:text-lg {
            font-size: 1.125rem;
            line-height: 1.75rem;
          }
          
          .print\\:text-2xl {
            font-size: 1.5rem;
            line-height: 2rem;
          }
          
          .print\\:text-\\[10px\\] {
            font-size: 10px;
          }
          
          /* Icon sizes for print */
          .print\\:w-2\\.5 {
            width: 0.625rem;
          }
          
          .print\\:h-2\\.5 {
            height: 0.625rem;
          }
          
          .print\\:w-3 {
            width: 0.75rem;
          }
          
          .print\\:h-3 {
            height: 0.75rem;
          }
          
          /* Padding adjustments for print */
          .print\\:p-4 {
            padding: 1rem;
          }
          
          .print\\:px-1\\.5 {
            padding-left: 0.375rem;
            padding-right: 0.375rem;
          }
          
          .print\\:py-0\\.5 {
            padding-top: 0.125rem;
            padding-bottom: 0.125rem;
          }
          
          /* Line height adjustments */
          .print\\:leading-normal {
            line-height: 1.5;
          }
          
          /* Margin adjustments */
          .print\\:mb-0\\.5 {
            margin-bottom: 0.125rem;
          }
          
          .print\\:mb-1 {
            margin-bottom: 0.25rem;
          }
          
          .print\\:mb-2 {
            margin-bottom: 0.5rem;
          }
          
          .print\\:mb-3 {
            margin-bottom: 0.75rem;
          }
          
          /* Ensure proper page margins and content flow */
          html, body {
            height: auto;
            overflow: visible;
          }
          
          /* Better handling of long URLs */
          a {
            word-break: break-all;
            hyphens: auto;
          }
        }
      `}</style>
        </div>
    );
}

export default App;