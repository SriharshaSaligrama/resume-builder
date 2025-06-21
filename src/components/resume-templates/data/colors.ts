export interface ColorTheme {
    headerBg: string;
    printHeaderBg: string;
    borderColor: string;
    textColor: string;
    printTextColor: string;
    tagBg: string;
    printTagBg: string;
    tagText: string;
    printTagText: string;
}

export const colorThemes: Record<string, ColorTheme> = {
    blue: {
        headerBg: 'bg-gradient-to-r from-blue-600 to-blue-800',
        printHeaderBg: 'print:bg-blue-700',
        borderColor: 'border-blue-600',
        textColor: 'text-blue-600',
        printTextColor: 'print:text-blue-700',
        tagBg: 'bg-blue-100',
        printTagBg: 'print:bg-blue-50',
        tagText: 'text-blue-800',
        printTagText: 'print:text-blue-900'
    },
    purple: {
        headerBg: 'bg-gradient-to-r from-purple-600 to-purple-800',
        printHeaderBg: 'print:bg-purple-700',
        borderColor: 'border-purple-600',
        textColor: 'text-purple-600',
        printTextColor: 'print:text-purple-700',
        tagBg: 'bg-purple-100',
        printTagBg: 'print:bg-purple-50',
        tagText: 'text-purple-800',
        printTagText: 'print:text-purple-900'
    },
    emerald: {
        headerBg: 'bg-gradient-to-r from-emerald-600 to-emerald-800',
        printHeaderBg: 'print:bg-emerald-700',
        borderColor: 'border-emerald-600',
        textColor: 'text-emerald-600',
        printTextColor: 'print:text-emerald-700',
        tagBg: 'bg-emerald-100',
        printTagBg: 'print:bg-emerald-50',
        tagText: 'text-emerald-800',
        printTagText: 'print:text-emerald-900'
    },
    orange: {
        headerBg: 'bg-gradient-to-r from-orange-600 to-orange-800',
        printHeaderBg: 'print:bg-orange-700',
        borderColor: 'border-orange-600',
        textColor: 'text-orange-600',
        printTextColor: 'print:text-orange-700',
        tagBg: 'bg-orange-100',
        printTagBg: 'print:bg-orange-50',
        tagText: 'text-orange-800',
        printTagText: 'print:text-orange-900'
    },
    gray: {
        headerBg: 'bg-gradient-to-r from-gray-700 to-gray-900',
        printHeaderBg: 'print:bg-gray-800',
        borderColor: 'border-gray-600',
        textColor: 'text-gray-600',
        printTextColor: 'print:text-gray-700',
        tagBg: 'bg-gray-100',
        printTagBg: 'print:bg-gray-50',
        tagText: 'text-gray-800',
        printTagText: 'print:text-gray-900'
    }
};

export const getColorTheme = (primaryColor: string): ColorTheme => {
    return colorThemes[primaryColor] || colorThemes.blue;
};