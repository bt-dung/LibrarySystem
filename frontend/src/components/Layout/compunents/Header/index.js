import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCookie } from '~/components/cookies/cookieHelper';
import Button from '~/components/Button';
import Search from '../Search';
import styles from './Header.module.scss';
import images from '~/assets/images';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Header() {
  const [currentUser, setCurrentUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    const token = getCookie('jwt');
    console.log(token);
    setCurrentUser(token);
  }, []);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/register');
  };
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Đăng xuất không thành công!');
      }
      setCurrentUser(null);
      navigate('/');

    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('logo-link')}>
          <Link to="/">
            <img src={images.logo} alt="Thư viện sách" />
          </Link>
        </div>
        <div className={cx('actions')}>
          <Button rounded to='/Sachtonghop'>Sách tổng hợp</Button>
          <Button rounded to='/tailieuthamkhao'>Tài liệu tham khảo</Button>
        </div>
        <div>
          <Search />
        </div>
        {currentUser ? (
          <div className={cx('current-user')}>
            <Button primary onClick={handleLogout}>Đăng xuất</Button>
          </div>
        ) : (
          <div className={cx('login')}>
            <Button primary onClick={handleLogin}>Đăng nhập</Button>
            <Button primary onClick={handleSignup}>Đăng ký</Button>
          </div>
        )}
      </div>
    </header>
  );
};



export default Header;
