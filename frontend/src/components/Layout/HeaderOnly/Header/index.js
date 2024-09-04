import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import Search from '../Search';
import { getCookie, setCookie, deleteCookie } from '~/components/cookies/cookieHelper';

const cx = classNames.bind(styles);

function Header() {
    const [currentUser, setCurrentUser] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Kiểm tra trạng thái đăng nhập từ cookie khi component được mount
        const token = getCookie('token');
        setCurrentUser(!!token); // Cập nhật trạng thái dựa trên sự tồn tại của cookie
    }, []);

    const handleLogin = () => {
        setCookie('token', 'dummyToken', 1); // Lưu cookie với thời gian hết hạn
        setCurrentUser(true);
        navigate('/'); // Điều hướng về trang chủ
    };

    const handleLogout = () => {
        fetch('http://localhost:5000/logout', {
            method: 'POST',
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Đăng xuất ok!!!');
                    window.location.href('/login')
                }
            })
            .catch(console.error('LỖi không thể xuất'));
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
                    <Button rounded to='/Truyentranh'>Truyện tranh</Button>
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
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
