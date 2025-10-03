import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterField {
  type: 'text' | 'select';
  name: string;
  label: string;
  placeholder?: string;
  options?: FilterOption[]; // only for select
}

interface FilterBarProps {
  fields: FilterField[];
  values: Record<string, string>;
  onChange: (name: string, value: string) => void;
  onClear?: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  fields,
  values,
  onChange,
  onClear,
}) => {
  return (
    <div className="flex flex-wrap items-end gap-4 p-4 border rounded-lg bg-muted/30">
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col gap-1">
          <Label>{field.label}</Label>
          {field.type === 'text' ? (
            <Input
              placeholder={field.placeholder}
              value={values[field.name] || ''}
              onChange={(e) => onChange(field.name, e.target.value)}
              className="w-48"
            />
          ) : (
            <Select
              value={values[field.name] || ''}
              onValueChange={(val) => onChange(field.name, val)}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder={field.placeholder || 'Select'} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      ))}

      {onClear && (
        <Button variant="outline" onClick={onClear}>
          Clear
        </Button>
      )}
    </div>
  );
};

export default FilterBar;
