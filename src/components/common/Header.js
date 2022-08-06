import styles from './Common.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as userService from '../../services/user';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/user';
import { removeDog } from '../../features/dogs';

export const Header = () => {

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
        <header>
            <div className={styles.imageWrapperLogo}>
                <Link to={'/'}>LOGO HERE</Link>
            </div>
            <nav className={styles.nav}>
                <ul className={styles.navigationList}>
                    <NavLink to={'/'}>Home</NavLink>
                    <NavLink to={'/catalog'} className={styles.dropdown}>
                        <button className={styles.dropbtn}>Main</button>
                        <div className={styles.dropdownContainer}>
                            <NavLink to={'/catalog/adopt'}>Adopt</NavLink>
                            <NavLink to={'/catalog/buy'}>Buy</NavLink>
                        </div>
                    </NavLink>
                    <NavLink to={'/cause'}>Cause</NavLink>
                    <NavLink to={'/contacts'}>Contacts</NavLink>
                </ul>
            </nav>
            <div>
                <ul className={styles.userNavigationList}>

                    {hasUser &&
                        <>
                            <NavLink to={'/create'}>Publish a dog</NavLink>
                            <NavLink to={'/profile'}>Profile</NavLink>
                            <Link to={'/'} onClick={logoutHandler}>Logout</Link>
                        </>
                    }


                    {!hasUser &&
                        <>
                            <Link to={'/login'}>Login</Link>
                            <Link to={'/register'}>Register</Link>
                        </>
                    }
                </ul>
            </div>
        </header>
    )
}