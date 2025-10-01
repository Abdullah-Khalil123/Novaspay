import Button from '../../components/custom/Button';
import { Search, RotateCcwIcon } from 'lucide-react';
import Input from '../../components/custom/Input';

interface UserFiltersProps {
  filters: {
    email: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<any>>;
  refetch: () => void;
}

const UserFilters = ({ filters, setFilters, refetch }: UserFiltersProps) => {
  return (
    <div className="bg-secondary flex space-x-8 space-y-4 flex-wrap p-2 rounded-md border border-border">
      <Input
        label="Email"
        value={filters.email}
        onChange={(e) =>
          setFilters((prev: any) => ({ ...prev, email: e.target.value }))
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
            setFilters({ email: '' });
            Promise.resolve().then(refetch);
          }}
        >
          <p className="flex items-center gap-1">
            <RotateCcwIcon size={16} /> Reset
          </p>
        </Button>
      </div>
    </div>
  );
};

export default UserFilters;
