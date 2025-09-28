import * as React from 'react';
import { Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { useCategories } from '@/hooks/useCategories';
import type { Category } from '@/types/categories';

type Props = {
  game_id: number | string;
  control: any; // from react-hook-form
  name: string; // "category_ids"
};

// Build category tree
function buildCategoryTree(categories: Category[]) {
  const map = new Map<number, Category & { children: Category[] }>();
  const roots: (Category & { children: Category[] })[] = [];

  categories.forEach((cat) => {
    map.set(cat.id, { ...cat, children: [] });
  });

  categories.forEach((cat) => {
    if (cat.parent_id && map.has(cat.parent_id)) {
      map.get(cat.parent_id)!.children.push(map.get(cat.id)!);
    } else {
      roots.push(map.get(cat.id)!);
    }
  });

  return roots;
}

// Recursive renderer for tree
function CategoryNodes({
  nodes,
  selected,
  onToggle,
  depth = 0,
}: {
  nodes: (Category & { children: Category[] })[];
  selected: number[];
  onToggle: (id: number) => void;
  depth?: number;
}) {
  return (
    <>
      {nodes.map((node) => (
        <React.Fragment key={node.id}>
          <CommandItem
            className={cn(
              'flex items-center space-x-2 pl-2',
              depth > 0 && `ml-${depth * 2}`
            )}
            onSelect={() => onToggle(node.id)}
          >
            <Checkbox
              checked={selected.includes(node.id)}
              onCheckedChange={() => onToggle(node.id)}
              className="mr-2"
            />
            <span>{node.name}</span>
          </CommandItem>
          {node.children.length > 0 && (
            <CategoryNodes
              nodes={node.children}
              selected={selected}
              onToggle={onToggle}
              depth={depth + 1}
            />
          )}
        </React.Fragment>
      ))}
    </>
  );
}

const CategorySelection = ({ game_id, control, name }: Props) => {
  const { data } = useCategories({ game_id });
  const categories: Category[] = data?.data || [];

  const tree = buildCategoryTree(categories);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const selectedIds: number[] = field.value || [];

        const toggleCategory = (id: number) => {
          if (selectedIds.includes(id)) {
            field.onChange(selectedIds.filter((x) => x !== id));
          } else {
            field.onChange([...selectedIds, id]);
          }
        };

        const selectedLabels = categories
          .filter((cat) => selectedIds.includes(cat.id))
          .map((cat) => cat.name);

        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  'w-full justify-between',
                  !selectedIds.length && 'text-muted-foreground'
                )}
              >
                {selectedIds.length > 0
                  ? selectedLabels.join(', ')
                  : 'Select categories'}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="start" // aligns left edge
              sideOffset={4} // adds spacing from trigger
              collisionPadding={8} // keeps it inside viewport
              className="max-h-[300px] w-[300px] overflow-y-auto p-0"
            >
              <Command>
                <CommandInput placeholder="Search categories..." />
                <CommandEmpty>No category found.</CommandEmpty>
                <CommandGroup>
                  <CategoryNodes
                    nodes={tree}
                    selected={selectedIds}
                    onToggle={toggleCategory}
                  />
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        );
      }}
    />
  );
};

export default CategorySelection;
