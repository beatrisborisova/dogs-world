import './Create-Edit.css';
// import styles from '../user/User.module.css'
import * as dogsService from '../../services/dogs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { motion } from 'framer-motion';
import { setDog } from '../../features/dogs';
import { useDispatch, useSelector } from 'react-redux';

export const Create = () => {

    const [imageUpload, setImageUpload] = useState(null);
    const [currentImageUrl, setCurrentImageUrl] = useState('');
    const [imageUrls, setImageUrls] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(states => states.user.value.payload);


    const [breed, setBreed] = useState('');
    const [age, setAge] = useState('');
    const [vaccinesSelectedOption, setVaccinesSelectedOption] = useState('yes');
    const [typeSelectedOpion, setTypeSelectedOption] = useState('adopt');
    const [genderSelectedOption, setGenderSelectedOption] = useState('male');
    const [description, setDescription] = useState('');
    const [succesfulUpload, setSuccesfulUplaod] = useState(false);

    useEffect(() => {
        if (currentImageUrl) {
            setSuccesfulUplaod(true);
        }
    }, [currentImageUrl])

    const uploadFile = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `dogs/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload)
            .then(res => {
                getDownloadURL(res.ref)
                    .then((url) => {
                        setImageUrls(state => [...state, url]);
                        setCurrentImageUrl(url);
                    });
            });
    }


    const createDogHandler = async (e) => {
        e.preventDefault();

        const dog = {
            breed,
            age,
            gender: genderSelectedOption,
            vaccines: vaccinesSelectedOption,
            description,
            type: typeSelectedOpion,
            uploadImg: currentImageUrl
        }

        dogsService.createDog(dog)
            .then((res) => {
                navigate(`/catalog/${typeSelectedOpion}/${res.id}`)
                dispatch(setDog({ payload: { dog, id: res.id, creatorId: user.uid }, type: 'SET DOG' }));
            })
            .catch((err) => console.log(err.message))

    }

    const typeChangeHandler = (e) => {
        setTypeSelectedOption(e.target.value);
    }

    const genderChangeHandler = (e) => {
        setGenderSelectedOption(e.target.value);
    }

    const vaccinesChangeHandler = (e) => {
        setVaccinesSelectedOption(e.target.value);
    }

    return (
        <motion.div className='create-edit-container'
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className='create-edit-content'>
                <h2>Publish a dog</h2>
                <form onSubmit={createDogHandler} className="create-edit-form">
                    <div>
                        <label htmlFor='breed'>Breed:</label>
                        <input type="text" name="breed" value={breed} onChange={(e) => setBreed(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor='age'>Age:</label>
                        <input type="number" name="age" value={age} onChange={(e) => setAge(e.target.value)} />
                    </div>
                    <div className='radio-div-container'>
                        <label htmlFor='age'>Gender:</label>
                        <input type="radio" name="gender" value="male" onChange={genderChangeHandler} checked={genderSelectedOption === 'male'} /> Male
                        <input type="radio" name="gender" value="female" onChange={genderChangeHandler} checked={genderSelectedOption === 'female'} /> Female
                    </div>
                    <div>
                        <label htmlFor='uploadImg'>Upload image:</label>
                        <input type="file" name="uploadImg" onChange={(e) => setImageUpload(e.target.files[0])} />
                    </div>
                    <button onClick={uploadFile} type='button' className='upload-btn'> Upload Image</button>
                    {succesfulUpload && <p className='success'>Image uploaded succesfully</p>}

                    <div className='radio-div-container'>
                        <label htmlFor='vaccines'>Vaccines:</label>
                        <input type="radio" name="vaccines" value='yes' onChange={vaccinesChangeHandler} checked={vaccinesSelectedOption === 'yes'} /> Yes
                        <input type="radio" name="vaccines" value='no' onChange={vaccinesChangeHandler} checked={vaccinesSelectedOption === 'no'} /> No
                    </div>
                    <div>
                        <label htmlFor='description'>Description:</label>
                        <textarea type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className='radio-div-container'>
                        <label htmlFor='type'>Type:</label>
                        <input type="radio" name="type" value='adopt' onChange={typeChangeHandler} checked={typeSelectedOpion === 'adopt'} /> Adopt
                        <input type="radio" name="type" value='buy' onChange={typeChangeHandler} checked={typeSelectedOpion === 'buy'} /> Buy
                    </div>

                    <div>
                        <input type="submit" value="Post a dog" className='submit-btn' />
                    </div>
                </form>
            </div>
        </motion.div>
    )
}
