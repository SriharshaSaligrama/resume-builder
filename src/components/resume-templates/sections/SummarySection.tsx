import React from 'react';
import { ColorTheme } from '../data/colors';

interface SummarySectionProps {
    summary: string;
    colors: ColorTheme;
}

export const SummarySection: React.FC<SummarySectionProps> = ({
    summary,
    colors,
}) => {
    if (!summary) return null;

    return (
        <section className="mb-6 print:mb-5 print:break-inside-avoid">
            <h3 className={`text-xl print:text-lg font-semibold text-gray-800 mb-3 print:mb-2 ${colors.borderColor} border-b-2 pb-1 print:break-after-avoid`}>
                Professional Summary
            </h3>
            <p className="text-gray-700 print:text-gray-800 leading-relaxed print:leading-normal break-words text-sm print:text-xs">
                {summary}
            </p>
        </section>
    );
};