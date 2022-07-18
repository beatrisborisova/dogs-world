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

                    <NavLink to={'/login'}>Login</NavLink>
                    <NavLink to={'/register'}>Register</NavLink>
                    <NavLink to={'/profile'}>Profile</NavLink>
                    <NavLink to={'/logout'}>Logout</NavLink>
                </ul>
            </div>
        </header>
    )
}