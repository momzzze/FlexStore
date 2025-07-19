import { useState, useEffect } from 'react';

export const usePaginatedFetch = ({
  totalPages,
  onPageChange,
}: {
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    onPageChange(page);
  }, [page, onPageChange]);

  return { page, setPage, totalPages };
};
