import React from 'react';
import { Skill } from '../../../types/resume';
import { ColorTheme } from '../data/colors';

interface SkillsSectionProps {
    skills: Skill[];
    colors: ColorTheme;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
    skills,
    colors,
}) => {
    if (skills.length === 0) return null;

    return (
        <section className="mb-6 print:mb-5 print:break-inside-avoid">
            <h3 className={`text-xl print:text-lg font-semibold text-gray-800 mb-4 print:mb-3 ${colors.borderColor} border-b-2 pb-1 print:break-after-avoid`}>
                Technical Skills
            </h3>
            <div className="space-y-3 print:space-y-2">
                {skills.map((skill, index) => (
                    <div key={index} className="print:break-inside-avoid">
                        <h4 className="font-semibold text-gray-800 mb-1 print:mb-0.5 break-words text-base print:text-sm">
                            {skill.category}
                        </h4>
                        <div className="flex flex-wrap gap-1.5 print:gap-1">
                            {skill.items.map((item, itemIndex) => (
                                <span
                                    key={itemIndex}
                                    className={`px-2 py-1 print:px-1.5 print:py-0.5 ${colors.tagBg} ${colors.printTagBg} ${colors.tagText} ${colors.printTagText} text-sm print:text-xs rounded break-words`}
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};