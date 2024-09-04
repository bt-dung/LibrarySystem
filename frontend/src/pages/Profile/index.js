//Profile
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './Profile.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Profile() {
  const { id } = useParams(); // Lấy id từ URL
  const [book, setBook] = useState(null);

  useEffect(() => {
    // Gọi API để lấy thông tin sách
    axios.get(`http://localhost:5000/book/:id=${id}`)
      .then(response => {
        const bookData = response.data.data[0];
        setBook(bookData);
      })
      .catch(error => {
        console.error('Có lỗi xảy ra khi lấy dữ liệu sách:', error);
      });
  }, [id]);

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
        // Cập nhật trạng thái sách sau khi đăng ký (nếu cần thiết)
        setBook((prevBook) => ({ ...prevBook, registered: true }));
      })
      .catch(error => console.error('Error updating book:', error));
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div className={cx('profile')}>
      <h1 className={cx('title')}>{book.title}</h1>
      <img className={cx('cover')} src={book.cover_url} alt={book.title} />
      <p className={cx('author')}>Tác giả: {book.author}</p>
      <p className={cx('publish-year')}>Năm xuất bản: {book.publish_year}</p>
      <p className={cx('subcategory')}>Thể loại: {book.subcategory}</p>
      <div className={cx('button-book')}>
        <Button outline onClick={() => handleRegister(book.id)}>Đăng ký</Button>
      </div>
    </div>
  );
}

export default Profile;
