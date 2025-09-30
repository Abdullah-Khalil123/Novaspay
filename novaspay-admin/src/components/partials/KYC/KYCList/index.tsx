import { useKYCs } from '@/hooks/useKYC';
import KycTable from './KYCTable';
import type { KYC } from '@/types/kyc';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const KYCList = () => {
  const navigate = useNavigate();
  const { data } = useKYCs();
  const kycs: KYC[] = data?.data || [];

  return (
    <div>
      <div className="mb-4 flex items-center justify-end">
        <Button
          onClick={() => {
            navigate('/admin/kyc/create');
          }}
        >
          Create New
        </Button>
      </div>
      <KycTable kycs={kycs} />
    </div>
  );
};

export default KYCList;
