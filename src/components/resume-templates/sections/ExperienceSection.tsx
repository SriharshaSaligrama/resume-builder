import React from 'react';
import { Experience } from '../../../types/resume';
import { ColorTheme } from '../data/colors';

interface ExperienceSectionProps {
    experiences: Experience[];
    colors: ColorTheme;
    stackDetails?: boolean;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
    experiences,
    colors,
    stackDetails = false,
}) => {
    if (experiences.length === 0) return null;

    return (
        <section className="mb-6 print:mb-5">
            <h3 className={`text-xl print:text-lg font-semibold text-gray-800 mb-4 print:mb-3 ${colors.borderColor} border-b-2 pb-1 print:break-after-avoid`}>
                Work Experience
            </h3>
            <div className="space-y-5 print:space-y-4">
                {experiences.map((experience) => (
                    <div key={experience.id} className="print:break-inside-avoid print:mb-4">
                        {stackDetails ? (
                            /* Stack layout for constrained layouts (two-column, sidebars) */
                            <div className="mb-2 print:mb-1">
                                <h4 className="text-lg print:text-sm font-semibold text-gray-800 break-words">
                                    {experience.position}
                                </h4>
                                <p className={`${colors.textColor} ${colors.printTextColor} font-medium break-words text-base print:text-xs`}>
                                    {experience.company}
                                </p>
                                <div className="text-sm print:text-xs text-gray-600 print:text-gray-700 mt-1 print:mt-0.5">
                                    <p className="font-medium">
                                        {experience.startDate} - {experience.current ? 'Present' : experience.endDate}
                                    </p>
                                    {experience.location && <p className="break-words">{experience.location}</p>}
                                </div>
                            </div>
                        ) : (
                            /* Side-by-side layout for single column and compact */
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 print:mb-1 gap-1 print:gap-0">
                                <div className="min-w-0 flex-1">
                                    <h4 className="text-lg print:text-sm font-semibold text-gray-800 break-words">
                                        {experience.position}
                                    </h4>
                                    <p className={`${colors.textColor} ${colors.printTextColor} font-medium break-words text-base print:text-xs`}>
                                        {experience.company}
                                    </p>
                                </div>
                                <div className="text-left sm:text-right text-sm print:text-xs text-gray-600 print:text-gray-700 flex-shrink-0">
                                    <p className="whitespace-nowrap font-medium">
                                        {experience.startDate} - {experience.current ? 'Present' : experience.endDate}
                                    </p>
                                    {experience.location && <p className="break-words">{experience.location}</p>}
                                </div>
                            </div>
                        )}

                        {experience.description.length > 0 && (
                            <ul className="list-disc list-inside space-y-1 print:space-y-0.5 text-gray-700 print:text-gray-800 mb-3 print:mb-2 text-sm print:text-xs">
                                {experience.description.map((desc, index) => (
                                    desc && <li key={index} className="break-words leading-relaxed print:leading-normal">{desc}</li>
                                ))}
                            </ul>
                        )}

                        {experience.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 print:gap-1">
                                {experience.technologies.map((tech, index) => (
                                    <span
                                        key={index}
                                        className={`px-2 py-1 print:px-1.5 print:py-0.5 ${colors.tagBg} ${colors.printTagBg} ${colors.tagText} ${colors.printTagText} text-xs print:text-[10px] rounded-md break-words`}
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};