import { useOnboardings } from '@/hooks/useOnBoarding';
import OnboardingTable from './OnBoardingTable';
import type { OnBoarding } from '@/types/onBoarding';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Onboardings = () => {
  const navigate = useNavigate();

  const { data } = useOnboardings();
  const onboardings: OnBoarding[] = data?.data || [];

  return (
    <div>
      <div className="mb-4 flex items-center justify-end">
        <Button
          onClick={() => {
            navigate('/admin/onboardings/create');
          }}
        >
          Create New
        </Button>
      </div>
      <OnboardingTable onboardings={onboardings} />
    </div>
  );
};

export default Onboardings;
