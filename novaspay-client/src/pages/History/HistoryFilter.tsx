import Button from '../../components/custom/Button';
import Input from '../../components/custom/Input';
import Select from '../../components/custom/SelectG';
import { Search, RotateCcwIcon, Download } from 'lucide-react';

interface HistoryFiltersProps {
  filters: {
    orderId: string;
    area: string;
    receiverName: string;
    receiverNumber: string;
    orderType: string;
    status: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<any>>;
  refetch: () => void;
  onDownload?: () => void;
}

const HistoryFilter = ({
  filters,
  setFilters,
  refetch,
  onDownload,
}: HistoryFiltersProps) => {
  return (
    <div className="bg-secondary flex space-x-8 space-y-4 flex-wrap p-2 rounded-md border border-border">
      <Input
        label="Order Id"
        value={filters.orderId}
        onChange={(e) =>
          setFilters((prev: any) => ({ ...prev, orderId: e.target.value }))
        }
      />
      <Select
        label="Area"
        options={['Europe', 'EUR/USD-W']}
        value={filters.area}
        onChange={(e) => setFilters((prev: any) => ({ ...prev, area: e }))}
      />
      <Input
        label="Receiving Name"
        value={filters.receiverName}
        onChange={(e) =>
          setFilters((prev: any) => ({ ...prev, receiverName: e.target.value }))
        }
      />
      <Input
        label="Receiving Number"
        value={filters.receiverNumber}
        onChange={(e) =>
          setFilters((prev: any) => ({
            ...prev,
            receiverNumber: e.target.value,
          }))
        }
      />
      <Select
        label="Order Type"
        options={['PAYMENT', 'TRANSFER', 'EXCHANGE', 'DEPOSIT', 'FEE']}
        value={filters.orderType}
        onChange={(e) => setFilters((prev: any) => ({ ...prev, orderType: e }))}
      />
      <Select
        label="Status"
        options={['Active', 'Inactive', 'Pending']}
        value={filters.status}
        onChange={(e) => setFilters((prev: any) => ({ ...prev, status: e }))}
      />

      <div className="flex space-x-4">
        <Button onClick={refetch}>
          <p className="flex items-center gap-1">
            <Search size={16} /> Search
          </p>
        </Button>
        <Button
          onClick={() => {
            setFilters({
              orderId: '',
              area: '',
              receiverName: '',
              receiverNumber: '',
              orderType: '',
              status: '',
            });
            Promise.resolve().then(refetch);
          }}
        >
          <p className="flex items-center gap-1">
            <RotateCcwIcon size={16} /> Reset
          </p>
        </Button>
        {onDownload && (
          <Button onClick={onDownload}>
            <p className="flex items-center gap-1">
              <Download size={16} /> Download
            </p>
          </Button>
        )}
      </div>
    </div>
  );
};

export default HistoryFilter;
