import { getAllKYCs } from '@/actions/kyc';
import { createInviteLink } from '@/actions/client';
import Draggable from '@/components/custom/dragable';
import { useAccounts } from '@/hooks/useAccounts';
import { useKYCs } from '@/hooks/useKYC';
import { useTransactions } from '@/hooks/useTransaction';
import type { Account } from '@/types/accounts';
import type { KYC } from '@/types/kyc';
import type { Transaction } from '@/types/transaction';
import type { TFunction } from 'i18next';
import { ArrowDown, ArrowRight, Copy, Info } from 'lucide-react';
import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const maskAccountNumber = (accountNumber: string) => {
  if (!accountNumber) return '';
  const visiblePart = accountNumber.slice(-5);
  const maskedPart = '*'.repeat(Math.max(0, accountNumber.length - 5));
  return maskedPart + visiblePart;
};

const IndexPage = () => {
  const { t } = useTranslation();
  const router = useNavigate();
  const [showDetails, setShowDetails] = useState<Account | null>();
  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const [showInvite, setShowInvite] = useState<boolean | null>(null);

  const { data: kycData } = useKYCs();
  const Kyc: KYC = kycData?.data;
  const { data } = useTransactions({ page: 1, limit: 10 });
  const { data: accountData } = useAccounts();
  const account: Account = accountData?.data[0];
  const transactions: Transaction[] = data?.data || [];

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteCode || '');
    toast.success(t('Invitation code copied to clipboard!'));
  };

  const handleCreateInvite = async () => {
    try {
      const data = await createInviteLink();
      const code = data.data.code;
      setInviteCode(code);
      setShowInvite(true);
    } catch (err) {
      toast.error(t('Failed to generate invite.'));
    }
  };

  const inviteLink = `${
    import.meta.env.VITE_CLIENT_URL
  }/company/create-account-login?invitationCode=${inviteCode}`;

  return (
    <div className="px-padding pt-2">
      <div className="flex justify-end w-full">
        <p
          onClick={handleCreateInvite}
          className="text-red-400 text-sm underline cursor-pointer"
        >
          {t('Invite to Register')}
        </p>
      </div>

      {/* ACCOUNT INFO */}
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
            className="text-center w-full text-red-400"
          >
            {t('View')}
          </button>
        </div>
      </div>

      {/* TRANSACTIONS */}
      <div className="bg-secondary mt-8 p-3.5 rounded-md border-border-color border-[1px]">
        <h2 className="text-3xl font-bold mb-4">{t('Recent Transactions')}</h2>
        <Table data={transactions} t={t} />
      </div>

      {/* INVITE MODAL */}
      {showInvite && (
        <Draggable
          className="bg-background px-4"
          title={t('Invite User to Register')}
          Open={setShowInvite}
        >
          <div className="p-6 rounded-xl shadow-lg flex flex-col items-center gap-4 w-[280px] text-center">
            <QRCodeSVG value={inviteLink} size={230} />
            <code className="bg-[#f3f4f6] p-2 rounded-md w-full break-all">
              <p className="text-black text-sm break-all">{inviteCode}</p>
            </code>
            <div className="flex gap-2 items-center text-text-primary">
              <button
                onClick={handleCopy}
                className="cursor-pointer border border-border px-4 text-nowrap py-2 rounded-sm"
              >
                {t('Copy Code')}
              </button>
              <a
                href={inviteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-nowrap border border-border px-4 py-2 rounded-sm"
              >
                {t('Go to Page')}
              </a>
            </div>
          </div>
        </Draggable>
      )}

      {/* ACCOUNT DETAILS MODAL */}
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
            className="px-4 py-1 bg-sidebar-child/90 text-white rounded-sm cursor-pointer hover:bg-sidebar-child/45 focus:outline-none focus:ring-2 focus:ring-sidebar-bg focus:ring-offset-2"
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
            Beneficiary Name:{' '}
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
                item.orderType !== 'TRANSFER'
                  ? 'text-[#ed4248]'
                  : 'text-green-600'
              }`}
            >
              {item.orderType === 'TRANSFER' ? '+' : '-'}
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
