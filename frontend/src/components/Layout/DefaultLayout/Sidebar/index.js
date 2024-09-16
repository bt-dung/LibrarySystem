import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';
import { getCookie } from '~/components/cookies/cookieHelper';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

const Sidebar = () => {
  const [topReadBooks, setTopReadBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 2;
  const [showSidebar, setShowSidebar] = useState(false);
  const slideInterval = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = getCookie('jwt');
      if (token) {
        setShowSidebar(true);
        try {
          const response = await axios.get('http://localhost:5000/api/v1/recommend', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setTopReadBooks(response.data.data || []);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      } else {
        setShowSidebar(false);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    startAutoSlide();

    return () => {
      clearInterval(slideInterval.current);
    };
  }, [topReadBooks]);


  const startAutoSlide = () => {
    if (slideInterval.current) clearInterval(slideInterval.current); // Clear nếu interval đang chạy
    slideInterval.current = setInterval(() => {
      setCurrentPage(prevPage => {
        const totalPages = Math.ceil(topReadBooks.length / booksPerPage);
        return prevPage === totalPages ? 1 : prevPage + 1;
      });
    }, 2000);
  };


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    startAutoSlide();
  };
  if (!showSidebar) {
    return null;
  }

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = Array.isArray(topReadBooks) ? topReadBooks.slice(indexOfFirstBook, indexOfLastBook) : [];
  const totalPages = Math.ceil(topReadBooks.length / booksPerPage);

  const getPaginationItems = () => {
    return Array.from({ length: totalPages }, (_, index) => {
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
          <Link to={`/book/${book.id}`} key={book._id} className={cx('book-item')}>
            <img src={book.cover_url} alt={book.title} className={cx('book-cover')
            } onMouseEnter={() => clearInterval(slideInterval.current)} // Tạm dừng khi hover
              onMouseLeave={startAutoSlide} />
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
