import './Profile.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Profile = () => {

    const user = useSelector((states) => states.user.value.payload);

    console.log('uses', user);

    return (
        <div className='profile-container'>
            <div className="image-wrapper-profile">
                <img src={user.avatar} alt="user" />
            </div>
            <div className='profile-content'>
                <div className='login-register-username-nav'>
                    <Link to={'/my-dogs'}>My dogs</Link>
                    <Link to={'/edit-profile'}>Edit profile</Link>
                </div>
                <div className="profile-text">
                    <h2>Name: {user.name ? user.name : 'NOT SET'}</h2>
                    <p>email: {user.email}</p>
                    <p>city: {user.city ? user.city : 'NOT SET'}</p>
                    <p>gender: {user.gender ? user.gender : 'NOT SET'}</p>
                </div>
            </div>
        </div>
    )
}