# Resume Builder

A modern, customizable resume builder built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- **Live Resume Editing:** Edit personal info, experience, projects, skills, and education in a user-friendly interface.
- **Template Selection:** Choose from multiple professionally designed resume templates.
- **Font & Layout Customization:** Select from various fonts and layouts to personalize your resume.
- **Live Preview:** Instantly preview your resume as you edit.
- **Export & Print:**
  - Export your resume data as JSON.
  - Print/save as PDF with a print-optimized page layout.
  - Export your resume as a Word (.docx) file.
- **Persistent Data:** All changes are saved in your browser's local storage.

## Project Structure

```
src/
  App.tsx                # Main application logic and UI flow
  index.css              # Tailwind and global styles
  main.tsx               # React entry point
  utils/
    wordExport.ts        # Export resume as Word (.docx)

  components/
    features/            # Feature editors for each resume section
      PersonalInfoEditor.tsx
      ExperienceEditor.tsx
      ProjectsEditor.tsx
      SkillsEditor.tsx
      EducationEditor.tsx

    layout/              # Layout and navigation components
      Header.tsx
      TabContent.tsx
      TabNavigation.tsx

    resume-templates/    # Resume rendering and template system
      data/
        colors.ts
      layouts/
        LayoutRenderer.tsx  # Handles all web and print layouts
      preview/
        ResumePreview.tsx
      sections/
        EducationSection.tsx
        ExperienceSection.tsx
        ProjectsSection.tsx
        ResumeHeader.tsx
        SkillsSection.tsx
        SummarySection.tsx
      selectors/
        FontSelector.tsx
        LayoutPreview.tsx
        LayoutSelector.tsx
        TemplateSelector.tsx
      templates/
        UnifiedTemplate.tsx

    ui/                  # Reusable UI components
      ActionButton.tsx
      DraggableCard.tsx
      DynamicFormList.tsx
      EditorCard.tsx
      EducationForm.tsx
      EmptyState.tsx
      FormField.tsx
      FormGrid.tsx
      FormSection.tsx
      Input.tsx
      TagInput.tsx
      Textarea.tsx

  data/                  # Static data for templates, fonts, layouts, tabs
    fonts.ts
    layouts.ts
    tabs.ts
    templates.ts

  hooks/                 # Custom React hooks for state and logic
    useDragAndDrop.ts
    useEducationEditor.ts
    useExperienceEditor.ts
    useLocalStorage.ts
    useProjectsEditor.ts
    useSkillsEditor.ts
    useTabNavigation.ts

  types/
    resume.ts            # TypeScript types for resume data

  vite-env.d.ts          # Vite environment types
```

## Main Flow

1. **Initialization:**
   - The app loads initial resume data or retrieves it from local storage using the `useLocalStorage` hook.
   - Default selections for template, font, and layout are also loaded or restored.

2. **Editing:**
   - The UI is divided into tabs (see `data/tabs.ts`): Personal Info, Experience, Projects, Skills, Education, and Design.
   - Each tab uses a dedicated editor component from `components/features/` to update the corresponding section of the resume.
   - All changes are immediately saved to local storage.

3. **Customization:**
   - In the Design tab, users can select a template, font, and layout.
   - These options are defined in `data/templates.ts`, `data/fonts.ts`, and `data/layouts.ts`.
   - The selectors in `components/resume-templates/selectors/` provide the UI for these choices.

4. **Preview:**
   - The right panel (or a dedicated section) shows a live preview of the resume using the selected template, font, and layout.
   - The `ResumePreview` component in `components/resume-templates/preview/` dynamically renders the appropriate template.

5. **Export & Print:**
   - Users can export their resume data as a JSON file.
   - The Print/Save PDF button triggers the browser's print dialog, with print-optimized styles for professional output.
   - Users can export their resume as a Word (.docx) file using the Word export feature.

## Key Components

- **App.tsx:** Orchestrates the UI, manages state, and handles tab navigation, export, print, and Word export actions.
- **Feature Editors:** Each section (personal info, experience, etc.) has its own editor in `components/features/`.
- **Layout Components:** Navigation and layout logic in `components/layout/`.
- **Template System:** Resume rendering logic and templates in `components/resume-templates/`.
- **UI Components:** Reusable form and UI elements in `components/ui/`.
- **Selectors:** UI for choosing templates, fonts, and layouts in `components/resume-templates/selectors/`.
- **Word Export:** Utility in `utils/wordExport.ts` for exporting the resume as a Word document.

## Data Model

Defined in `types/resume.ts`:
- `Resume`: Main object containing all resume sections.
- `PersonalInfo`, `Experience`, `Project`, `Education`, `Skill`: Structured data for each section.
- `TemplateId`, `FontFamily`, `LayoutStyle`: Enumerations for design options.

## Customization

- **Templates:** Add new templates by creating a new file in `components/resume-templates/templates/` and updating `data/templates.ts`.
- **Fonts & Layouts:** Extend `data/fonts.ts` and `data/layouts.ts` to add more options.

## Development

- **Start Dev Server:** `npm run dev`
- **Build for Production:** `npm run build`
- **Lint:** `npm run lint`
- **Preview Production Build:** `npm run preview`
