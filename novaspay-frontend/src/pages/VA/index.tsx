import { useVAs } from '@/hooks/useVa';
import PageFilters from '../Account/pagination';
import type { VA } from '@/types/va';

const VAPage = () => {
  const { data, isLoading } = useVAs();
  const vas: VA[] = data?.data || [];

  return (
    <div className="px-padding mt-2">
      <div className="bg-secondary rounded-md border border-border mt-4 p-4">
        <div className="overflow-x-auto">
          <table className="table-fixed text-sm w-full border-collapse">
            <thead className="text-text-primary bg-background">
              <tr>
                {[
                  'Purpose',
                  'Currency',
                  'Payment Method',
                  'Headquarters',
                  'State/Province',
                  'City',
                  'Postal Code',
                  'Business Category',
                  'Operating Country or Region',
                  'Expected Funding Source',
                  'Store Photos',
                  'Decline Reason',
                  'Status',
                  'Creation Date',
                  'Latest Update',
                ].map((header, i) => (
                  <th key={i} className="w-[80px] min-w-[80px] px-2 py-2">
                    <div>{header}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-center text-text-primary">
              {isLoading ? (
                <tr>
                  <td colSpan={15} className="py-10">
                    Loading...
                  </td>
                </tr>
              ) : vas.length === 0 ? (
                <tr>
                  <td colSpan={15} className="py-10">
                    No VA records found.
                  </td>
                </tr>
              ) : (
                vas.map((acc, idx) => (
                  <tr
                    key={acc.id || idx}
                    className={
                      idx % 2 === 0
                        ? 'bg-background border-t border-t-border'
                        : 'border-t border-t-border'
                    }
                  >
                    <td className="w-[80px] min-w-[80px] px-2 py-10 truncate">
                      {acc.purpose}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-10 truncate">
                      {acc.currency}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-10 truncate">
                      {acc.paymentMethod}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-10 truncate">
                      {acc.headquaters}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-10 truncate">
                      {acc.state}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-10 truncate">
                      {acc.city}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-10 truncate">
                      {acc.postalCode}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-10 truncate">
                      {acc.businessCategory}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-10 truncate">
                      {acc.region}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-10 truncate">
                      {acc.fundingSource}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-10 truncate">
                      {acc.storePhotos?.join(', ')}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-10 truncate">
                      {acc.declineReason}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-10 truncate">
                      {acc.status}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-10 truncate">
                      {acc.createdAt}
                    </td>
                    <td className="w-[80px] min-w-[80px] px-2 py-10 truncate">
                      {acc.updatedAt}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <PageFilters />
    </div>
  );
};

export default VAPage;
