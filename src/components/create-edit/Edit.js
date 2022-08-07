import styles from './Create-Edit.module.css';
import * as dogsService from '../../services/dogs';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../firebase';
import { v4 } from 'uuid';


import { motion } from 'framer-motion';
import { DogContext } from '../../contexts/Dog';
import { useSelector, useDispatch } from 'react-redux';
import { setDog as setReduxState } from '../../features/dogs';
import LinearColor from '../others/Linear';

export const Edit = () => {

    const { state } = useLocation();
    const dogState = useSelector(states => states.dog.value.payload);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [dog, setDog] = useState('');
    const [imageUpload, setImageUpload] = useState(null);
    const [currentImageUrl, setCurrentImageUrl] = useState('');
    const [imageUrls, setImageUrls] = useState([]);
    const user = useSelector(states => states.user.value.payload);

    const [isLoading, setIsLoading] = useState(true);

    const [breed, setBreed] = useState('');
    const [age, setAge] = useState('');
    const [vaccinesSelectedOption, setVaccinesSelectedOption] = useState('');
    const [typeSelectedOpion, setTypeSelectedOption] = useState('');
    const [genderSelectedOption, setGenderSelectedOption] = useState('');
    const [description, setDescription] = useState('');
    const [succesfulUpload, setSuccesfulUplaod] = useState(false);
    const [isImageChanged, setIsImageChanged] = useState(false);

    useEffect(() => {
        dogsService.getDogById(dogState.id)
            .then(res => {
                setDog(res.dog)
                setBreed(res.dog.dog.breed)
                setAge(res.dog.dog.age)
                setDescription(res.dog.dog.description)
                setTypeSelectedOption(res.dog.dog.type)
                setVaccinesSelectedOption(res.dog.dog.vaccines)
                setGenderSelectedOption(res.dog.dog.gender)
                setCurrentImageUrl(res.dog.dog.uploadImg)
                setIsLoading(false)
            })
    }, [])

    useEffect(() => {
        if (currentImageUrl) {
            setSuccesfulUplaod(true);
            setCurrentImageUrl(currentImageUrl);
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
                        setIsImageChanged(true);
                    });
            });
    }


    const editDogHandler = (e) => {
        e.preventDefault();

        const newDogData = {
            breed,
            age,
            gender: genderSelectedOption,
            vaccines: vaccinesSelectedOption,
            description,
            type: typeSelectedOpion,
            uploadImg: currentImageUrl
        }

        dogsService.editDog(dogState.id, newDogData, dog.comments)
            .then((res) => {
                navigate(`/catalog/${typeSelectedOpion}/${dogState.id}`)
                dispatch(setReduxState({ payload: { dog: newDogData, id: res.id, creatorId: user.uid }, type: 'SET DOG' }))
            })
            .catch(err => console.log(err.message))
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
        <motion.div className={styles.createEditContainer} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className={styles.createEditContent}>
                <h2>Edit</h2>

                {isLoading && <LinearColor />}

                {!isLoading &&
                    <form onSubmit={editDogHandler} className={styles.createEditForm}>
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
                            <span className='radio-span'><input type="radio" name="gender" value='male' onChange={genderChangeHandler} checked={genderSelectedOption === 'male'} /> Male</span>
                            <span className='radio-span'><input type="radio" name="gender" value='female' onChange={genderChangeHandler} checked={genderSelectedOption === 'female'} /> Female</span>
                        </div>
                        <div className='radio-div-container'>
                            <label htmlFor='vaccines'>Vaccines:</label>
                            <span className='radio-span'><input type="radio" name="vaccines" value='yes' onChange={vaccinesChangeHandler} checked={vaccinesSelectedOption === 'yes'} /> Yes</span>
                            <span className='radio-span'><input type="radio" name="vaccines" value='no' onChange={vaccinesChangeHandler} checked={vaccinesSelectedOption === 'no'} /> No</span>
                        </div>
                        <div>
                            <label htmlFor='uploadImg'>Upload image:</label>

                            <>
                                <div className={styles.editImageWrapper}>
                                    <img src={currentImageUrl} alt="dog" />
                                </div>
                                <input type="file" name="uploadImg" onChange={(e) => setImageUpload(e.target.files[0])} />
                            </>

                        </div>
                        <button onClick={uploadFile} type='button' className='upload-btn'> Upload Image</button>
                        {isImageChanged && <p className='success'>Image uploaded succesfully</p>}

                        <div>
                            <label htmlFor='description'>Description:</label>
                            <textarea type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />

                        </div>
                        <div className='radio-div-container'>
                            <label htmlFor='type'>Type:</label>
                            <span className='radio-span'><input type="radio" name="type" value='adopt' onChange={typeChangeHandler} checked={typeSelectedOpion === 'adopt'} /> Adopt</span>
                            <span className='radio-span'><input type="radio" name="type" value='buy' onChange={typeChangeHandler} checked={typeSelectedOpion === 'buy'} /> Buy</span>
                        </div>

                        <div>
                            <button type="submit" className='submit-btn'>Save</button>
                        </div>
                    </form>
                }

            </div>
        </motion.div>
    )
}