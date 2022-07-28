import './User.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';

import * as userService from '../../services/user';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { login } from '../../features/user';

export const Login = () => {

    const [loginUser, setLoginUser] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');

        userService.login(email, password)
            .then(res => {
                console.log('res.user', res.user);
                setLoginUser(res)
                dispatch(login({ payload: { email: res.user.myUser.email, uid: res.user.uid }, type: 'LOGIN' }))
                navigate('/')
            })
            .catch(err => console.log(err.message))
    }

    return (
        <div className='login-register-container'>
            <div className='login-register-username-nav'>
                <NavLink to={'/login'}>Login</NavLink>
                <NavLink to={'/register'}>Register</NavLink>
            </div>
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
        </div >
    )
}