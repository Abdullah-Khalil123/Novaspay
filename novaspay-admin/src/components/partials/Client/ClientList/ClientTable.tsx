import type { Client } from '@/types/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import ActionsDropdown from '@/components/custom/dropdown';
import { useDeleteClient } from '@/hooks/useClient';
import { useNavigate } from 'react-router-dom';

const ClientTable = ({ clients }: { clients: Client[] }) => {
  const navigate = useNavigate();
  const { mutate: deleteClient } = useDeleteClient();

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Agent Name</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((c) => (
            <TableRow key={c.id}>
              <TableCell>{c.name}</TableCell>
              <TableCell>{c.email}</TableCell>
              <TableCell>{c.country}</TableCell>
              <TableCell>{c.agentName}</TableCell>
              <TableCell className="text-right">
                <ActionsDropdown
                  label="Actions"
                  actions={[
                    {
                      label: 'Edit',
                      onClick: () => {
                        navigate(`/admin/clients/edit/${c.id}`);
                      },
                    },
                    {
                      label: 'Delete',
                      variant: 'destructive',
                      onClick: () => {
                        deleteClient(c.id as number);
                      },
                    },
                  ]}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ClientTable;
