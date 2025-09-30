import { useVAs } from '@/hooks/useVa';
import VATable from './VaTable';
import type { VA } from '@/types/va';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const VAs = () => {
  const navigate = useNavigate();

  const { data } = useVAs();
  const vas: VA[] = data?.data || [];

  return (
    <div>
      <div className="mb-4 flex items-center justify-end">
        <Button
          onClick={() => {
            navigate('/admin/vas/create');
          }}
        >
          Create New
        </Button>
      </div>
      <VATable vas={vas} />
    </div>
  );
};

export default VAs;
