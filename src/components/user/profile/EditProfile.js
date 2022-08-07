import styles from './Profile.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { storage } from '../../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';

import { useSelector } from 'react-redux';
import * as userService from '../../../services/user';
import LinearColor from '../../others/Linear';

export const EditProfile = () => {

    const [currentUserData, setCurrentUserData] = useState(null);
    const [imageUpload, setImageUpload] = useState(null);
    const [currentImageUrl, setCurrentImageUrl] = useState('');
    const [imageUrls, setImageUrls] = useState([]);

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [gender, setGender] = useState('');
    const [genderSelectedOption, setGenderSelectedOption] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [succesfulUpload, setSuccesfulUplaod] = useState(false);


    const user = useSelector((states) => states.user.value.payload);
    const navigate = useNavigate();

    useEffect(() => {
        userService.getUserData(user.uid)
            .then(res => {
                setCurrentUserData(res.user.myUser)
                setEmail(res.user.myUser.email)
                setName(res.user.myUser.name)
                setGenderSelectedOption(res.user.myUser.gender)
                setCity(res.user.myUser.city)

            })
    }, [])

    useEffect(() => {
        if (currentImageUrl) {
            setSuccesfulUplaod(true);
        }
    }, [currentImageUrl])

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

    const editProfileHandler = (e) => {
        e.preventDefault();

        const user = {
            name,
            email,
            avatar: currentImageUrl,
            city,
            gender: genderSelectedOption,
            uid: currentUserData.uid
        }

        userService.editProfile(user, currentUserData.uid)
            .then(() => navigate('/profile'))
    }

    const genderChangeHandler = (e) => {
        setGenderSelectedOption(e.target.value);
    }

    return (
        <div className={styles.profileContainer}>{currentUserData &&
            <form onSubmit={editProfileHandler} className={styles.profileText}>
                <h2>Edit profile</h2>
                <div>
                    <label htmlFor='name'>Name: </label>
                    <input type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='avatar'>Avatar: </label>
                    <input type="file" name="avatar" placeholder='Upload profile picture' onChange={(e) => setImageUpload(e.target.files[0])} />
                </div>
                <button onClick={uploadFile} type='button' className='upload-btn'>Upload avatar</button>
                {succesfulUpload && <p className='success'>Avatar uploaded succesfully</p>}

                <div>
                    <label htmlFor='city'>City: </label>
                    <input type="text" name='city' value={city} onChange={(e) => setCity(e.target.value)} />
                </div>
                <div className='radio-div-container'>
                    <label htmlFor='gender'>Gender: </label>
                    <span className='radio-span'><input type="radio" value="male" name='gender' onChange={genderChangeHandler} checked={genderSelectedOption === 'male'} />Male</span>
                    <span className='radio-span'><input type="radio" value="female" name='gender' onChange={genderChangeHandler} checked={genderSelectedOption === 'female'} />Female</span>
                </div>
                <div>
                    <button type="submit" className='btn-level-two' >Save</button>
                </div>
            </form>
        }
            {!currentUserData && <LinearColor />}
        </div>
    )
}