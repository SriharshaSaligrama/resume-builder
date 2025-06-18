# Resume Builder

A modern, customizable resume builder built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- **Live Resume Editing:** Edit personal info, experience, projects, skills, and education in a user-friendly interface.
- **Template Selection:** Choose from multiple professionally designed resume templates.
- **Font & Layout Customization:** Select from various fonts and layouts to personalize your resume.
- **Live Preview:** Instantly preview your resume as you edit.
- **Export & Print:** Export your resume data as JSON or print/save as PDF.
- **Persistent Data:** All changes are saved in your browser's local storage.

## Project Structure

```
src/
  App.tsx                # Main application logic and UI flow
  index.css              # Tailwind and global styles
  main.tsx               # React entry point
  components/            # UI components for editing and previewing resume
    PersonalInfoEditor.tsx
    ExperienceEditor.tsx
    ProjectsEditor.tsx
    SkillsEditor.tsx
    EducationEditor.tsx
    TemplateSelector.tsx
    FontSelector.tsx
    LayoutSelector.tsx
    ResumePreview.tsx
    templates/           # Individual template implementations
      ModernBlueTemplate.tsx
      ElegantPurpleTemplate.tsx
      ProfessionalGreenTemplate.tsx
      CreativeOrangeTemplate.tsx
      MinimalGrayTemplate.tsx
  data/                  # Static data for templates, fonts, layouts
    templates.ts
    fonts.ts
    layouts.ts
  hooks/
    useLocalStorage.ts   # Custom hook for persistent state
  types/
    resume.ts            # TypeScript types for resume data
```

## Main Flow

1. **Initialization:**
   - The app loads initial resume data or retrieves it from local storage using the `useLocalStorage` hook.
   - Default selections for template, font, and layout are also loaded or restored.

2. **Editing:**
   - The UI is divided into tabs: Personal Info, Experience, Projects, Skills, Education, and Design.
   - Each tab uses a dedicated editor component to update the corresponding section of the resume.
   - All changes are immediately saved to local storage.

3. **Customization:**
   - In the Design tab, users can select a template, font, and layout.
   - These options are defined in `data/templates.ts`, `data/fonts.ts`, and `data/layouts.ts`.

4. **Preview:**
   - The right panel (or a dedicated section) shows a live preview of the resume using the selected template, font, and layout.
   - The `ResumePreview` component dynamically renders the appropriate template.

5. **Export & Print:**
   - Users can export their resume data as a JSON file.
   - The Print/Save PDF button triggers the browser's print dialog, with print-optimized styles for professional output.

## Key Components

- **App.tsx:** Orchestrates the UI, manages state, and handles tab navigation, export, and print actions.
- **Editor Components:** Each section (personal info, experience, etc.) has its own editor for modularity.
- **TemplateSelector, FontSelector, LayoutSelector:** Allow users to customize the look and feel of their resume.
- **ResumePreview:** Renders the resume using the selected template, font, and layout.
- **Templates:** Each template file in `components/templates/` provides a unique resume design.

## Data Model

Defined in `types/resume.ts`:
- `Resume`: Main object containing all resume sections.
- `PersonalInfo`, `Experience`, `Project`, `Education`, `Skill`: Structured data for each section.
- `TemplateId`, `FontFamily`, `LayoutStyle`: Enumerations for design options.

## Customization

- **Templates:** Add new templates by creating a new file in `components/templates/` and updating `data/templates.ts`.
- **Fonts & Layouts:** Extend `data/fonts.ts` and `data/layouts.ts` to add more options.

## Development

- **Start Dev Server:** `npm run dev`
- **Build for Production:** `npm run build`
- **Lint:** `npm run lint`
- **Preview Production Build:** `npm run preview`
