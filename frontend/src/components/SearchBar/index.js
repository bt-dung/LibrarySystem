
import classNames from 'classnames/bind';
import styles from './SearchBar.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function SearchBar({ data }) {
    return (
        <Link to={`/book/${data.id}`} className={cx('wrapper')}>
            <img
                className={cx('cover')}
                src={data.cover_url}
                alt={data.title}
            />
            <div className={cx('info')}>
                <h4 className={cx('namebook')}>
                    <span>{data.title}</span>
                </h4>
                <span className={cx('author')}>{data.author}</span>
            </div>
        </Link>
    );
}

export default SearchBar;

