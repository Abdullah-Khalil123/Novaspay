import AccountsFilters from '../Account/filter';
import PageFilters from '../Account/pagination';

const OnboardingPage = () => {
  return (
    <div className="px-padding mt-2">
      <AccountsFilters />
      OnboardingPage
      <PageFilters />
    </div>
  );
};

export default OnboardingPage;
