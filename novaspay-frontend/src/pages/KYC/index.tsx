import AccountsFilters from '../Account/filter';
import PageFilters from '../Account/pagination';

const KYCPage = () => {
  return (
    <div className="px-padding mt-2">
      <AccountsFilters />
      KYCPage
      <PageFilters />
    </div>
  );
};

export default KYCPage;
