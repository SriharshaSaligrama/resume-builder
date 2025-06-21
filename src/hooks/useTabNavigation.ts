import { useState } from 'react';

export const useTabNavigation = (initialTab: string = 'personal') => {
    const [activeTab, setActiveTab] = useState(initialTab);

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
    };

    return {
        activeTab,
        handleTabChange,
    };
};