import React from 'react';
import { useEffect } from 'react';
import { Button, Card, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { Link, useLocation } from 'react-router-dom';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Login() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/api/v1/login', values, {
        withCredentials: true
      });
      if (response.data.success) {
        message.success("Đăng nhập thành công!");
        navigate("/");
      } else {
        message.error(response.data.message || "Tài khoản hoặc mật khẩu không chính xác!");
      }
    } catch (error) {
      message.error("Lỗi khi đăng nhập.");
      console.error('Lỗi API:', error);
    }
  };

  return (
    <div className={cx('login-container')}>
      <div className={cx('logo-tlu')}>
        <Link to="/">
          <img src={images.logo} alt="Thư viện sách" />
        </Link>
      </div>
      <Card className={cx('login-card')} title="Đăng nhập">
        <Form name="login" onFinish={onFinish}
          layout="vertical">
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Vui lòng nhập email!' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Mật khẩu" name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Đăng nhập
            </Button>
            <Link to="/register">
              <Button type='text' htmlType="submit">
                Đăng ký
              </Button>
            </Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Login;

