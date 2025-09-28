import AccountsFilters from '../Account/filter';
import PageFilters from '../Account/pagination';

const HistoryPage = () => {
  return (
    <div className="px-padding mt-2">
      <AccountsFilters />
      HistoryPage
      <PageFilters />
    </div>
  );
};

export default HistoryPage;
