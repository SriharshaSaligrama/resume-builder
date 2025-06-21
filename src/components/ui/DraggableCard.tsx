import React from 'react';
import { GripVertical, Trash2 } from 'lucide-react';

interface DraggableCardProps {
    index: number;
    title: string;
    subtitle?: string;
    isExpanded: boolean;
    isDragging: boolean;
    isDragOver: boolean;
    onToggleExpand: () => void;
    onRemove: () => void;
    onDragStart: (e: React.DragEvent, index: number) => void;
    onDragOver: (e: React.DragEvent, index: number) => void;
    onDragLeave: () => void;
    onDrop: (e: React.DragEvent, index: number) => void;
    onDragEnd: () => void;
    children?: React.ReactNode;
}

export const DraggableCard: React.FC<DraggableCardProps> = ({
    index,
    title,
    subtitle,
    isExpanded,
    isDragging,
    isDragOver,
    onToggleExpand,
    onRemove,
    onDragStart,
    onDragOver,
    onDragLeave,
    onDrop,
    onDragEnd,
    children
}) => {
    return (
        <div
            draggable
            onDragStart={(e) => onDragStart(e, index)}
            onDragOver={(e) => onDragOver(e, index)}
            onDragLeave={onDragLeave}
            onDrop={(e) => onDrop(e, index)}
            onDragEnd={onDragEnd}
            className={`border border-gray-200 rounded-lg p-4 transition-all duration-200 ${isDragging ? 'opacity-50 scale-95' : ''
                } ${isDragOver ? 'border-blue-400 bg-blue-50 transform scale-102' : ''
                } cursor-move hover:shadow-md`}
        >
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <GripVertical
                        size={16}
                        className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
                    />
                    <button
                        onClick={onToggleExpand}
                        className="text-left flex-1"
                    >
                        <h3 className="font-medium text-gray-800 break-words">
                            {title}
                        </h3>
                        {subtitle && (
                            <p className="text-sm text-gray-600 break-words line-clamp-2 mt-1">
                                {subtitle}
                            </p>
                        )}
                    </button>
                </div>
                <button
                    onClick={onRemove}
                    className="text-red-600 hover:text-red-800 p-1 flex-shrink-0 ml-2"
                >
                    <Trash2 size={16} />
                </button>
            </div>

            {isExpanded && children && (
                <div className="space-y-4 mt-4">
                    {children}
                </div>
            )}
        </div>
    );
};