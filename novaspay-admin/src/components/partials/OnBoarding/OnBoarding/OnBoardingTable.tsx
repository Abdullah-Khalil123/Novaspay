import type { OnBoarding } from '@/types/onBoarding';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import ActionsDropdown from '@/components/custom/dropdown';
import { useDeleteOnboarding } from '@/hooks/useOnBoarding';
import { useNavigate } from 'react-router-dom';

const OnboardingTable = ({ onboardings }: { onboardings: OnBoarding[] }) => {
  const navigate = useNavigate();
  const { mutate: deleteOnboarding } = useDeleteOnboarding();

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client Name</TableHead>
            <TableHead>Account Error</TableHead>
            <TableHead>Bank Account Status</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {onboardings.map((ob) => (
            <TableRow key={ob.id}>
              <TableCell>{ob.clientName}</TableCell>
              <TableCell>{ob.accountErrorMessage}</TableCell>
              <TableCell>{ob.bankAccountStatusMsg}</TableCell>
              <TableCell>{ob.reason}</TableCell>
              <TableCell>{ob.createdAt}</TableCell>
              <TableCell>{ob.updatedAt}</TableCell>
              <TableCell className="text-right">
                <ActionsDropdown
                  label="Actions"
                  actions={[
                    {
                      label: 'Edit',
                      onClick: () => {
                        navigate(`/admin/onboardings/edit/${ob.id}`);
                      },
                    },
                    {
                      label: 'Delete',
                      variant: 'destructive',
                      onClick: () => {
                        deleteOnboarding(ob.id as number);
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

export default OnboardingTable;
