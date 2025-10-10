import { useTranslation } from 'react-i18next';
import Button from '../../components/custom/Button';
import Input from '../../components/custom/Input';
import { Search, RotateCcwIcon } from 'lucide-react';

interface ClientFiltersProps {
  filters: {
    clientName: string;
    country: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<any>>;
  refetch: () => void;
}

const ClientFilter = ({ filters, setFilters, refetch }: ClientFiltersProps) => {
  const { t } = useTranslation();

  return (
    <div className="bg-secondary flex space-x-8 space-y-4 flex-wrap p-3 rounded-md border border-border">
      <Input
        label={t('Client Name')}
        value={filters.clientName}
        onChange={(e) =>
          setFilters((prev: any) => ({ ...prev, clientName: e.target.value }))
        }
      />
      <Input
        label={t('Country')}
        value={filters.country}
        onChange={(e) =>
          setFilters((prev: any) => ({ ...prev, country: e.target.value }))
        }
      />

      <div className="flex space-x-4">
        <Button onClick={refetch}>
          <p className="flex items-center gap-1">
            <Search size={16} />
            {t('Search')}
          </p>
        </Button>
        <Button
          onClick={() => {
            setFilters({ clientName: '', country: '' });
            Promise.resolve().then(refetch);
          }}
        >
          <p className="flex items-center gap-1">
            <RotateCcwIcon size={16} />
            {t('Reset')}
          </p>
        </Button>
      </div>
    </div>
  );
};

export default ClientFilter;
