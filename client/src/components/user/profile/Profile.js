import { Link } from 'react-router-dom';
import './Profile.css';

export const Profile = () => {
    return (
        <div className='profile-container'>
            <div className="image-wrapper-profile">
                <img src="https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_1280.png" alt="user" />
            </div>
            <div className='profile-content'>
                <div className='login-register-username-nav'>
                    <Link to={'/my-dogs'}>My dogs</Link>
                    <Link to={'/edit-profile'}>Edit profile</Link>
                </div>
                <div className="profile-text">
                    <h2>username</h2>
                    <p>Name: "name"</p>
                    <p>email: "email"</p>
                    <p>city: "city"</p>
                    <p>gender: "gender"</p>
                </div>
            </div>
        </div>
    )
}