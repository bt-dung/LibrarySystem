import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { Button } from 'antd';
import Pagination from '~/components/Pagination';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import { getCookie } from '~/components/cookies/cookieHelper';
const cx = classNames.bind(styles);

const BOOKS_PER_PAGE = 12;

function Home() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/allBook')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        return setBooks(data || [])
      })
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  const indexOfLastBook = currentPage * BOOKS_PER_PAGE;
  const indexOfFirstBook = indexOfLastBook - BOOKS_PER_PAGE;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / BOOKS_PER_PAGE);

  const handleRegister = (bookId) => {
    console.log("BookID đăng ký:", bookId)

    const token = getCookie('jwt');
    if (!token) {
      alert('Bạn cần đăng nhập để mượn sách.');
      navigate('/login')
      return
    }
    fetch(`http://localhost:5000/api/v1/borrow`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        bookId: bookId,
        borrowDate: new Date().toISOString(),
        returnDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString()
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        alert('Đăng ký thành công!');
        fetch('http://localhost:5000/api/v1/allBook?genre')
          .then(response => response.json())
          .then(data => setBooks(data || []))
          .catch(error => console.error('Error fetching updated books:', error));
      })
      .catch(error => {
        alert('Đăng ký không thành công.');
        console.error('Error updating book:', error);
      });
  };

  return (
    <div className={cx('home')}>
      <h2>Thư Viện Trường Đại Hoc Thăng Long</h2>
      <div className={cx('book-list')}>
        {currentBooks.length > 0 ? (
          currentBooks.map((book) => {
            return (
              <div className={cx('book-item')} key={book._id}>
                {book ? (
                  <div>
                    <img
                      style={{ width: 100, height: 100 }}
                      className={cx('book-cover')}
                      src={book.cover_url}
                      alt={book.title}
                    />
                    <Link to={`/book/${book._id}`} className={cx('book-wrapper')}>
                      <img
                        style={{ width: 100, height: 100 }}
                        className={cx('book-cover')}
                        src={book.cover_url}
                        alt={book.title}
                      />
                      <div className={cx('book-info')}>
                        <p className={cx('book-title')}>{book.title}</p>
                      </div>
                    </Link></div>
                ) : (
                  <div className={cx('book-info')}>
                    <p className={cx('book-title')}>{book.title}</p>
                    <p className={cx('error-text')}>No namebook available</p>
                  </div>
                )}
                <div className={cx('button-book')}>
                  <Button outline onClick={() => handleRegister(book._id)}>Đăng ký</Button>
                </div>
              </div>
            )
          })
        ) : (
          <p>No books.</p>
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

export default Home;
