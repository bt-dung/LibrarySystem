import React from 'react';
import { Button, Card, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import styles from './Signup.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Register() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/auth/register', values);

      if (response.data.success) {
        message.success("Đăng ký thành công!");
        navigate("/login");
      } else {
        message.error(response.data.message || "Đăng ký không thành công!");
      }
    } catch (error) {
      message.error("Lỗi khi đăng ký.");
      console.error('Lỗi API:', error);
    }
  };

  const rules = [
    { required: true, message: 'Vui lòng nhập vào trường này!' }
  ];

  return (
    <div className={cx('signup-container')}>
      <div className={cx('logo-tlu')}>
        <Link to="/">
          <img src={images.logo} alt="Thư viện sách" />
        </Link>
      </div>
      <Card className={cx('signup-card')} title="Đăng ký tài khoản">
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item label="Tên sinh viên" name="studentName" rules={rules}>
            <Input />
          </Form.Item>

          <Form.Item label="Mã sinh viên" name="studentId" rules={rules}>
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={rules}>
            <Input />
          </Form.Item>

          <Form.Item label="Mật khẩu" name="password" rules={rules}>
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Register;
