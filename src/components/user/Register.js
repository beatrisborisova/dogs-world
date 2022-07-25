import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';

import './User.css';
import { NavLink, useNavigate } from 'react-router-dom';
import * as userService from '../../services/user';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../features/user';

export const Register = () => {

    const [registerUser, setRegisterUser] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const registerHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const repass = formData.get('repass');

        if (password !== repass) {
            throw new Error('Passwords don\'t match')
        }

        userService.register(email, password)
            .then(res => {
                setRegisterUser(res)
                dispatch(register({ payload: { email: res.email }, type: 'REGISTER' }))
                navigate('/')
            })
            .catch(err => console.log('A relevant error message should appear here', err.message))
    }


    return (
        <div className='login-register-container'>
            <div className='login-register-username-nav'>
                <NavLink to={'/login'} activeClass>Login</NavLink>
                <NavLink to={'/register'}>Register</NavLink>
            </div>
            <div className='login-register-content'>
                <form onSubmit={registerHandler} className="login-register-form">
                    <div>
                        <FontAwesomeIcon icon={faUser} />
                        <input type="text" placeholder='Email' name='email' />
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faKey} />
                        <input type="password" placeholder='Password' name='password' />
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faKey} />
                        <input type="password" placeholder='Repeat password' name='repass' />
                    </div>
                    <div>
                        <input type="submit" value="Register" className='submit-btn' />
                    </div>
                </form>
            </div>
        </div>
    )
}