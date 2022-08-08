import styles from './Common.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link, NavLink } from 'react-router-dom';
import * as userService from '../../services/user';

import { logout } from '../../features/user';
import { removeDog } from '../../features/dogs';



export const Footer = () => {
    const [hasUser, setHasUser] = useState(false);

    const dispatch = useDispatch();
    const user = useSelector((states) => states.user.value);

    useEffect(() => {
        if (user.email !== '') {
            setHasUser(true);
        } else {
            setHasUser(false);
        }
    }, [user.email])

    const logoutHandler = () => {
        userService.logout()
        dispatch(logout())
        dispatch(removeDog());
    }


    return (
        <footer>
            <div className={styles.imageWrapperLogo}>
                <Link to={'/'}>
                    <img src={require('../../assets/images/logo.png')} alt='logo' />
                </Link>
            </div>
            <div>
                <ul className={styles.userNavigationList}>
                    {!hasUser &&
                        <>
                            <NavLink to={'/login'}>Login</NavLink>
                            <NavLink to={'/register'}>Register</NavLink>
                        </>
                    }
                    {hasUser &&
                        <>
                            <NavLink to={'/profile'}>Profile</NavLink>
                            <Link to={'/'} onClick={logoutHandler}>Logout</Link>
                        </>
                    }
                </ul>
            </div>
        </footer>
    )
}