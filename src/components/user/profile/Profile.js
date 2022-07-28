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
            .then(res => {
                setCurrentUser(res.user.myUser)
            });
    }, [])

    // console.log('user', user.uid);
    // console.log('USER WE', currentUser.uid);

    return (
        <div className='profile-container'>
            <div className="image-wrapper-profile">
                {currentUser && <img src={currentUser.avatar} alt="user" />}
            </div>
            <div className='profile-content'>
                <div className='login-register-username-nav'>
                    <Link to={'/my-dogs'}>My dogs</Link>
                    <Link to={'/edit-profile'}>Edit profile</Link>
                </div>
                <div className="profile-text">
                    <h2>Name: {currentUser && <span>{currentUser.name}</span>} {!currentUser && <span>NOT SET</span>}</h2>
                    <p>email: {currentUser && <span>{currentUser.email}</span>} {!currentUser && <span>NOT SET</span>}</p>
                    <p>city: {currentUser && <span>{currentUser.city}</span>} {!currentUser && <span>NOT SET</span>}</p>
                    <p>gender:{currentUser && <span>{currentUser.gender}</span>} {!currentUser && <span>NOT SET</span>}</p>
                </div>
            </div>
        </div>
    )
}