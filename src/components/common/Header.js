import './Common.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as userService from '../../services/user';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { logout } from '../../features/user';

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
    }

    return (
        <header>
            <div className="image-wrapper-logo">
                <NavLink to={'/'}>LOGO HERE</NavLink>
            </div>
            <nav className='nav'>
                <ul className="navigation-list">
                    <NavLink to={'/'}>Home</NavLink>
                    <NavLink to={'/catalog'} className='dropdown'>
                        <button className="dropbtn">Main</button>
                        <div className="dropdown-container">
                            <NavLink to={'/catalog/adopt'}>Adopt</NavLink>
                            <NavLink to={'/catalog/buy'}>Buy</NavLink>
                        </div>
                    </NavLink>
                    <NavLink to={'/cause'}>Cause</NavLink>
                    <NavLink to={'/contacts'}>Contacts</NavLink>
                </ul>
            </nav>
            <div>
                <ul className="user-navigation-list">
                    {/* The following two must be moved */}
                    <NavLink to={'/create'}>Create</NavLink>
                    <NavLink to={'/edit/123'}>Edit</NavLink>

                    {hasUser &&
                        <>
                            <NavLink to={'/profile'}>Profile</NavLink>
                            <NavLink to={'/logout'} onClick={logoutHandler}>Logout</NavLink>
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