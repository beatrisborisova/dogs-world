import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';

import './User.css';
import { NavLink } from 'react-router-dom';

export const Register = () => {

    const registerHandler = (e) => {
        e.preventDefault();

        console.log(e.target);
    }


    return (
        <>
            <div className='login-register-username-nav'>
                <NavLink to={'/login'} activeClass>Login</NavLink>
                <NavLink to={'/register'}>Register</NavLink>
            </div>
            <div className='login-register-container'>
                <form onSubmit={registerHandler} className="login-register-form">
                    <div>
                        <FontAwesomeIcon icon={faUser} />
                        <input type="text" placeholder='Username' />
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faKey} />
                        <input type="password" placeholder='Password' />
                    </div>
                    <div>
                        <input type="submit" value="Register" className='submit-btn' />
                    </div>
                </form>
            </div>
        </>
    )
}