import type { Application } from '@/types/application';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import ActionsDropdown from '@/components/custom/dropdown';
import { useNavigate } from 'react-router-dom';
import { updateApplication } from '@/actions/application';
import { queryClient } from '@/providers/react-query';
import { toast } from 'sonner';

const ApplicationTable = ({
  applications,
}: {
  applications: Application[];
}) => {
  const navigate = useNavigate();

  async function handleUpdateApplication(id: number, status: string) {
    updateApplication(id, { status })
      .then(() => {
        queryClient.invalidateQueries({
          queryKey: ['applications'],
        });
      })
      .then(() => {
        toast.success(`Application ${status.toLowerCase()} successfully!`);
      })
      .catch((error) => {
        console.error('Failed to update application:', error);
        toast.error(`Failed to update application: ${error.message}`);
      });
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>Approver</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Transaction Type</TableHead>
            <TableHead>From Currency</TableHead>
            <TableHead>To Currency</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Estimated Amount</TableHead>
            <TableHead>Estimated Fee</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Reference Rate</TableHead>
            <TableHead>VA Bank Account</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead className="text-right sticky right-0 bg-white shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.1)]">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applications.map((app) => (
            <TableRow key={app.id}>
              <TableCell>{app?.client?.name}</TableCell>
              <TableCell>{app?.approver?.name}</TableCell>
              <TableCell>{app.status}</TableCell>
              <TableCell>{app.transactionType}</TableCell>
              <TableCell>{app.fromCurrency}</TableCell>
              <TableCell>{app.toCurrency}</TableCell>
              <TableCell>{app.amount}</TableCell>
              <TableCell>{app.estimatedAmount}</TableCell>
              <TableCell>{app.estimatedFee}</TableCell>
              <TableCell>{app.totalAmount}</TableCell>
              <TableCell>{app.referenceRate}</TableCell>
              <TableCell>{app.vaBankAccount}</TableCell>
              <TableCell>{app.createdAt}</TableCell>
              <TableCell>{app.updatedAt}</TableCell>
              <TableCell className="text-right sticky right-0 bg-white shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.1)]">
                <ActionsDropdown
                  label="Actions"
                  actions={[
                    {
                      label: 'Edit',
                      onClick: () => {
                        navigate(`/admin/applications/edit/${app.id}`);
                      },
                    },
                    {
                      label: 'Approve',
                      onClick: () => {
                        // call your update hook here
                        console.log('Approve', app.id);
                        handleUpdateApplication(app.id as number, 'Approved');
                      },
                    },
                    {
                      label: 'Reject',
                      variant: 'destructive',
                      onClick: () => {
                        console.log('Reject', app.id);
                        handleUpdateApplication(app.id as number, 'Rejected');
                      },
                    },
                    {
                      label: 'Delete',
                      variant: 'destructive',
                      onClick: () => {
                        console.log('Delete', app.id);
                        // useDeleteApplication(app.id)
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

export default ApplicationTable;
