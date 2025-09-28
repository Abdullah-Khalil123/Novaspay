import AccountsFilters from './filter';
import PageFilters from './pagination';

const mockAccounts = [
  {
    bankingName: 'Standard Chartered',
    currencyClient: 'USD',
    clientName: 'John Doe',
    ibanNumber: 'US12 3456 7890 1234 5678',
    balance: '$12,450.00',
    accountNumber: '123456789',
    accountName: 'John D. Savings',
    bankingAddress: '123 Wall Street, New York, USA',
    creationDate: '2023-01-15',
    latestUpdate: '2025-09-25',
  },
  {
    bankingName: 'Habib Bank Limited',
    currencyClient: 'PKR',
    clientName: 'Ali Khan',
    ibanNumber: 'PK36 HABB 0000 1234 5678',
    balance: '₨950,000',
    accountNumber: '876543210',
    accountName: 'Ali K. Current',
    bankingAddress: 'Blue Area, Islamabad, Pakistan',
    creationDate: '2024-06-10',
    latestUpdate: '2025-09-20',
  },
  {
    bankingName: 'Barclays',
    currencyClient: 'EUR',
    clientName: 'Emma Watson',
    ibanNumber: 'GB29 BARC 2000 1234 5678',
    balance: '€8,300',
    accountNumber: '345678901',
    accountName: 'Emma W. Business',
    bankingAddress: '10 Downing St, London, UK',
    creationDate: '2022-09-01',
    latestUpdate: '2025-09-22',
  },
  {
    bankingName: 'Barclays',
    currencyClient: 'EUR',
    clientName: 'Emma Watson',
    ibanNumber: 'GB29 BARC 2000 1234 5678',
    balance: '€8,300',
    accountNumber: '345678901',
    accountName: 'Emma W. Business',
    bankingAddress: '10 Downing St, London, UK',
    creationDate: '2022-09-01',
    latestUpdate: '2025-09-22',
  },
  {
    bankingName: 'Barclays',
    currencyClient: 'EUR',
    clientName: 'Emma Watson',
    ibanNumber: 'GB29 BARC 2000 1234 5678',
    balance: '€8,300',
    accountNumber: '345678901',
    accountName: 'Emma W. Business',
    bankingAddress: '10 Downing St, London, UK',
    creationDate: '2022-09-01',
    latestUpdate: '2025-09-22',
  },
];

const ReceiveAccount = () => {
  return (
    <div className="px-padding mt-2">
      <AccountsFilters />

      <div className="bg-secondary border mt-4 border-border p-2">
        <div className="overflow-x-auto">
          <table className="table-fixed text-sm w-full border-collapse">
            <thead className="text-text-primary bg-background">
              <tr>
                {[
                  'Banking Name',
                  'Currency Client',
                  'Client Name',
                  'IBAN Number',
                  'Balance',
                  'Account Number',
                  'Account Name',
                  'Banking Address',
                  'Creation Date',
                  'Latest Update',
                ].map((header, i) => (
                  <th key={i} className="w-[80px] min-w-[80px] px-2 py-2">
                    <div>{header}</div>
                  </th>
                ))}
                <th className="w-[40px]"></th>
              </tr>
            </thead>
            <tbody className="text-center text-text-primary">
              {mockAccounts.map((acc, idx) => (
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
                  <td className="w-[40px] text-sidebar-bg text-end">
                    <p className="hover:text-[#60831a] cursor-pointer">
                      Details
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <PageFilters />
      </div>
    </div>
  );
};

export default ReceiveAccount;
