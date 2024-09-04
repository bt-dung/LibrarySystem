import styles from './SideEnd.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles)

function SideEnd() {
    return <div className={cx('side-end')}>Copyright 2024 by Nhom 5</div>
}

export default SideEnd;
