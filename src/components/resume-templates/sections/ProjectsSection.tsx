import React from 'react';
import { Project } from '../../../types/resume';
import { ColorTheme } from '../data/colors';
import { Github, ExternalLink } from 'lucide-react';

interface ProjectsSectionProps {
    projects: Project[];
    colors: ColorTheme;
    stackUrls?: boolean;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
    projects,
    colors,
    stackUrls = false,
}) => {
    if (projects.length === 0) return null;

    return (
        <section className="mb-6 print:mb-5">
            <h3 className={`text-xl print:text-lg font-semibold text-gray-800 mb-4 print:mb-3 ${colors.borderColor} border-b-2 pb-1 print:break-after-avoid`}>
                Projects
            </h3>
            <div className="space-y-5 print:space-y-4">
                {projects.map((project) => (
                    <div key={project.id} className="print:break-inside-avoid print:mb-4">
                        {/* Stack URLs vertically for better readability in constrained layouts */}
                        {stackUrls ? (
                            <div className="mb-2 print:mb-1">
                                <h4 className="text-lg print:text-sm font-semibold text-gray-800 break-words mb-2">
                                    {project.name}
                                </h4>
                                {(project.github || project.demo) && (
                                    <div className="flex flex-col gap-1 print:gap-0.5 text-sm print:text-[10px]">
                                        {project.github && (
                                            <div className="flex items-center gap-1">
                                                <Github size={12} className="print:w-2.5 print:h-2.5" />
                                                <a href={project.github} className={`${colors.textColor} ${colors.printTextColor} hover:text-gray-800 break-all`} target="_blank" rel="noopener noreferrer">
                                                    {project.github}
                                                </a>
                                            </div>
                                        )}
                                        {project.demo && (
                                            <div className="flex items-center gap-1">
                                                <ExternalLink size={12} className="print:w-2.5 print:h-2.5" />
                                                <a href={project.demo} className={`${colors.textColor} ${colors.printTextColor} hover:text-gray-800 break-all`} target="_blank" rel="noopener noreferrer">
                                                    {project.demo}
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* Single column layout: Keep original side-by-side layout */
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 print:mb-1 gap-2 print:gap-1">
                                <h4 className="text-lg print:text-sm font-semibold text-gray-800 break-words min-w-0 flex-1">
                                    {project.name}
                                </h4>
                                <div className="flex flex-col gap-1 print:gap-0.5 flex-shrink-0 text-sm print:text-[10px]">
                                    {project.github && (
                                        <div className="flex items-center gap-1">
                                            <Github size={12} className="print:w-2.5 print:h-2.5" />
                                            <a href={project.github} className={`${colors.textColor} ${colors.printTextColor} hover:text-gray-800 break-all`} target="_blank" rel="noopener noreferrer">
                                                {project.github}
                                            </a>
                                        </div>
                                    )}
                                    {project.demo && (
                                        <div className="flex items-center gap-1">
                                            <ExternalLink size={12} className="print:w-2.5 print:h-2.5" />
                                            <a href={project.demo} className={`${colors.textColor} ${colors.printTextColor} hover:text-gray-800 break-all`} target="_blank" rel="noopener noreferrer">
                                                {project.demo}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {project.description && (
                            <p className="text-gray-700 print:text-gray-800 mb-3 print:mb-2 break-words leading-relaxed print:leading-normal text-sm print:text-xs">
                                {project.description}
                            </p>
                        )}

                        {project.highlights.length > 0 && (
                            <ul className="list-disc list-inside space-y-1 print:space-y-0.5 text-gray-700 print:text-gray-800 mb-3 print:mb-2 text-sm print:text-xs">
                                {project.highlights.map((highlight, index) => (
                                    highlight && <li key={index} className="break-words leading-relaxed print:leading-normal">{highlight}</li>
                                ))}
                            </ul>
                        )}

                        {project.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 print:gap-1">
                                {project.technologies.map((tech, index) => (
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