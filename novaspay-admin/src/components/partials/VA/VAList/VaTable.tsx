import type { VA } from '@/types/va';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import ActionsDropdown from '@/components/custom/dropdown';
import { useDeleteVA } from '@/hooks/useVa';
import { useNavigate } from 'react-router-dom';

const VATable = ({ vas }: { vas: VA[] }) => {
  const navigate = useNavigate();
  const { mutate: deleteVA } = useDeleteVA();

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Purpose</TableHead>
            <TableHead>Currency</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Headquarters</TableHead>
            <TableHead>State</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Region</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vas.map((va) => (
            <TableRow key={va.id}>
              <TableCell>{va.purpose}</TableCell>
              <TableCell>{va.currency}</TableCell>
              <TableCell>{va.paymentMethod}</TableCell>
              <TableCell>{va.headquaters}</TableCell>
              <TableCell>{va.state}</TableCell>
              <TableCell>{va.city}</TableCell>
              <TableCell>{va.region}</TableCell>
              <TableCell>{va.status}</TableCell>
              <TableCell className="text-right">
                <ActionsDropdown
                  label="Actions"
                  actions={[
                    {
                      label: 'Edit',
                      onClick: () => {
                        navigate(`/admin/vas/edit/${va.id}`);
                      },
                    },
                    {
                      label: 'Delete',
                      variant: 'destructive',
                      onClick: () => {
                        deleteVA(va.id as number);
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

export default VATable;
