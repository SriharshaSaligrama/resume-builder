import React from 'react';
import { Resume, FontFamily } from '../../types/resume';
import { resumeFonts } from '../../data/fonts';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, ExternalLink } from 'lucide-react';

interface ElegantPurpleTemplateProps {
  resume: Resume;
  fontFamily?: FontFamily;
}

export const ElegantPurpleTemplate: React.FC<ElegantPurpleTemplateProps> = ({ 
  resume, 
  fontFamily = 'inter' 
}) => {
  const selectedFont = resumeFonts.find(font => font.id === fontFamily);
  const fontFamilyStyle = selectedFont?.fontFamily || 'Inter, system-ui, -apple-system, sans-serif';

  return (
    <div 
      className="bg-white shadow-lg max-w-4xl mx-auto min-h-screen print:shadow-none print:max-w-none print:mx-0"
      style={{ fontFamily: fontFamilyStyle }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6 print:p-4 print:bg-purple-700 print:break-inside-avoid print:mb-4">
        <h1 className="text-3xl print:text-2xl font-bold mb-2 break-words">{resume.personalInfo.fullName}</h1>
        <h2 className="text-xl print:text-lg font-light mb-4 opacity-90 break-words">{resume.personalInfo.title}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 print:gap-2 text-sm print:text-xs">
          <div className="space-y-1.5 print:space-y-1">
            {resume.personalInfo.email && (
              <div className="flex items-center gap-2">
                <Mail size={14} className="flex-shrink-0 print:w-3 print:h-3" />
                <a href={`mailto:${resume.personalInfo.email}`} className="break-all hover:underline">
                  {resume.personalInfo.email}
                </a>
              </div>
            )}
            {resume.personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone size={14} className="flex-shrink-0 print:w-3 print:h-3" />
                <a href={`tel:${resume.personalInfo.phone}`} className="break-words hover:underline">
                  {resume.personalInfo.phone}
                </a>
              </div>
            )}
            {resume.personalInfo.location && (
              <div className="flex items-center gap-2">
                <MapPin size={14} className="flex-shrink-0 print:w-3 print:h-3" />
                <span className="break-words">{resume.personalInfo.location}</span>
              </div>
            )}
          </div>
          <div className="space-y-1.5 print:space-y-1">
            {resume.personalInfo.portfolio && (
              <div className="flex items-center gap-2">
                <Globe size={14} className="flex-shrink-0 print:w-3 print:h-3" />
                <a href={resume.personalInfo.portfolio} target="_blank" rel="noopener noreferrer" className="truncate min-w-0 hover:underline">
                  {resume.personalInfo.portfolio}
                </a>
              </div>
            )}
            {resume.personalInfo.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin size={14} className="flex-shrink-0 print:w-3 print:h-3" />
                <a href={resume.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="truncate min-w-0 hover:underline">
                  {resume.personalInfo.linkedin}
                </a>
              </div>
            )}
            {resume.personalInfo.github && (
              <div className="flex items-center gap-2">
                <Github size={14} className="flex-shrink-0 print:w-3 print:h-3" />
                <a href={resume.personalInfo.github} target="_blank" rel="noopener noreferrer" className="truncate min-w-0 hover:underline">
                  {resume.personalInfo.github}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-6 print:p-4 print:pt-0">
        {/* Summary */}
        {resume.personalInfo.summary && (
          <section className="mb-6 print:mb-5 print:break-inside-avoid">
            <h3 className="text-xl print:text-lg font-semibold text-gray-800 mb-3 print:mb-2 border-b-2 border-purple-600 pb-1 print:break-after-avoid">
              Professional Summary
            </h3>
            <p className="text-gray-700 print:text-gray-800 leading-relaxed print:leading-normal break-words text-sm print:text-xs">
              {resume.personalInfo.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {resume.experiences.length > 0 && (
          <section className="mb-6 print:mb-5">
            <h3 className="text-xl print:text-lg font-semibold text-gray-800 mb-4 print:mb-3 border-b-2 border-purple-600 pb-1 print:break-after-avoid">
              Work Experience
            </h3>
            <div className="space-y-5 print:space-y-4">
              {resume.experiences.map((experience) => (
                <div key={experience.id} className="print:break-inside-avoid print:mb-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 print:mb-1 gap-1 print:gap-0">
                    <div className="min-w-0 flex-1">
                      <h4 className="text-lg print:text-sm font-semibold text-gray-800 break-words">
                        {experience.position}
                      </h4>
                      <p className="text-purple-600 print:text-purple-700 font-medium break-words text-base print:text-xs">
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
                          className="px-2 py-1 print:px-1.5 print:py-0.5 bg-purple-100 print:bg-purple-50 text-purple-800 print:text-purple-900 text-xs print:text-[10px] rounded-md break-words"
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
        )}

        {/* Projects */}
        {resume.projects.length > 0 && (
          <section className="mb-6 print:mb-5">
            <h3 className="text-xl print:text-lg font-semibold text-gray-800 mb-4 print:mb-3 border-b-2 border-purple-600 pb-1 print:break-after-avoid">
              Projects
            </h3>
            <div className="space-y-5 print:space-y-4">
              {resume.projects.map((project) => (
                <div key={project.id} className="print:break-inside-avoid print:mb-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 print:mb-1 gap-2 print:gap-1">
                    <h4 className="text-lg print:text-sm font-semibold text-gray-800 break-words min-w-0 flex-1">
                      {project.name}
                    </h4>
                    <div className="flex flex-col gap-1 print:gap-0.5 flex-shrink-0 text-sm print:text-[10px]">
                      {project.github && (
                        <div className="flex items-center gap-1">
                          <Github size={12} className="print:w-2.5 print:h-2.5" />
                          <a href={project.github} className="text-purple-600 print:text-purple-700 hover:text-purple-800 break-all" target="_blank" rel="noopener noreferrer">
                            {project.github}
                          </a>
                        </div>
                      )}
                      {project.demo && (
                        <div className="flex items-center gap-1">
                          <ExternalLink size={12} className="print:w-2.5 print:h-2.5" />
                          <a href={project.demo} className="text-purple-600 print:text-purple-700 hover:text-purple-800 break-all" target="_blank" rel="noopener noreferrer">
                            {project.demo}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                  
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
                          className="px-2 py-1 print:px-1.5 print:py-0.5 bg-purple-100 print:bg-purple-50 text-purple-800 print:text-purple-900 text-xs print:text-[10px] rounded-md break-words"
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
        )}

        {/* Skills */}
        {resume.skills.length > 0 && (
          <section className="mb-6 print:mb-5 print:break-inside-avoid">
            <h3 className="text-xl print:text-lg font-semibold text-gray-800 mb-4 print:mb-3 border-b-2 border-purple-600 pb-1 print:break-after-avoid">
              Technical Skills
            </h3>
            <div className="space-y-3 print:space-y-2">
              {resume.skills.map((skill, index) => (
                <div key={index} className="print:break-inside-avoid">
                  <h4 className="font-semibold text-gray-800 mb-1 print:mb-0.5 break-words text-base print:text-sm">
                    {skill.category}
                  </h4>
                  <div className="flex flex-wrap gap-1.5 print:gap-1">
                    {skill.items.map((item, itemIndex) => (
                      <span
                        key={itemIndex}
                        className="px-2 py-1 print:px-1.5 print:py-0.5 bg-purple-100 print:bg-purple-50 text-purple-800 print:text-purple-900 text-sm print:text-xs rounded break-words"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {resume.education.length > 0 && (
          <section className="mb-6 print:mb-4">
            <h3 className="text-xl print:text-lg font-semibold text-gray-800 mb-4 print:mb-3 border-b-2 border-purple-600 pb-1 print:break-after-avoid">
              Education
            </h3>
            <div className="space-y-4 print:space-y-3">
              {resume.education.map((edu) => (
                <div key={edu.id} className="flex flex-col sm:flex-row sm:justify-between gap-2 print:gap-1 print:break-inside-avoid">
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-gray-800 break-words text-base print:text-sm">
                      {edu.degree} in {edu.field}
                    </h4>
                    <p className="text-purple-600 print:text-purple-700 break-words text-sm print:text-xs">
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
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};