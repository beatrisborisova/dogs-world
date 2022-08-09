import styles from './User.module.css';
import "react-toastify/dist/ReactToastify.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import * as userService from '../../services/user';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../features/user';

export const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { state } = useLocation();

    const loginHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');

        userService.login(email, password)
            .then(res => {
                dispatch(login({ payload: { email: res.user.myUser.email, uid: res.user.uid }, type: 'LOGIN' }))
                if (state) {
                    navigate(-2)
                } else {
                    navigate('/')
                }
            })
            .catch((err) => {
                console.log(err.message)
                e.target.reset()
            })

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