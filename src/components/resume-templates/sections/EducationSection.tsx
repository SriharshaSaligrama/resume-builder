import React from 'react';
import { Education } from '../../../types/resume';
import { ColorTheme } from '../data/colors';

interface EducationSectionProps {
    education: Education[];
    colors: ColorTheme;
    stackDetails?: boolean;
}

export const EducationSection: React.FC<EducationSectionProps> = ({
    education,
    colors,
    stackDetails = false,
}) => {
    if (education.length === 0) return null;

    return (
        <section className="mb-6 print:mb-4">
            <h3 className={`text-xl print:text-lg font-semibold text-gray-800 mb-4 print:mb-3 ${colors.borderColor} border-b-2 pb-1 print:break-after-avoid`}>
                Education
            </h3>
            <div className="space-y-4 print:space-y-3">
                {education.map((edu) => (
                    <div key={edu.id} className="print:break-inside-avoid">
                        {stackDetails ? (
                            /* Stack layout for constrained layouts (two-column, sidebars) */
                            <div className="space-y-1 print:space-y-0.5">
                                <h4 className="font-semibold text-gray-800 break-words text-base print:text-sm">
                                    {edu.degree} in {edu.field}
                                </h4>
                                <p className={`${colors.textColor} ${colors.printTextColor} break-words text-sm print:text-xs`}>
                                    {edu.institution}
                                </p>
                                {edu.location && (
                                    <p className="text-gray-600 print:text-gray-700 text-sm print:text-xs break-words">
                                        {edu.location}
                                    </p>
                                )}
                                <div className="text-gray-600 print:text-gray-700 text-sm print:text-xs">
                                    <p className="font-medium">{edu.graduationDate}</p>
                                    {edu.gpa && <p>GPA: {edu.gpa}</p>}
                                </div>
                            </div>
                        ) : (
                            /* Side-by-side layout for single column and compact */
                            <div className="flex flex-col sm:flex-row sm:justify-between gap-2 print:gap-1">
                                <div className="min-w-0 flex-1">
                                    <h4 className="font-semibold text-gray-800 break-words text-base print:text-sm">
                                        {edu.degree} in {edu.field}
                                    </h4>
                                    <p className={`${colors.textColor} ${colors.printTextColor} break-words text-sm print:text-xs`}>
                                        {edu.institution}
                                    </p>
                                    {edu.location && (
                                        <p className="text-gray-600 print:text-gray-700 text-sm print:text-xs break-words">
                                            {edu.location}
                                        </p>
                                    )}
                                </div>
                                <div className="text-left sm:text-right text-gray-600 print:text-gray-700 flex-shrink-0 text-sm print:text-xs">
                                    <p className="whitespace-nowrap font-medium">{edu.graduationDate}</p>
                                    {edu.gpa && <p>GPA: {edu.gpa}</p>}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};