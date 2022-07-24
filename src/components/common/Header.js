import './Common.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, NavLink } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import * as userService from '../../services/user';
import AuthContext from '../../contexts/Auth';

export const Header = () => {

    const authContext = useContext(AuthContext);

    const [hasUser, setHasUser] = useState(authContext);

    console.log('authContext', authContext);

    useEffect(() => {
        setHasUser(authContext)
    }, [authContext])

    const logoutHandler = () => {
        userService.logout()
        setHasUser(null);
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
                            <Link to={'/login'} hasUser={hasUser}>Login</Link>
                            <Link to={'/register'}>Register</Link>
                        </>
                    }
                </ul>
            </div>
        </header>
    )
}