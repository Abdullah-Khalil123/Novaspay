import Pagination from '../../components/custom/Accordion';
import Input from '../../components/custom/Input';
import Select from '../../components/custom/Select';

const PageFilters = () => {
  return (
    <div className="flex justify-end mt-4 space-x-4">
      <Select
        label="Total 5"
        options={['10/page', '20/page', '30/page', '40/page', '50/page']}
      />
      <Pagination currentPage={2} onPageChange={() => {}} totalPages={3} />
      <Input
        label="Go to"
        type="number"
        className="w-12 text-center"
        defaultValue="1"
      />
    </div>
  );
};

export default PageFilters;
