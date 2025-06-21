import React from 'react';
import { Trash2, Plus } from 'lucide-react';
import { ActionButton } from './ActionButton';
import { Textarea } from './Textarea';

interface DynamicFormListProps {
    label: string;
    items: string[];
    onItemChange: (index: number, value: string) => void;
    onAddItem: () => void;
    onRemoveItem: (index: number) => void;
    placeholder?: string;
    rows?: number;
    addButtonText?: string;
    minItems?: number;
}

export const DynamicFormList: React.FC<DynamicFormListProps> = ({
    label,
    items,
    onItemChange,
    onAddItem,
    onRemoveItem,
    placeholder = "Enter text...",
    rows = 2,
    addButtonText = "Add item",
    minItems = 1
}) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            {items.map((item, index) => (
                <div key={index} className="flex gap-2 mb-2">
                    <Textarea
                        value={item}
                        onChange={(e) => onItemChange(index, e.target.value)}
                        rows={rows}
                        placeholder={placeholder}
                        className="flex-1"
                    />
                    {items.length > minItems && (
                        <ActionButton
                            variant="danger"
                            onClick={() => onRemoveItem(index)}
                            className="p-1"
                        >
                            <Trash2 size={16} />
                        </ActionButton>
                    )}
                </div>
            ))}
            <ActionButton
                variant="secondary"
                onClick={onAddItem}
                icon={Plus}
                className="text-sm"
            >
                {addButtonText}
            </ActionButton>
        </div>
    );
};