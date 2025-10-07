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
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Middle Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Date of Birth</TableHead>
            <TableHead>Contact Number</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>City</TableHead>
            <TableHead>State</TableHead>
            <TableHead>Postal Code</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Company Street</TableHead>
            <TableHead>Company City</TableHead>
            <TableHead>Headquarters</TableHead>
            <TableHead>Area</TableHead>
            <TableHead>Date Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {kycs.map((kyc) => (
            <TableRow key={kyc.id}>
              <TableCell>{kyc.email || '-'}</TableCell>
              <TableCell>{kyc.firstName || '-'}</TableCell>
              <TableCell>{kyc.middleName || '-'}</TableCell>
              <TableCell>{kyc.lastName || '-'}</TableCell>
              <TableCell>{kyc.phone || '-'}</TableCell>
              <TableCell>{kyc.type || '-'}</TableCell>
              <TableCell>{kyc.status || '-'}</TableCell>
              <TableCell>{kyc.reason || '-'}</TableCell>
              <TableCell>
                {kyc.dateOfBirth
                  ? new Date(kyc.dateOfBirth as string).toLocaleDateString()
                  : '-'}
              </TableCell>
              <TableCell>{kyc.contactNumber || '-'}</TableCell>
              <TableCell>{kyc.companyAddress || '-'}</TableCell>
              <TableCell>{kyc.city || '-'}</TableCell>
              <TableCell>{kyc.state || '-'}</TableCell>
              <TableCell>{kyc.postalCode || '-'}</TableCell>
              <TableCell>{kyc.companyCountry || '-'}</TableCell>
              <TableCell>{kyc.companyStreet || '-'}</TableCell>
              <TableCell>{kyc.companyCity || '-'}</TableCell>
              <TableCell>{kyc.headquarters || '-'}</TableCell>
              <TableCell>{kyc.area || '-'}</TableCell>
              <TableCell>
                {kyc.createdAt
                  ? new Date(kyc.createdAt as string).toLocaleDateString()
                  : '-'}
              </TableCell>
              <TableCell className="text-right">
                <ActionsDropdown
                  label="Actions"
                  actions={[
                    {
                      label: 'Edit',
                      onClick: () => navigate(`/admin/kyc/edit/${kyc.id}`),
                    },
                    {
                      label: 'Delete',
                      variant: 'destructive',
                      onClick: () => deleteKYC(kyc.id as number),
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
