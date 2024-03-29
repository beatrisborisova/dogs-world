import styles from './Profile.module.css';
import userStyles from '../User.module.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as userService from '../../../services/user';
import CircularColor from '../../others/Spinner';

export const Profile = () => {

    const [currentUser, setCurrentUser] = useState(null);
    const user = useSelector((states) => states.user.value.payload);

    useEffect(() => {
        userService.getUserData(user.uid)
            .then(res => {
                setCurrentUser(res.user.myUser)
            });
    }, [])

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileMainContent}>
                <div className={styles.imageWrapperProfile}>
                    {currentUser && <img src={currentUser.avatar} alt="user" />}
                    {!currentUser && <CircularColor />}
                </div>
                <div className={styles.profileContent}>
                    <div className={userStyles.loginRegisterUserNav}>
                        <span className={styles.myDogsLinkContainer}><Link to={'/my-dogs'}>My dogs</Link></span>
                        <span className={styles.myDogsEditProfileContainer}><Link to={'/edit-profile'}>Edit profile</Link></span>
                    </div>
                    {currentUser &&
                        <div className={styles.profileText}>
                            <h2><span>{currentUser.name}</span></h2>
                            <p><b>Email: </b><span>{currentUser.email}</span></p>
                            <p><b>City: </b> <span>{currentUser.city}</span></p>
                            <p><b>Gender: </b><span>{currentUser.gender}</span></p>
                        </div>
                    }

                    {!currentUser && <CircularColor />}
                </div>
            </div>
        </div>
    )
}