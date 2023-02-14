import React from 'react';
import Pagination from 'react-js-pagination';
import './Paging.css';

interface Props {
  page: number;
  itemsCountPerPage: number;
  totalItemsCount: number;
  pageRangeDisplayed: number;
  onPageChange: (page: number) => void;
}

export default function Paging({ page, itemsCountPerPage, totalItemsCount, pageRangeDisplayed, onPageChange }: Props) {
  const handlePageChange = (newPage: number) => {
    onPageChange(newPage);
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
