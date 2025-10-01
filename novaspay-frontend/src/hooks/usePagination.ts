import { useState, useMemo } from 'react';

interface UsePaginationProps {
  totalItems: number;
  initialPage?: number;
  initialPageSize?: number;
  pageSizeOptions?: number[];
}

export const usePagination = ({
  totalItems,
  initialPage = 1,
  initialPageSize = 10,
  pageSizeOptions = [10, 20, 30, 40, 50],
}: UsePaginationProps) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [totalItemsState, setTotalItems] = useState(totalItems);

  const totalPages = useMemo(
    () => Math.ceil(totalItemsState / pageSize),
    [totalItemsState, pageSize]
  );

  const goToPage = (page: number) => {
    if (page < 1) page = 1;
    else if (page > totalPages) page = totalPages;
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page
  };

  return {
    currentPage,
    pageSize,
    totalPages,
    pageSizeOptions,
    totalItems: totalItemsState,
    setCurrentPage: goToPage,
    setPageSize: handlePageSizeChange,
    setTotalItems,
  };
};
