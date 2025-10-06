import { useTransactionById } from '@/hooks/useTransaction';
import DepositConfirmationHTML from './pdf';
import { LucideCopy } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import type { Transaction } from '@/types/transaction';

const DetailOpenDeposit = () => {
  const [params] = useSearchParams();
  const id = params.get('id') || '';
  const { data, isLoading, isError } = useTransactionById(parseInt(id, 10));

  if (isLoading)
    return <p className="p-6 text-gray-500">Loading transaction...</p>;
  if (isError || !data?.data)
    return <p className="p-6 text-red-500">Transaction not found.</p>;

  const transaction: Transaction = data.data;

  return (
    <div className="py-6">
      {/* Return button */}
      <button
        onClick={() => window.history.back()}
        className="font-sans px-4 py-2 bg-white text-black rounded-sm border border-gray-200 hover:bg-gray-50 transition"
      >
        Return to previous page
      </button>

      {/* PDF content */}
      <div id="pdf-content" className="mt-6">
        <DepositConfirmationHTML
          depositCreated={transaction.createdAt || '--'}
          paidOut={transaction.updatedAt || '--'}
          status={transaction.status || '--'}
          orderId={transaction.orderId || '--'}
          fromAccountId={transaction.fromAccountId || '--'}
          customerName={transaction.customerName || '--'}
          customerAddress={transaction.customerAddress || '--'}
          amountSent={transaction.amount || 0}
          currency={transaction.bankCurrency || 'USD'}
          network={transaction.orderType || '--'}
          counterpartyName={transaction.receiverName || '--'}
          iban={transaction.iban || '--'}
          bankName={transaction.bankName || '--'}
          bankCurrency={transaction.bankCurrency || '--'}
          city={transaction.city || '--'}
          street={transaction.street || '--'}
          postalCode={transaction.postalCode || '--'}
          orderingCustomer={transaction.orderingCustomer || '--'}
        />
      </div>

      {/* Export PDF button */}
      <div className="flex justify-center mt-4">
        <button className="flex items-center gap-2 font-sans text-gray-600 cursor-pointer px-4 py-2 bg-white rounded-sm border border-gray-200 hover:bg-gray-50 transition">
          <LucideCopy size={18} />
          Export PDF
        </button>
      </div>
    </div>
  );
};

export default DetailOpenDeposit;
