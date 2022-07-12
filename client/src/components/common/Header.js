import './Common.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';

export const Header = () => {

    return (
        <header>
            <div className="image-wrapper-logo">
                <NavLink to={'/'}>LOGO HERE</NavLink>
            </div>
            <nav className='nav'>
                <ul className="navigation-list">
                    <NavLink to={'/'}>Home</NavLink>
                    <NavLink to={'/catalog'} className='dropdown'>
                        <button class="dropbtn">Main</button>
                        <div class="dropdown-container">
                            <NavLink to={'/catalog/adopt'}>Adopt</NavLink>
                            <NavLink to={'/catalog/buy'}>Buy</NavLink>
                        </div>
                    </NavLink>
                    <NavLink to={'/'}>Cause</NavLink>
                    <NavLink to={'/'}>Contacts</NavLink>
                </ul>
            </nav>
            <div>
                <ul className="user-navigation-list">
                    <NavLink to={'/login'}>Login</NavLink>
                    <NavLink to={'/register'}>Register</NavLink>
                    <NavLink to={'/profile'}>Profile</NavLink>
                    <NavLink to={'/logout'}>Logout</NavLink>
                </ul>
            </div>
        </header>
    )
}