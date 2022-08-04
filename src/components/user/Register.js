import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';

import styles from './User.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import * as userService from '../../services/user';
import { useEffect, useState } from 'react';
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

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repass, setRepass] = useState('');
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [gender, setGender] = useState('');
    const [genderSelectedOption, setGenderSelectedOption] = useState('');
    const [succesfulUpload, setSuccesfulUplaod] = useState(false);



    // const [currentUserProfile, setCurrentUserProfile] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (currentImageUrl) {
            setSuccesfulUplaod(true);
        }
    }, [currentImageUrl])


    const registerHandler = (e) => {
        e.preventDefault();

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
            .catch(err => console.log(err.message))
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

    const genderChangeHandler = (e) => {
        setGenderSelectedOption(e.target.value);
    }

    return (
        <div className={styles.loginRegisterContainer}>
            <div className={styles.loginRegisterUserNav}>
                <NavLink to={'/login'} activeClass>Login</NavLink>
                <NavLink to={'/register'}>Register</NavLink>
            </div>
            <div className={styles.loginRegisterContent}>
                <form onSubmit={registerHandler} className={styles.loginRegisterForm}>
                    <div>
                        <FontAwesomeIcon icon={faUser} />
                        <input type="text" placeholder='Email' name='email' value={email} onChange={((e) => setEmail(e.target.value))} />
                    </div>
                    <div>
                        <input type="text" placeholder='Name' name="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <input type="file" name="avatar" placeholder='Upload profile picture' onChange={(e) => setImageUpload(e.target.files[0])} />
                    </div>
                    <button onClick={uploadFile} type='button' className='upload-btn'>Upload avatar</button>
                    {succesfulUpload && <p className='success'>Avatar uploaded succesfully</p>}

                    <div>
                        <input type="text" placeholder='City' name="city" value={city} onChange={(e) => setCity(e.target.city)} />
                    </div>
                    <div className='radio-div-container'>
                        <label htmlFor='gender'>Gender: </label>
                        <input type="radio" value="male" onChange={genderChangeHandler} checked={genderSelectedOption === 'male'} />Male
                        <input type="radio" value="female" onChange={genderChangeHandler} checked={genderSelectedOption === 'male'} />Female
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faKey} />
                        <input type="password" placeholder='Password' name='password' value={password} onChange={(e) => setPassword(e.target.city)} />
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faKey} />
                        <input type="password" placeholder='Repeat password' name='repass' value={repass} onChange={(e) => setRepass(e.target.city)} />
                    </div>
                    <div>
                        <input type="submit" value="Register" className='submit-btn' />
                    </div>
                </form>
            </div>
        </div>
    )
}