type Column<T> = {
  header: string;
  accessor: keyof T;
  width?: string; // optional custom width like "w-[80px]"
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  actionLabel?: string;
  onActionClick?: (row: T) => void;
};

const Table = <T extends object>({
  columns,
  data,
  actionLabel,
  onActionClick,
}: TableProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-fixed text-sm w-full border-collapse">
        <thead className="text-text-primary bg-background">
          <tr>
            {columns.map((col, i) => (
              <th
                key={i}
                className={`${col.width ?? 'w-[80px] min-w-[80px]'} px-2 py-2`}
              >
                <div>{col.header}</div>
              </th>
            ))}
            {actionLabel && <th className="w-[40px]"></th>}
          </tr>
        </thead>

        <tbody className="text-center text-text-primary">
          {data.map((row, idx) => (
            <tr
              key={idx}
              className={
                idx % 2 === 0
                  ? 'bg-background border-t border-t-border'
                  : 'border-t border-t-border'
              }
            >
              {columns.map((col, i) => (
                <td
                  key={i}
                  className={`${
                    col.width ?? 'w-[80px] min-w-[80px]'
                  } px-2 py-4`}
                >
                  <div className="truncate overflow-hidden whitespace-nowrap">
                    {String(row[col.accessor])}
                  </div>
                </td>
              ))}

              {actionLabel && (
                <td className="w-[40px] text-sidebar-bg text-end">
                  <p
                    className="hover:text-[#60831a] cursor-pointer"
                    onClick={() => onActionClick?.(row)}
                  >
                    {actionLabel}
                  </p>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
