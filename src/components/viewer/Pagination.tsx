import React, { useState } from 'react';
import Pagination from 'react-js-pagination';
import './Paging.css';

interface Props {
  itemsCountPerPage: number;
  totalItemsCount: number;
  pageRangeDisplayed: number;
  onPageChange?: (page: number) => void;
}

export default function Paging({ itemsCountPerPage, totalItemsCount, pageRangeDisplayed, onPageChange }: Props) {
  const [page, setPage] = useState<number>(1);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    if (onPageChange) onPageChange(newPage);
  };

  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={itemsCountPerPage}
      totalItemsCount={totalItemsCount}
      pageRangeDisplayed={pageRangeDisplayed}
      prevPageText={'‹'}
      nextPageText={'›'}
      onChange={handlePageChange}
    />
  );
}
