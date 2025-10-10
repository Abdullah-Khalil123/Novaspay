import type { Admin } from '@/types/admin';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import ActionsDropdown from '@/components/custom/dropdown';
import { useDeleteAdmin } from '@/hooks/useAdmin';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const AdminTable = ({ admins }: { admins: Admin[] }) => {
  const navigate = useNavigate();
  const { mutate: deleteAdmin } = useDeleteAdmin();

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Last Active</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {admins.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-8 text-muted-foreground"
              >
                No admins found
              </TableCell>
            </TableRow>
          ) : (
            admins.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell>{admin.id}</TableCell>
                <TableCell className="font-medium">{admin.name}</TableCell>
                <TableCell>{admin.email}</TableCell>
                <TableCell>
                  {admin.lastActive
                    ? format(new Date(admin.lastActive), 'MMM dd, yyyy HH:mm')
                    : 'Never'}
                </TableCell>
                <TableCell className="text-right">
                  <ActionsDropdown
                    label="Actions"
                    actions={[
                      {
                        label: 'Edit',
                        onClick: () => {
                          navigate(`/admin/admins/edit/${admin.id}`);
                        },
                      },
                      {
                        label: 'Delete',
                        variant: 'destructive',
                        onClick: () => {
                          deleteAdmin(admin?.id as number);
                        },
                      },
                    ]}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminTable;
