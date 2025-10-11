import { getClientKYC } from '@/actions/kyc';
import Draggable from '@/components/custom/dragable';
import { useAccounts } from '@/hooks/useAccounts';
import { useKYCs } from '@/hooks/useKYC';
import { useTransactions } from '@/hooks/useTransaction';
import type { Account } from '@/types/accounts';
import type { KYC } from '@/types/kyc';
// import router from '@/router';
import type { Transaction } from '@/types/transaction';
import type { TFunction } from 'i18next';
import { ArrowDown, ArrowRight, Copy } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const maskAccountNumber = (accountNumber: string) => {
  if (!accountNumber) return '';
  const visiblePart = accountNumber.slice(-5); // last 5 characters
  const maskedPart = '*'.repeat(Math.max(0, accountNumber.length - 5));
  return maskedPart + visiblePart;
};

const IndexPage = () => {
  const { t } = useTranslation();
  const router = useNavigate();
  const [showDetails, setShowDetails] = useState<Account | null>();
  const { data: kycData } = useKYCs();
  const Kyc: KYC = kycData?.data;

  const navigate = useNavigate();
  const { data } = useTransactions({
    page: 1,
    limit: 10,
  });
  const { data: accountData } = useAccounts();
  const account: Account = accountData?.data[0];

  const transactions: Transaction[] = data?.data || [];
  return (
    <div className="px-padding pt-2">
      <div>
        {/* KYC AUDIT */}
        {
          <div
            className={
              'p-5 mt-4 flex items-center justify-between rounded-lg ' +
              (Kyc?.status === 'FAILED' ? ' bg-[#fce2e2]' : ' bg-[#d0d0d4]')
            }
          >
            <div
              className={
                'gap-5 ' +
                (Kyc?.status === 'FAILED' ? 'text-[#f36b6e]' : 'text-[#6b6868]')
              }
            >
              <h3 className="text-xl font-bold">KYC Audit {Kyc?.status}</h3>
              <p>{Kyc?.reason}</p>
            </div>
            <button
              onClick={async () => {
                getClientKYC()
                  .then(() => {
                    navigate('/member/client/documentForm?mode=upd');
                  })
                  .catch(() => {
                    navigate('/member/client/documentForm?mode=crt');
                  });
              }}
              className="bg-sidebar-bg text-sm cursor-pointer text-button-text px-4 py-2 rounded-sm"
            >
              Update Account
            </button>
          </div>
        }

        <div className="bg-white p-6 w-full max-w-[500px] mt-8 rounded-lg text-[#6B7280]">
          <div className="flex items-center justify-between">
            <div className="bg-[#dbeafd] text-[#2463eb] w-fit p-1 px-2 text-2xl rounded-md">
              $
            </div>
            <p>{maskAccountNumber(account?.accountNumber as string)}</p>
            <p>USD {t('Account')}</p>
          </div>
          <div className="flex">
            <h1 className="text-3xl font-bold text-text-primary my-4">
              ${account?.balance}
            </h1>
            <button
              onClick={() => {
                setShowDetails(account);
              }}
              className='className="text-center w-full text-red-400'
            >
              {t('Views')}
            </button>
          </div>
        </div>

        <div className="bg-secondary mt-8 p-3.5 rounded-md border-border-color border-[1px]">
          <h2 className="text-3xl font-bold mb-4">
            {t('Recent Transactions')}
          </h2>
          <Table data={transactions} t={t} />
        </div>
      </div>
      {showDetails && (
        <Draggable
          className="px-8 min-w-[700px] text-sm space-y-3 py-6 bg-background shadow-lg rounded-md"
          title="Account Details"
          Open={setShowDetails}
        >
          <p>
            Account Balance:{' '}
            <span className="font-bold">{showDetails.balance}</span>
          </p>
          <button
            onClick={() => {
              router('/banking/history/history?accountId=' + showDetails.id);
            }}
            className="
              px-4 py-1 bg-sidebar-child/90 text-white rounded-sm cursor-pointer hover:bg-sidebar-child/45 focus:outline-none focus:ring-2 focus:ring-sidebar-bg focus:ring-offset-2
            "
          >
            {t('History')}
          </button>
          <p>
            Bank Name:{' '}
            <span className="font-bold">{showDetails.bankingName}</span>
          </p>
          <p>
            Banking Address:{' '}
            <span className="font-bold">{showDetails.bankingAddress}</span>
          </p>
          <p>
            Baneficiary Name:{' '}
            <span className="font-bold">{showDetails.accountName}</span>
          </p>
          <p>
            IBAN Number:{' '}
            <span className="font-bold">{showDetails.ibanNumber}</span>
          </p>
          <p>
            Account Number:{' '}
            <span className="font-bold">{showDetails.accountNumber}</span>
          </p>
          <p>
            Currency: <span className="font-bold">{showDetails.currency}</span>
          </p>

          <div>
            <button
              className="flex items-center gap-2 border border-border rounded-sm px-2 py-1 mx-auto hover:bg-sidebar-child/10 cursor-pointer"
              onClick={() => {
                const formattedDetails = `
Account Balance: ${showDetails.balance || ''}
Bank Name: ${showDetails.bankingName || ''}
Banking Address: ${showDetails.bankingAddress || ''}
Beneficiary Name: ${showDetails.accountName || ''}
IBAN Number: ${showDetails.ibanNumber || ''}
Account Number: ${showDetails.accountNumber || ''}
Currency: ${showDetails.currency || ''}
          `.trim();

                navigator.clipboard.writeText(formattedDetails);
                toast.success('Account details copied to clipboard!', {
                  position: 'top-center',
                });
              }}
            >
              <Copy size={16} />
              Copy
            </button>
          </div>
        </Draggable>
      )}
    </div>
  );
};

const Table = ({
  data,
  t,
}: {
  data: Transaction[];
  t: TFunction<'translation', undefined>;
}) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="text-[#A3a6ad] border-b-[1px] border-border-color">
          <th className="py-2">{t('Description')}</th>
          <th>{t('Date')}</th>
          <th>{t('Amount')}</th>
          <th>{t('Fee')}</th>
          <th>{t('Status')}</th>
        </tr>
      </thead>
      <tbody className="text-center text-text-primary">
        {data.map((item, index) => (
          <tr
            key={index}
            className={
              (index % 2 === 0 ? '' : ' bg-background') +
              ' border-b-[1px] border-border-color'
            }
          >
            <td className="h-10">
              {item.orderType == 'DEPOSIT' ? (
                <ArrowRight className="inline mr-1" color="blue" />
              ) : (
                <ArrowDown className="inline mr-1" color="green" />
              )}{' '}
              {item.orderType}
            </td>
            <td>{item.updatedAt}</td>
            <td
              className={`${
                item.orderType === 'TRANSFER' || item.orderType === 'DEPOSIT'
                  ? 'text-green-600'
                  : ''
              }`}
            >
              {item.amount}
              <span className="text-text-primary"> (USD)</span>
            </td>
            <td>{item.fee}</td>
            <td>
              <div className="text-sm text-white flex justify-center">
                <p
                  className={`w-fit px-2 min-w-26 rounded-sm ${
                    item.status === 'SUCCESS'
                      ? 'bg-[#69c242] '
                      : item.status === 'PENDING'
                      ? 'bg-yellow-700 '
                      : item.status === 'FAILED'
                      ? 'bg-red-700 '
                      : 'bg-orange-700/80'
                  }`}
                >
                  {item.status}
                </p>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default IndexPage;
