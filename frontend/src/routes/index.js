import { HeaderOnly } from '~/components/Layout';
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import BooksCollection from '~/pages/BooksCollection';
import References from '~/pages/References';
import Result from '~/pages/Result';
import Login from '~/pages/Login';
import Register from '~/pages/Register';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/book/:id', component: Profile, layout: HeaderOnly },
    { path: '/Sachtonghop', component: BooksCollection },
    { path: '/Tailieuthamkhao', component: References },
    { path: '/result', component: Result },
    { path: '/register', component: Register, layout: null, requiresAuth: false },
    { path: '/login', component: Login, layout: null, requiresAuth: false }
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };

