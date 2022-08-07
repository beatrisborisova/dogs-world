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
    const [isNavShown, setIsNavShown] = useState(false);

    const dispatch = useDispatch();
    const user = useSelector((states) => states.user.value);

    useEffect(() => {
        console.log(isNavShown);
    }, [])

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

    const openMobileMenuHandler = () => {
        setIsNavShown(!isNavShown)
    }

    const closeMenu = () => {
        setIsNavShown(false)
    }

    return (
        <header>
            <div className={styles.imageWrapperLogo}>
                <Link to={'/'}>LOGO HERE</Link>
            </div>
            <div className={styles.mobileMenuBtn} onClick={openMobileMenuHandler}>Menu</div>
            {isNavShown &&
                <div className={styles.navigationContent}>
                    <nav
                        className={[styles.nav, isNavShown ? 'navShown' : '']}>
                        <ul className={styles.navigationList}>
                            <NavLink to={'/'} onClick={closeMenu}>Home</NavLink>
                            <NavLink to={'/catalog'} className={styles.dropdown} onClick={closeMenu}>
                                <button className={styles.dropbtn}>Main</button>
                                <div className={styles.dropdownContainer}>
                                    <NavLink to={'/catalog/adopt'} onClick={closeMenu}>Adopt</NavLink>
                                    <NavLink to={'/catalog/buy'} onClick={closeMenu}>Buy</NavLink>
                                </div>
                            </NavLink>
                            <NavLink to={'/cause'} onClick={closeMenu}>Cause</NavLink>
                            <NavLink to={'/contacts'} onClick={closeMenu}>Contacts</NavLink>
                        </ul>
                    </nav>
                    <div className={styles.userControls}>
                        <ul className={styles.userNavigationList}>

                            {hasUser &&
                                <>
                                    <NavLink to={'/create'} onClick={closeMenu}>Publish a dog</NavLink>
                                    <NavLink to={'/profile'} onClick={closeMenu}>Profile</NavLink>
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
                </div>
            }
        </header >
    )
}