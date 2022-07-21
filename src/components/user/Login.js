import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';

import './User.css';
import { NavLink } from 'react-router-dom';
import * as userService from '../../services/user';
import { useState } from 'react';

// import { async } from '@firebase/util';

export const Login = () => {

    const [loginUser, setLoginUser] = useState(null);
    const loginHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');

        userService.login(email, password)
            .then(res => setLoginUser(res))
        // .then(res => setLoginUser(res))
        // .catch(err => console.log('A relevant error message should appear here', err.message))
    }

    return (
        <div className='login-register-container'>
            <div className='login-register-username-nav'>
                <NavLink to={'/login'}>Login</NavLink>
                <NavLink to={'/register'}>Register</NavLink>
            </div>
            <p>{loginUser && loginUser.uid}</p>
            <div className='login-register-content'>
                <form onSubmit={loginHandler} className="login-register-form">
                    <div>
                        <FontAwesomeIcon icon={faUser} />
                        <input type="text" placeholder='Email' name='email' />
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faKey} />
                        <input type="password" placeholder='Password' name='password' />
                    </div>
                    <div>
                        <input type="submit" value="Login" className='submit-btn' />
                    </div>
                </form>
            </div>
        </div>
    )
}