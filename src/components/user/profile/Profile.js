import './Profile.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as userService from '../../../services/user';

export const Profile = () => {

    const [currentUser, setCurrentUser] = useState(null);
    const user = useSelector((states) => states.user.value.payload);

    useEffect(() => {
        userService.getUserData(user.uid)
            .then(res => setCurrentUser(res.user.myUser));

    }, [])

    return (
        <div className='profile-container'>
            <div className="image-wrapper-profile">
                {/* {currentUser.avatar && <img src={currentUser.avatar} alt="user" />} */}
                {/* {!currentUser.avatar && <span>NI6to we</span>} */}
            </div>
            <div className='profile-content'>
                <div className='login-register-username-nav'>
                    <Link to={'/my-dogs'}>My dogs</Link>
                    <Link to={'/edit-profile'}>Edit profile</Link>
                </div>
                <div className="profile-text">
                    <h2>Name: {currentUser.name ? currentUser.name : 'NOT SET'}</h2>
                    <p>email: {currentUser.email}</p>
                    <p>city: {currentUser.city ? currentUser.city : 'NOT SET'}</p>
                    <p>gender: {currentUser.gender ? currentUser.gender : 'NOT SET'}</p>
                </div>
            </div>
        </div>
    )
}