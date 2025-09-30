import type { KYC } from '@/types/kyc';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import ActionsDropdown from '@/components/custom/dropdown';
import { useDeleteKYC } from '@/hooks/useKYC';
import { useNavigate } from 'react-router-dom';

const KycTable = ({ kycs }: { kycs: KYC[] }) => {
  const navigate = useNavigate();
  const { mutate: deleteKYC } = useDeleteKYC();

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {kycs.map((kyc) => (
            <TableRow key={kyc.id}>
              <TableCell>{kyc.email}</TableCell>
              <TableCell>{kyc.name || '-'}</TableCell>
              <TableCell>{kyc.phone || '-'}</TableCell>
              <TableCell>{kyc.type || '-'}</TableCell>
              <TableCell>{kyc.status || '-'}</TableCell>
              <TableCell>{kyc.reason || '-'}</TableCell>
              <TableCell>
                {new Date(kyc.createdAt as string).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                <ActionsDropdown
                  label="Actions"
                  actions={[
                    {
                      label: 'Edit',
                      onClick: () => {
                        navigate(`/admin/kyc/edit/${kyc.id}`);
                      },
                    },
                    {
                      label: 'Delete',
                      variant: 'destructive',
                      onClick: () => {
                        deleteKYC(kyc.id as number);
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

export default KycTable;
