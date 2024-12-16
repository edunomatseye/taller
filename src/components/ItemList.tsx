import React from 'react';
import { Trash2 } from 'lucide-react';
import type { Item } from '../types';

interface ItemListProps {
  items: Item[];
  onDelete: (id: number) => Promise<void>;
}

export function ItemList({ items, onDelete }: ItemListProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white p-6 rounded-lg shadow-md flex justify-between items-start"
        >
          <div>
            <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
            <p className="mt-1 text-gray-600">{item.description}</p>
            <p className="mt-2 text-sm text-gray-500">
              Created: {new Date(item.createdAt).toLocaleDateString()}
            </p>
          </div>
          <button
            onClick={() => onDelete(item.id)}
            className="text-red-600 hover:text-red-800 focus:outline-none"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      ))}
      {items.length === 0 && (
        <p className="text-center text-gray-500">No items yet. Add one above!</p>
      )}
    </div>
  );
}