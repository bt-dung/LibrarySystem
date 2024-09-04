import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Result.module.scss';
import { Button } from 'antd';
import Pagination from '~/components/Pagination';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const BOOKS_PER_PAGE = 20;

function Result() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query');

  useEffect(() => {
    // Gửi yêu cầu fetch đến API với query
    fetch(`http://localhost:5000/book/allBook?query=${query}`)
      .then(response => response.json())
      .then(data => setBooks(data.data || []))
      .catch(error => console.error('Error fetching books:', error));
  }, [query]);

  // Pagination
  const indexOfLastBook = currentPage * BOOKS_PER_PAGE;
  const indexOfFirstBook = indexOfLastBook - BOOKS_PER_PAGE;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / BOOKS_PER_PAGE);

  // Hàm xử lý nút Đăng ký
  const handleRegister = (bookId) => {
    fetch(`http://localhost:5000/book/${bookId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        alert('Đăng ký thành công!');
        fetch(`http://localhost:5000/book/allBook?query=${query}`)
          .then(response => response.json())
          .then(data => setBooks(data.data || [])) // Đảm bảo `data.data` tồn tại
          .catch(error => console.error('Error fetching updated books:', error));
      })
      .catch(error => console.error('Error updating book:', error));
  };

  return (
    <div className={cx('result')}>
      <h2>Kết Quả Tìm Kiếm Cho: "{query}"</h2>
      <div className={cx('book-list')}>
        {currentBooks.length > 0 ? (
          currentBooks.map((book) => (
            <div className={cx('book-item')} key={book.id}>
              {book.id ? (
                <Link to={`/book/${book.id}`} className={cx('book-wrapper')}>
                  <img
                    className={cx('book-cover')}
                    src={book.cover_url}
                    alt={book.title}
                  />
                  <div className={cx('book-info')}>
                    <p className={cx('book-title')}>{book.title}</p>
                  </div>
                </Link>
              ) : (
                <div className={cx('book-info')}>
                  <p className={cx('book-title')}>{book.title}</p>
                  <p className={cx('error-text')}>No namebook available</p>
                </div>
              )}
              <div className={cx('button-book')}>
                <Button outline onClick={() => handleRegister(book.id)}>Đăng ký</Button>
              </div>
            </div>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default Result;
