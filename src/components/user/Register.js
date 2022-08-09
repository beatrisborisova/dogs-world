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

const validateEmail = require("email-validator");

const errorsInitialState = {
    email: {
        isValid: '',
        value: ''
    },
    password: {
        isValid: '',
        value: ''
    },
    repass: {
        isValid: '',
        value: ''
    },
    name: {
        isValid: '',
        value: ''
    },
    gender: {
        isValid: '',
        value: ''
    },
    avatar: {
        isValid: '',
        value: ''
    },
    city: {
        isValid: '',
        value: ''
    },
}

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
    const [genderSelectedOption, setGenderSelectedOption] = useState('male');
    const [succesfulUpload, setSuccesfulUplaod] = useState(false);

    const [errors, setErrors] = useState(errorsInitialState);



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
            setErrors(oldState => {
                return { ...oldState, password: { isValid: false, value: 'Passwords don\'t match' } }
            })
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

    const emailValidator = (e) => {
        if (e.target.value === "") {
            setErrors(oldState => {
                return { ...oldState, email: { isValid: false, value: 'Email fiels is required' } }
            })
        } else if (!validateEmail.validate(e.target.value)) {
            setErrors(oldState => {
                return { ...oldState, email: { isValid: false, value: 'Email must be in a format xxx@xxx.xxx' } }
            })
        } else {
            setErrors(oldState => {
                return { ...oldState, email: { isValid: true, value: '' } }
            })
        }
    }

    const nameValidator = (e) => {
        const namePattern = /[A-Z]\w+ [A-Z]\w+/;
        if (e.target.value === "") {
            setErrors(oldState => {
                return { ...oldState, name: { isValid: false, value: 'Name field is required' } }
            })
        } else if (!namePattern.test(e.target.value)) {
            setErrors(oldState => {
                return { ...oldState, name: { isValid: false, value: 'Name must be in format Firstname Lastname' } }
            })
        } else {
            setErrors(oldState => {
                return { ...oldState, name: { isValid: true, value: '' } }
            })
        }
    }

    const passwordValidator = (e) => {

        if (e.target.value === "") {
            setErrors(oldState => {
                return { ...oldState, password: { isValid: false, value: 'Password fields are required' } }
            })
        } else if (e.target.value.length < 6) {
            setErrors(oldState => {
                return { ...oldState, password: { isValid: false, value: 'Password must be at least 6 characters long' } }
            })
        } else {
            setErrors(oldState => {
                return { ...oldState, password: { isValid: true, value: '' } }
            })
        }
    }

    const cityValidator = (e) => {
        if (e.target.value === "") {
            setErrors(oldState => {
                return { ...oldState, city: { isValid: false, value: 'City field is required' } }
            })
        } else if (e.target.value.length < 3) {
            setErrors(oldState => {
                return { ...oldState, city: { isValid: false, value: 'City name must be at leas 3 characters long' } }
            })
        } else {
            setErrors(oldState => {
                return { ...oldState, city: { isValid: true, value: '' } }
            })
        }
    }

    return (
        <div className={styles.loginRegisterContainer}>
            <div className={styles.loginRegisterUserNav}>
                <NavLink to={'/login'} activeclass>Login</NavLink>
                <NavLink to={'/register'}>Register</NavLink>
            </div>
            <div className={styles.loginRegisterContent}>
                <form onSubmit={registerHandler} className={styles.loginRegisterForm}>
                    <div>
                        <FontAwesomeIcon icon={faUser} />
                        <input type="text" placeholder='Email' name='email' value={email} onChange={((e) => setEmail(e.target.value))} onBlur={emailValidator} />
                        {!errors.email.isValid && <p className='error'>{errors.email.value}</p>}
                    </div>
                    <div>
                        <input type="text" placeholder='Name' name="name" value={name} onChange={(e) => setName(e.target.value)} onBlur={nameValidator} />
                        {!errors.name.isValid && <p className='error'>{errors.name.value}</p>}
                    </div>
                    <div>
                        <input type="file" name="avatar" placeholder='Upload profile picture' onChange={(e) => setImageUpload(e.target.files[0])} />
                    </div>
                    <button onClick={uploadFile} type='button' className='upload-btn'>Upload avatar</button>
                    {succesfulUpload && <p className='success'>Avatar uploaded succesfully</p>}

                    <div>
                        <input type="text" placeholder='City' name="city" value={city} onChange={(e) => setCity(e.target.value)} onBlur={cityValidator} />
                        {!errors.city.isValid && <p className='error'>{errors.city.value}</p>}
                    </div>
                    <div className='radio-div-container'>
                        <label htmlFor='gender'>Gender: </label>
                        <span className='radio-span'><input type="radio" value="male" onChange={genderChangeHandler} checked={genderSelectedOption === 'male'} />Male</span>
                        <span className='radio-span'><input type="radio" value="female" onChange={genderChangeHandler} checked={genderSelectedOption === 'female'} />Female</span>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faKey} />
                        <input type="password" placeholder='Password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} onBlur={passwordValidator} />
                        {/* {!errors.password.isValid && <p className='error'>{errors.password.value}</p>} */}
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faKey} />
                        <input type="password" placeholder='Repeat password' name='repass' value={repass} onChange={(e) => setRepass(e.target.value)} onBlur={passwordValidator} />
                        {!errors.password.isValid && <p className='error'>{errors.password.value}</p>}
                    </div>
                    <div>
                        <input type="submit" value="Register" className={styles.submitBtn} />
                    </div>
                </form>
            </div>
        </div>
    )
}