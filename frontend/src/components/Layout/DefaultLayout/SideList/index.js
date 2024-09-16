import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './SideList.module.scss';
import { Button } from 'antd';

const cx = classNames.bind(styles);

function SideList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/allBook') // Lấy danh sách sách để lấy các thể loại
      .then(response => response.json())
      .then(data => {
        console.log(data)
        const uniqueCategories = [...new Set(data.map(book => book.subcategory))];
        setCategories(uniqueCategories);
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  return (
    <div className={cx('side-list')}>
      <h3>Thể loại</h3>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <Link to={`/result?query=${encodeURIComponent(category)}`}>
              <Button rounded  >{category}</Button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideList;
