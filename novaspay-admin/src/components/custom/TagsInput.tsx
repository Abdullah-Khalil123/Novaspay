// components/TagsInput.tsx
import React from 'react';
import { Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';

interface TagsInputProps {
  control: any;
  name: string;
  placeholder?: string;
  asNumber?: boolean;
}

const TagsInput: React.FC<TagsInputProps> = ({
  control,
  name,
  placeholder = 'Type and press Enter',
  asNumber = false,
}) => {
  return (
    <div>
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          const addTag = (tag: string) => {
            if (!tag.trim() || field.value?.includes(tag)) return;
            field.onChange([...(field.value || []), tag.trim()]);
          };

          const removeTag = (tag: string) => {
            field.onChange(field.value.filter((t: string) => t !== tag));
          };

          return (
            <div>
              <Input
                type="text"
                placeholder={placeholder}
                className="border p-2 rounded-md w-full"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();

                    asNumber
                      ? addTag(e.currentTarget.value)
                      : addTag(e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {field.value?.map((tag: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center bg-gray-200 px-2 py-1 rounded-md text-sm"
                  >
                    {tag?.name || tag}
                    <button
                      type="button"
                      className="ml-1 font-bold"
                      onClick={() => removeTag(tag)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default TagsInput;
