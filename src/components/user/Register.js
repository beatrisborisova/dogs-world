import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';

import './User.css';
import { NavLink, useNavigate } from 'react-router-dom';
import * as userService from '../../services/user';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../features/user';
import { userProfile } from '../../features/userProfile';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { storage } from '../../firebase';


export const Register = () => {

    const [registerUser, setRegisterUser] = useState([]);
    const [imageUpload, setImageUpload] = useState(null);
    const [currentImageUrl, setCurrentImageUrl] = useState('');
    const [imageUrls, setImageUrls] = useState([]);
    // const [currentUserProfile, setCurrentUserProfile] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const registerHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const name = formData.get('name');
        const city = formData.get('city');
        const gender = formData.get('gender');
        const repass = formData.get('repass');

        if (password !== repass) {
            throw new Error('Passwords don\'t match')
        }

        const user = {
            email,
            password,
            name,
            avatar: currentImageUrl,
            city,
            gender
        }

        userService.register(user)
            .then(res => {
                setRegisterUser(res.myUser)
                dispatch(register({ payload: { email: res.myUser.email, uid: res.myUser.uid }, type: 'REGISTER' }))
                dispatch(userProfile({ payload: { email: res.myUser.email, name, avatar: currentImageUrl, city, gender }, type: 'USER PROFILE' }))
                navigate('/')
            })
            .catch(err => console.log('A relevant error message should appear here', err.message))
    }


    const uploadFile = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `users/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then(res => {
            getDownloadURL(res.ref).then((url) => {
                setImageUrls(state => [...state, url]);
                setCurrentImageUrl(url)
            });
        });
    };

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
                        <input type="text" placeholder='Name' name="name" />
                    </div>
                    <div>
                        <input type="file" name="avatar" placeholder='Upload profile picture' onChange={(e) => setImageUpload(e.target.files[0])} />
                        <button onClick={uploadFile} type='button'> Upload Image</button>
                    </div>
                    <div>
                        <input type="text" placeholder='City' name="city" />
                    </div>
                    <div>
                        <label htmlFor='gender'>Gender: </label>
                        <input type="radio" value="male" />Male
                        <input type="radio" value="female" />Female
                    </div>
                    {/* <div>
                        <FontAwesomeIcon icon={faUser} />
                        <input type="text" placeholder='Email' name='email' />
                    </div> */}
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