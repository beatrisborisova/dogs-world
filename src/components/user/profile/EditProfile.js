import './Profile.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { storage } from '../../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';

import { useSelector } from 'react-redux';
import * as userService from '../../../services/user';

export const EditProfile = () => {


    const [currentUserData, setCurrentUserData] = useState(null);
    const navigate = useNavigate();
    // const [imageUpload, setImageUpload] = useState(null);
    // const [currentImageUrl, setCurrentImageUrl] = useState('');
    // const [imageUrls, setImageUrls] = useState([]);
    // const navigate = useNavigate();

    // const uploadFile = () => {
    //     if (imageUpload == null) return;
    //     const imageRef = ref(storage, `users/${imageUpload.name + v4()}`);
    //     uploadBytes(imageRef, imageUpload).then(res => {
    //         getDownloadURL(res.ref).then((url) => {
    //             setImageUrls(state => [...state, url]);
    //             setCurrentImageUrl(url)
    //         });
    //     });
    // };

    // const currentSessionUserId = userService.getUser();
    const user = useSelector((states) => states.user.value.payload);

    useEffect(() => {
        userService.getUserData(user.uid)
            .then(res => setCurrentUserData(res.user.myUser))
    }, [])


    console.log('curerntUserData', currentUserData);
    const editProfileHandler = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const name = formData.get('name');
        const avatar = 'asdf';
        const email = currentUserData.email;
        const city = formData.get('city');
        const gender = formData.get('gender');

        userService.editProfile({ name, email, avatar, city, gender, uid: currentUserData.uid }, currentUserData.uid)
            .then(res => {
                navigate('/profile')
                console.log('assfsevd');
            })
    }

    return (
        <>{currentUserData &&
            <form onSubmit={editProfileHandler} className="profile-text">
                <div>
                    <label htmlFor='name'>Name: </label>
                    <input type="text" defaultValue={currentUserData.name} name='name' />
                </div>
                <div>
                    <label htmlFor='avatar'>Avatar: </label>
                    <input type="file" name='avatar' />
                </div>
                <div>
                    <label htmlFor='city'>City: </label>
                    <input type="text" defaultValue={currentUserData.city} name='city' />
                </div>
                <div>
                    <label htmlFor='gender'>Gender: </label>
                    <input type="radio" defaultValue="male" name='gender' />Male
                    <input type="radio" defaultValue="female" name='gender' />Fale
                </div>
                <div>
                    <input type="submit" value="Save" className='submit-btn' />
                </div>
            </form>
        }
            {!currentUserData && <div>Spinner to be added ...</div>}
        </>
    )
}