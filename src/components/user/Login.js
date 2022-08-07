import styles from './User.module.css';
import "react-toastify/dist/ReactToastify.css"
import { toast } from 'react-toastify';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';

import * as userService from '../../services/user';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { login } from '../../features/user';

export const Login = () => {

    const [loginUser, setLoginUser] = useState(null);
    const dispatch = useDispatch();

    const location = useLocation();

    console.log('locagion', location);

    const loginHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');

        userService.login(email, password)
            .then(res => {
                setLoginUser(res)
                dispatch(login({ payload: { email: res.user.myUser.email, uid: res.user.uid }, type: 'LOGIN' }))
                // if (state.hasRedirection) {
                //     navigate(-2)
                // } else {
                //     navigate('/')
                // }
            })
            .catch()

    }

    return (
        <div className={styles.loginRegisterContainer}>
            <div className={styles.loginRegisterMainContent}>
                <div className={styles.loginRegisterUserNav}>
                    <NavLink to={'/login'}>Login</NavLink>
                    <NavLink to={'/register'}>Register</NavLink>
                </div>

                <div className={styles.loginRegisterContent}>
                    <form onSubmit={loginHandler} className={styles.loginRegisterForm}>
                        <div>
                            <FontAwesomeIcon icon={faUser} />
                            <input type="text" placeholder='Email' name='email' />
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faKey} />
                            <input type="password" placeholder='Password' name='password' />
                        </div>
                        <div>
                            <input type="submit" value="Login" className={styles.submitBtn} />
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}