import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle, Table, TableRow, TableCell, WidthType, TableLayoutType, convertInchesToTwip, LevelFormat } from 'docx';
import { saveAs } from 'file-saver';
import { Resume } from '../types/resume';

export const exportToWord = async (resume: Resume): Promise<void> => {
    // Create sections for the document
    const sections = [];

    // Header section with personal info
    const headerSection = [
        new Paragraph({
            text: resume.personalInfo.fullName,
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: { after: 120 }
        }),
        new Paragraph({
            text: resume.personalInfo.title,
            alignment: AlignmentType.CENTER,
            spacing: { after: 240 }
        })
    ];

    // Contact info in a table with 2 columns
    const contactRows = [];

    // First row: Email and Phone
    if (resume.personalInfo.email || resume.personalInfo.phone) {
        const row1Cells = [];

        if (resume.personalInfo.email) {
            row1Cells.push(
                new TableCell({
                    children: [new Paragraph({
                        text: `Email: ${resume.personalInfo.email}`,
                        alignment: AlignmentType.LEFT
                    })],
                    borders: {
                        top: { style: BorderStyle.NONE },
                        bottom: { style: BorderStyle.NONE },
                        left: { style: BorderStyle.NONE },
                        right: { style: BorderStyle.NONE }
                    }
                })
            );
        }

        if (resume.personalInfo.phone) {
            row1Cells.push(
                new TableCell({
                    children: [new Paragraph({
                        text: `Phone: ${resume.personalInfo.phone}`,
                        alignment: AlignmentType.RIGHT
                    })],
                    borders: {
                        top: { style: BorderStyle.NONE },
                        bottom: { style: BorderStyle.NONE },
                        left: { style: BorderStyle.NONE },
                        right: { style: BorderStyle.NONE }
                    }
                })
            );
        }

        contactRows.push(new TableRow({ children: row1Cells }));
    }

    // Second row: LinkedIn and GitHub
    if (resume.personalInfo.linkedin || resume.personalInfo.github) {
        const row2Cells = [];

        if (resume.personalInfo.linkedin) {
            row2Cells.push(
                new TableCell({
                    children: [new Paragraph({
                        text: `LinkedIn: ${resume.personalInfo.linkedin.replace('https://www.linkedin.com/in/', '')}`,
                        alignment: AlignmentType.LEFT
                    })],
                    borders: {
                        top: { style: BorderStyle.NONE },
                        bottom: { style: BorderStyle.NONE },
                        left: { style: BorderStyle.NONE },
                        right: { style: BorderStyle.NONE }
                    }
                })
            );
        }

        if (resume.personalInfo.github) {
            row2Cells.push(
                new TableCell({
                    children: [new Paragraph({
                        text: `GitHub: ${resume.personalInfo.github.replace('https://github.com/', '')}`,
                        alignment: AlignmentType.RIGHT
                    })],
                    borders: {
                        top: { style: BorderStyle.NONE },
                        bottom: { style: BorderStyle.NONE },
                        left: { style: BorderStyle.NONE },
                        right: { style: BorderStyle.NONE }
                    }
                })
            );
        }

        contactRows.push(new TableRow({ children: row2Cells }));
    }

    // Third row: Location and Portfolio (if they exist)
    if (resume.personalInfo.location || resume.personalInfo.portfolio) {
        const row3Cells = [];

        if (resume.personalInfo.location) {
            row3Cells.push(
                new TableCell({
                    children: [new Paragraph({
                        text: `Location: ${resume.personalInfo.location}`,
                        alignment: AlignmentType.LEFT
                    })],
                    borders: {
                        top: { style: BorderStyle.NONE },
                        bottom: { style: BorderStyle.NONE },
                        left: { style: BorderStyle.NONE },
                        right: { style: BorderStyle.NONE }
                    }
                })
            );
        }

        if (resume.personalInfo.portfolio) {
            row3Cells.push(
                new TableCell({
                    children: [new Paragraph({
                        text: `Portfolio: ${resume.personalInfo.portfolio.replace('https://', '')}`,
                        alignment: AlignmentType.RIGHT
                    })],
                    borders: {
                        top: { style: BorderStyle.NONE },
                        bottom: { style: BorderStyle.NONE },
                        left: { style: BorderStyle.NONE },
                        right: { style: BorderStyle.NONE }
                    }
                })
            );
        }

        contactRows.push(new TableRow({ children: row3Cells }));
    }

    const contactTable = new Table({
        rows: contactRows,
        width: {
            size: 100,
            type: WidthType.PERCENTAGE
        },
        layout: TableLayoutType.FIXED
    });

    // Add a divider
    headerSection.push(
        new Paragraph({
            text: "",
            border: {
                bottom: {
                    color: "#CCCCCC",
                    space: 1,
                    style: BorderStyle.SINGLE,
                    size: 6
                }
            },
            spacing: { before: 120, after: 240 }
        })
    );

    sections.push(...headerSection);
    sections.push(contactTable);

    // Summary section (if exists)
    if (resume.personalInfo.summary) {
        sections.push(
            new Paragraph({
                text: "PROFESSIONAL SUMMARY",
                heading: HeadingLevel.HEADING_2,
                spacing: { after: 120 }
            }),
            new Paragraph({
                text: resume.personalInfo.summary,
                spacing: { after: 240 }
            })
        );
    }

    // Skills section (moved up for better space utilization)
    if (resume.skills.length > 0) {
        sections.push(
            new Paragraph({
                text: "TECHNICAL SKILLS",
                heading: HeadingLevel.HEADING_2,
                spacing: { after: 120 }
            })
        );

        // Create a table for skills to save space
        const skillRows: TableRow[] = [];

        resume.skills.forEach(skill => {
            if (skill.items.length > 0) {
                skillRows.push(
                    new TableRow({
                        children: [
                            new TableCell({
                                children: [
                                    new Paragraph({
                                        text: skill.category,
                                        spacing: { after: 0 }
                                    })
                                ],
                                width: {
                                    size: 30,
                                    type: WidthType.PERCENTAGE
                                },
                                borders: {
                                    top: { style: BorderStyle.NONE },
                                    bottom: { style: BorderStyle.NONE },
                                    left: { style: BorderStyle.NONE },
                                    right: { style: BorderStyle.NONE }
                                }
                            }),
                            new TableCell({
                                children: [
                                    new Paragraph({
                                        text: skill.items.join(', '),
                                        spacing: { after: 0 }
                                    })
                                ],
                                width: {
                                    size: 70,
                                    type: WidthType.PERCENTAGE
                                },
                                borders: {
                                    top: { style: BorderStyle.NONE },
                                    bottom: { style: BorderStyle.NONE },
                                    left: { style: BorderStyle.NONE },
                                    right: { style: BorderStyle.NONE }
                                }
                            })
                        ]
                    })
                );
            }
        });

        const skillsTable = new Table({
            rows: skillRows,
            width: {
                size: 100,
                type: WidthType.PERCENTAGE
            },
            layout: TableLayoutType.FIXED
        });

        sections.push(skillsTable);

        // Add spacing after skills section
        sections.push(
            new Paragraph({
                text: "",
                spacing: { after: 240 }
            })
        );
    }

    // Experience section
    if (resume.experiences.length > 0) {
        sections.push(
            new Paragraph({
                text: "WORK EXPERIENCE",
                heading: HeadingLevel.HEADING_2,
                spacing: { after: 120 }
            })
        );

        resume.experiences.forEach((exp, index) => {
            sections.push(
                new Paragraph({
                    children: [
                        new TextRun({ text: exp.position, bold: true, size: 24 }),
                    ],
                    spacing: { after: 60 }
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: exp.company, italics: true }),
                        new TextRun({ text: ` | ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}` }),
                        new TextRun({ text: exp.location ? ` | ${exp.location}` : '' })
                    ],
                    spacing: { after: 120 }
                })
            );

            // Add bullet points for description
            exp.description.forEach(desc => {
                if (desc.trim()) {
                    sections.push(
                        new Paragraph({
                            text: desc,
                            bullet: {
                                level: 0
                            },
                            spacing: { after: 60 }
                        })
                    );
                }
            });

            if (exp.technologies.length > 0) {
                sections.push(
                    new Paragraph({
                        children: [
                            new TextRun({ text: "Technologies: ", italics: true }),
                            new TextRun({ text: exp.technologies.join(', ') })
                        ],
                        spacing: { after: index < resume.experiences.length - 1 ? 180 : 120 }
                    })
                );
            } else if (index < resume.experiences.length - 1) {
                sections.push(
                    new Paragraph({
                        text: "",
                        spacing: { after: 180 }
                    })
                );
            }
        });
    }

    // Projects section
    if (resume.projects.length > 0) {
        sections.push(
            new Paragraph({
                text: "PROJECTS",
                heading: HeadingLevel.HEADING_2,
                spacing: { after: 120 }
            })
        );

        resume.projects.forEach((project, index) => {
            // Project name and links
            const projectLinks = [];
            if (project.github) projectLinks.push(`GitHub: ${project.github.replace('https://github.com/', '')}`);
            if (project.demo) projectLinks.push(`Demo: ${project.demo.replace('https://', '')}`);

            sections.push(
                new Paragraph({
                    children: [
                        new TextRun({ text: project.name, bold: true, size: 24 })
                    ],
                    spacing: { after: 60 }
                })
            );

            if (projectLinks.length > 0) {
                sections.push(
                    new Paragraph({
                        text: projectLinks.join(' | '),
                        spacing: { after: 60 }
                    })
                );
            }

            if (project.description) {
                sections.push(
                    new Paragraph({
                        text: project.description,
                        spacing: { after: 120 }
                    })
                );
            }

            // Add bullet points for highlights
            project.highlights.forEach(highlight => {
                if (highlight.trim()) {
                    sections.push(
                        new Paragraph({
                            text: highlight,
                            bullet: {
                                level: 0
                            },
                            spacing: { after: 60 }
                        })
                    );
                }
            });

            if (project.technologies.length > 0) {
                sections.push(
                    new Paragraph({
                        children: [
                            new TextRun({ text: "Technologies: ", italics: true }),
                            new TextRun({ text: project.technologies.join(', ') })
                        ],
                        spacing: { after: index < resume.projects.length - 1 ? 180 : 120 }
                    })
                );
            } else if (index < resume.projects.length - 1) {
                sections.push(
                    new Paragraph({
                        text: "",
                        spacing: { after: 180 }
                    })
                );
            }
        });
    }

    // Education section
    if (resume.education.length > 0) {
        sections.push(
            new Paragraph({
                text: "EDUCATION",
                heading: HeadingLevel.HEADING_2,
                spacing: { after: 120 }
            })
        );

        resume.education.forEach((edu, index) => {
            sections.push(
                new Paragraph({
                    children: [
                        new TextRun({ text: `${edu.degree} in ${edu.field}`, bold: true, size: 24 })
                    ],
                    spacing: { after: 60 }
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: edu.institution, italics: true }),
                        new TextRun({ text: ` | ${edu.graduationDate}` }),
                        new TextRun({ text: edu.location ? ` | ${edu.location}` : '' }),
                        new TextRun({ text: edu.gpa ? ` | GPA: ${edu.gpa}` : '' })
                    ],
                    spacing: { after: index < resume.education.length - 1 ? 180 : 0 }
                })
            );
        });
    }

    // Create document with narrow margins for better space utilization
    const doc = new Document({
        sections: [
            {
                properties: {
                    page: {
                        margin: {
                            top: convertInchesToTwip(0.5),
                            right: convertInchesToTwip(0.5),
                            bottom: convertInchesToTwip(0.5),
                            left: convertInchesToTwip(0.5)
                        }
                    }
                },
                children: sections
            }
        ],
        numbering: {
            config: [
                {
                    reference: "bullet-points",
                    levels: [
                        {
                            level: 0,
                            format: LevelFormat.BULLET,
                            text: "•",
                            alignment: AlignmentType.LEFT,
                            style: {
                                paragraph: {
                                    indent: { left: convertInchesToTwip(0.25), hanging: convertInchesToTwip(0.25) }
                                }
                            }
                        }
                    ]
                }
            ]
        }
    });

    // Generate and save document
    const buffer = await Packer.toBlob(doc);
    saveAs(buffer, `${resume.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.docx`);
};