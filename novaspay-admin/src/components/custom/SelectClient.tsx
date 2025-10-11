'use client';

import { useEffect, useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ChevronsUpDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useClients } from '@/hooks/useClient';
import type { Client } from '@/types/client';

interface SelectClientProps {
  value?: number | null;
  onChange?: (id: number | null) => void;
}

const SelectClient = ({ value, onChange }: SelectClientProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  // Fetch clients with debounced search
  const { data, isLoading } = useClients({
    clientName: debouncedSearch || undefined,
    id: value || undefined,
  });

  const clients = useMemo(() => data?.data || [], [data]);

  const selectedClient = useMemo(
    () => clients.find((c: Client) => c.id === value),
    [clients, value]
  );

  const handleSelect = (clientId: number) => {
    const newValue = clientId === value ? null : clientId;
    onChange?.(newValue);
    setOpen(false);
    setSearch('');
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={isLoading && !selectedClient}
        >
          <span className="truncate">
            {selectedClient ? selectedClient.name : 'Select Client'}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search client..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            {isLoading ? (
              <CommandEmpty>Loading...</CommandEmpty>
            ) : clients.length > 0 ? (
              <CommandGroup>
                {clients.map((client: Client) => (
                  <CommandItem
                    key={client.id}
                    value={String(client.id)}
                    onSelect={() => handleSelect(client.id as number)}
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        client.id === value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    <span className="truncate">{client.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : (
              <CommandEmpty>
                {search ? 'No clients found.' : 'Start typing to search...'}
              </CommandEmpty>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectClient;
