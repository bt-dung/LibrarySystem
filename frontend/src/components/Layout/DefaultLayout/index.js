// DefaultLayout 
import Header from '../compunents/Header';
import Sidebar from './Sidebar/index.js';
import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import SideList from './SideList';
import SideEnd from './SideEnd';
const cx = classNames.bind(styles)
function DefaultLayout({children}) {
    return (
        <div className={cx('wrapper')}>
            <Header/>
            <div className={cx('container')}> 
                <div className={cx('full-content')}> 
                    <Sidebar/>
                <div className={cx('content')}>
                    {children}
                </div>
                </div>
                <div className={cx('list-genre')}>
                    <SideList/>
                </div>
            </div>
            <SideEnd/>
        </div>
    )
}

export default DefaultLayout;