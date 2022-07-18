import { NavLink } from 'react-router-dom';
import './Common.css';

export const Footer = () => {
    return (
        <footer>
            <div className="image-wrapper-logo">
                <NavLink to={'/'}>LOGO HERE</NavLink>
            </div>
            <div>
                <ul className="user-navigation-list">
                    <NavLink to={'/login'}>Login</NavLink>
                    <NavLink to={'/register'}>Register</NavLink>
                    <NavLink to={'/profile'}>Profile</NavLink>
                    <NavLink to={'/logout'}>Logout</NavLink>
                </ul>
            </div>
        </footer>
    )
}