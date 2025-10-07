'use client';

import { useState } from 'react';
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

  const { data, isLoading } = useClients({ clientName: search });
  const clients: Client[] = data?.data || [];
  const selectedClient = clients.find((c) => c.id === value);

  const handleSelect = (clientId: number) => {
    onChange?.(clientId);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between"
        >
          {isLoading
            ? 'Loading...'
            : selectedClient
            ? selectedClient.name
            : 'Select Client'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput
            placeholder="Search client..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            {isLoading ? (
              <CommandEmpty>Loading...</CommandEmpty>
            ) : clients.length ? ( // ✅ use `clients.length`
              <CommandGroup>
                {clients.map((client) => (
                  <CommandItem
                    key={client.id}
                    onSelect={() => handleSelect(client?.id as number)}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        client.id === value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {client.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : (
              <CommandEmpty>No clients found.</CommandEmpty>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectClient;
