import React from 'react';
import classNames from 'classnames/bind';
import styles from './Pagination.module.scss'; 

const cx = classNames.bind(styles);

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleNext = () => {
    onPageChange(Math.min(currentPage + 1, totalPages));
  };

  const handlePrev = () => {
    onPageChange(Math.max(currentPage - 1, 1));
  };

  return (
    <div className={cx('pagination')}>
      <button onClick={handlePrev} disabled={currentPage === 1}>Trở về</button>
      <span>Trang {currentPage} / {totalPages}</span>
      <button onClick={handleNext} disabled={currentPage === totalPages}>Tiếp</button>
    </div>
  );
};

export default Pagination;
