import { useClients } from '@/hooks/useClient';
import ClientTable from './ClientTable';
import type { Client } from '@/types/client';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Clients = () => {
  const navigate = useNavigate();

  const { data } = useClients();
  const clients: Client[] = data?.data || [];

  return (
    <div>
      <div className="mb-4 flex items-center justify-end">
        <Button
          onClick={() => {
            navigate('/admin/clients/create');
          }}
        >
          Create New
        </Button>
      </div>
      <ClientTable clients={clients} />
    </div>
  );
};

export default Clients;
