import Button from '../../components/custom/Button';
import { Search, RotateCcwIcon } from 'lucide-react';
import Select from '../../components/custom/SelectG';
import { useTranslation } from 'react-i18next';

const OnboardingFilters = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-secondary flex space-x-8 space-y-4 flex-wrap p-2 rounded-md border border-border">
      <Select label={t('Area')} options={[t('Europe'), 'EUR/USD-W']} />
      <div className="flex space-x-4">
        <Button
          children={
            <p className="flex items-center gap-1">
              <Search size={16} />
              {t('Search')}
            </p>
          }
        />
        <Button
          children={
            <p className="flex items-center gap-1">
              <RotateCcwIcon size={16} />
              {t('Reset')}
            </p>
          }
        />
      </div>
    </div>
  );
};

export default OnboardingFilters;
