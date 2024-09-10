import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getCookie } from '~/components/cookies/cookieHelper';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

const Sidebar = () => {
  const { id } = useParams();
  const [topReadBooks, setTopReadBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 2;
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const token = getCookie('token');
    setShowSidebar(!!token);

    if (token && id) {
      const fetchTopReadBooks = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/book/recommend/${id}`);
          console.log(response);
          setTopReadBooks(response.data.data);
        } catch (error) {
          console.error('Lỗi khi lấy dữ liệu sách:', error);
        }
      };

      fetchTopReadBooks();
    }
  }, [id]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentPage(prevPage => {
        const totalPages = Math.ceil(topReadBooks.length / booksPerPage);
        return prevPage === totalPages ? 1 : prevPage + 1;
      });
    }, 6000);

    return () => clearInterval(intervalId);
  }, [topReadBooks, booksPerPage]);

  if (!showSidebar) {
    return null;
  }

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = topReadBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(topReadBooks.length / booksPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getPaginationItems = () => {
    return [...Array(totalPages)].map((_, index) => {
      return (
        <div
          key={index}
          className={cx('page-item-container', { active: index + 1 === currentPage })}
        >
          <div
            className={cx('page-item', { active: index + 1 === currentPage })}
            onClick={() => handlePageChange(index + 1)}
          />
        </div>
      );
    });
  };

  return (
    <aside className={cx('sidebar')}>
      <h3 className={cx('title')}>Sách gợi ý cho bạn:</h3>
      <div className={cx('book-list')}>
        {currentBooks.map(book => (
          <Link to={`/book/${book.id}`} key={book.id} className={cx('book-item')}>
            <img src={book.cover_url} alt={book.title} className={cx('book-cover')} />
            <div className={cx('book-details')}>
              <p className={cx('book-title')}>{book.title}</p>
              <p className={cx('book-author')}>{book.author}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className={cx('pagination')}>
        {getPaginationItems()}
      </div>
    </aside>
  );
};

export default Sidebar;
