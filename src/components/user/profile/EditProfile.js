import './Profile.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { storage } from '../../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';

export const EditProfile = () => {

    const [imageUpload, setImageUpload] = useState(null);
    const [currentImageUrl, setCurrentImageUrl] = useState('');
    const [imageUrls, setImageUrls] = useState([]);
    const navigate = useNavigate();

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



    // const createDogHandler = async (e) => {
    //     e.preventDefault();
    //     const formData = new FormData(e.target);
    //     const dog = {
    //         breed: formData.get('breed'),
    //         age: formData.get('age'),
    //         gender: genderSelectedOption,
    //         vaccines: vaccinesSelectedOption,
    //         description: formData.get('description'),
    //         type: typeSelectedOpion,
    //         uploadImg: currentImageUrl
    //     }

    //     dogsService.createDog(dog)
    //         .then((res) => navigate(`/catalog/${typeSelectedOpion}/${res.id}`))
    //         .catch((err) => console.log(err.message))
    // }
    return (
        <>
            <div className="profile-text">
                <div>
                    <label htmlFor='name'>Name: </label>
                    <input type="text" />
                </div>
                <div>
                    <label htmlFor='avatar'>Avatar: </label>
                    <input type="file" />
                </div>
                <div>
                    <label htmlFor='name'>City: </label>
                    <input type="text" />
                </div>
                <div>
                    <label htmlFor='gender'>Gender: </label>
                    <input type="radio" value="male" />Male
                    <input type="radio" value="female" />Fale
                </div>
                <div>
                    <input type="submit" value="Save" className='submit-btn' />
                </div>
            </div>
        </>
    )
}