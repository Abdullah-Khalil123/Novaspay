import { useSearchParams } from 'react-router-dom';

interface PaginationOptions {
  defaultPageSize?: number;
  defaultPage?: number;
}

export function usePagination(options: PaginationOptions = {}) {
  const { defaultPage = 1, defaultPageSize = 10 } = options;

  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || defaultPage;
  const pageSize = Number(searchParams.get('pageSize')) || defaultPageSize;

  const setPage = (newPage: number) => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      page: String(newPage),
      pageSize: String(pageSize),
    });
  };

  const setPageSize = (newSize: number) => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      page: '1', // reset to first page
      pageSize: String(newSize),
    });
  };

  return {
    page,
    pageSize,
    setPage,
    setPageSize,
  };
}
