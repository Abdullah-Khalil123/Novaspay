import Button from '../../components/custom/Button';
import Input from '../../components/custom/Input';
import { Search, RotateCcwIcon, Upload } from 'lucide-react';

interface KYCFiltersProps {
  filters: {
    email: string;
    name: string;
    status: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<any>>;
  refetch: () => void;
  onUpload?: () => void;
}

const KYCFilter = ({
  filters,
  setFilters,
  refetch,
  onUpload,
}: KYCFiltersProps) => {
  return (
    <div className="bg-secondary flex space-x-8 space-y-4 flex-wrap p-2 rounded-md border border-border">
      <Input
        label="Email"
        value={filters.email}
        onChange={(e) =>
          setFilters((prev: any) => ({ ...prev, email: e.target.value }))
        }
      />
      <Input
        label="Name"
        value={filters.name}
        onChange={(e) =>
          setFilters((prev: any) => ({ ...prev, name: e.target.value }))
        }
      />
      <Input
        label="Status"
        value={filters.status}
        onChange={(e) =>
          setFilters((prev: any) => ({ ...prev, status: e.target.value }))
        }
      />

      <div className="flex space-x-4">
        <Button onClick={refetch}>
          <p className="flex items-center gap-1">
            <Search size={16} /> Search
          </p>
        </Button>
        <Button
          onClick={() => {
            setFilters({ email: '', name: '', status: '' });
            Promise.resolve().then(refetch);
          }}
        >
          <p className="flex items-center gap-1">
            <RotateCcwIcon size={16} /> Reset
          </p>
        </Button>
        {onUpload && (
          <Button onClick={onUpload}>
            <p className="flex items-center gap-1">
              <Upload size={16} /> KYC 批量导入
            </p>
          </Button>
        )}
      </div>
    </div>
  );
};

export default KYCFilter;
