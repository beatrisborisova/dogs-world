import './Common.css';
import { NavLink } from 'react-router-dom';

export const Header = () => {
    return (
        <header>
            <div className="image-wrapper-logo">
                LOGO HERE
            </div>
            <nav>
                <ul className="navigation-list">
                    <NavLink to={'/'}>Home</NavLink>
                    <NavLink to={'/catalog'}>Име</NavLink>
                    <NavLink to={'/'}>Cause</NavLink>
                    <NavLink to={'/'}>Contacts</NavLink>
                </ul>
            </nav>
            <div>
                <ul className="user-navigation-list">
                    <li>Login</li>
                    <li>Register</li>
                    <li>Profile</li>
                    <li>Logout</li>
                </ul>
            </div>
        </header>
    )
}