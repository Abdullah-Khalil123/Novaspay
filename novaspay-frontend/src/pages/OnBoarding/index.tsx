import PageFilters from '../Account/pagination';
import OnboardingFilters from './OnBoardingFilters';

const mockData = [
  {
    clientName: 'John Doe',
    accountErrorMsg: 'Invalid IBAN format',
    bankAccountStatusMsg: 'Verification Pending',
    reason: 'Incorrect account details',
    creationDate: '2025-09-01',
  },
  {
    clientName: 'Jane Smith',
    accountErrorMsg: 'Account frozen',
    bankAccountStatusMsg: 'Rejected',
    reason: 'Fraud suspicion',
    creationDate: '2025-08-28',
  },
  {
    clientName: 'Michael Johnson',
    accountErrorMsg: 'Bank not supported',
    bankAccountStatusMsg: 'Failed',
    reason: 'Unsupported bank',
    creationDate: '2025-09-10',
  },
  {
    clientName: 'Emily Brown',
    accountErrorMsg: 'Duplicate account',
    bankAccountStatusMsg: 'Rejected',
    reason: 'Duplicate submission',
    creationDate: '2025-09-15',
  },
  {
    clientName: 'David Lee',
    accountErrorMsg: 'Timeout',
    bankAccountStatusMsg: 'Verification Failed',
    reason: 'Bank API timeout',
    creationDate: '2025-09-20',
  },
];

const OnboardingPage = () => {
  return (
    <div className="px-padding mt-2">
      <OnboardingFilters />
      <div className="bg-secondary rounded-md border border-border mt-4 p-4">
        <div className="overflow-x-auto">
          <table className="table-fixed text-sm w-full border-collapse">
            <thead className="text-text-primary bg-background">
              <tr>
                {[
                  'Client Name',
                  'Account Error Msg',
                  'Bank Account Status Msg',
                  'Reason',
                  'Creation date',
                ].map((header, i) => (
                  <th key={i} className="w-[80px] min-w-[80px] px-2 py-2">
                    <div>{header}</div>
                  </th>
                ))}
                <th className="w-[120px] sticky right-0 bg-background z-10"></th>
              </tr>
            </thead>
            <tbody className="text-center text-text-primary">
              {mockData.map((acc, idx) => (
                <tr
                  key={idx}
                  className={
                    idx % 2 === 0
                      ? 'bg-background border-t border-t-border'
                      : 'border-t border-t-border'
                  }
                >
                  {Object.values(acc).map((val, i) => (
                    <td key={i} className="w-[80px] min-w-[80px] px-2 py-4">
                      <div className="truncate overflow-hidden whitespace-nowrap">
                        {val}
                      </div>
                    </td>
                  ))}
                  <td
                    className={`sticky right-0 font-sans text-center space-y-4 text-[#c2cb3d]`}
                  >
                    <p className="hover:text-[#60831a] cursor-pointer">
                      Details
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <PageFilters />
    </div>
  );
};

export default OnboardingPage;
