import React from 'react';
import { PersonalInfo } from '../../../types/resume';
import { ColorTheme } from '../data/colors';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

interface ResumeHeaderProps {
    personalInfo: PersonalInfo;
    colors: ColorTheme;
}

export const ResumeHeader: React.FC<ResumeHeaderProps> = ({
    personalInfo,
    colors,
}) => {
    return (
        <div className={`${colors.headerBg} ${colors.printHeaderBg} text-white p-6 print:p-4 print:break-inside-avoid print:mb-4`}>
            <h1 className="text-3xl print:text-2xl font-bold mb-2 break-words">{personalInfo.fullName}</h1>
            <h2 className="text-xl print:text-lg font-light mb-4 opacity-90 break-words">{personalInfo.title}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 print:gap-2 text-sm print:text-xs">
                <div className="space-y-1.5 print:space-y-1">
                    {personalInfo.email && (
                        <div className="flex items-center gap-2">
                            <Mail size={14} className="flex-shrink-0 print:w-3 print:h-3" />
                            <a href={`mailto:${personalInfo.email}`} className="break-all hover:underline">
                                {personalInfo.email}
                            </a>
                        </div>
                    )}
                    {personalInfo.phone && (
                        <div className="flex items-center gap-2">
                            <Phone size={14} className="flex-shrink-0 print:w-3 print:h-3" />
                            <a href={`tel:${personalInfo.phone}`} className="break-words hover:underline">
                                {personalInfo.phone}
                            </a>
                        </div>
                    )}
                    {personalInfo.location && (
                        <div className="flex items-center gap-2">
                            <MapPin size={14} className="flex-shrink-0 print:w-3 print:h-3" />
                            <span className="break-words">{personalInfo.location}</span>
                        </div>
                    )}
                </div>
                <div className="space-y-1.5 print:space-y-1">
                    {personalInfo.portfolio && (
                        <div className="flex items-center gap-2">
                            <Globe size={14} className="flex-shrink-0 print:w-3 print:h-3" />
                            <a href={personalInfo.portfolio} target="_blank" rel="noopener noreferrer" className="truncate min-w-0 hover:underline">
                                {personalInfo.portfolio}
                            </a>
                        </div>
                    )}
                    {personalInfo.linkedin && (
                        <div className="flex items-center gap-2">
                            <Linkedin size={14} className="flex-shrink-0 print:w-3 print:h-3" />
                            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="truncate min-w-0 hover:underline">
                                {personalInfo.linkedin}
                            </a>
                        </div>
                    )}
                    {personalInfo.github && (
                        <div className="flex items-center gap-2">
                            <Github size={14} className="flex-shrink-0 print:w-3 print:h-3" />
                            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="truncate min-w-0 hover:underline">
                                {personalInfo.github}
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};