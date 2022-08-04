import './Create-Edit.css';
import * as dogsService from '../../services/dogs';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../firebase';
import { v4 } from 'uuid';


import { motion } from 'framer-motion';
import { DogContext } from '../../contexts/Dog';
import { useSelector, useDispatch } from 'react-redux';
import { setDog } from '../../features/dogs';

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
    // const dog = useSelector(states => states.dog.value.payload);
    const [isLoading, setIsLoading] = useState(true);

    const [breed, setBreed] = useState('');
    const [age, setAge] = useState('');
    const [vaccinesSelectedOption, setVaccinesSelectedOption] = useState('');
    const [typeSelectedOpion, setTypeSelectedOption] = useState('');
    const [genderSelectedOption, setGenderSelectedOption] = useState('');
    const [description, setDescription] = useState('');
    const [succesfulUpload, setSuccesfulUplaod] = useState(false);

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
                dispatch(setDog({ payload: { dog, id: res.id, creatorId: user.uid }, type: 'SET DOG' }));
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
        <motion.div className='create-edit-container' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className='create-edit-content'>
                <h2>Edit</h2>

                {isLoading && <div>Loading ... </div>}

                {!isLoading &&
                    <form onSubmit={editDogHandler} className="create-edit-form">
                        <div>
                            <label htmlFor='breed'>Breed:</label>
                            {dog && <input type="text" name="breed" value={breed} onChange={(e) => setBreed(e.target.value)} />}
                        </div>
                        <div>
                            <label htmlFor='age'>Age:</label>
                            {dog && <input type="number" name="age" value={age} onChange={(e) => setAge(e.target.value)} />}
                        </div>
                        <div>
                            <label htmlFor='age'>Gender:</label>
                            {dog && <input type="radio" name="gender" value='male' onChange={genderChangeHandler} checked={genderSelectedOption === 'male'} />} Male
                            {dog && <input type="radio" name="gender" value='female' onChange={genderChangeHandler} checked={genderSelectedOption === 'female'} />} Female
                        </div>
                        <div>
                            <label htmlFor='vaccines'>Vaccines:</label>
                            {dog && <input type="radio" name="vaccines" value='yes' onChange={vaccinesChangeHandler} checked={vaccinesSelectedOption === 'yes'} />} Yes
                            {dog && <input type="radio" name="vaccines" value='no' onChange={vaccinesChangeHandler} checked={vaccinesSelectedOption === 'no'} />} No
                        </div>
                        <div>
                            <label htmlFor='uploadImg'>Upload image:</label>
                            {dog &&
                                <>
                                    <div className='edit-image-wrapper'>
                                        <img src={currentImageUrl} alt="dog" />
                                    </div>
                                    <input type="file" name="uploadImg" onChange={(e) => setImageUpload(e.target.files[0])} />
                                </>
                            }
                        </div>
                        <button onClick={uploadFile} type='button' className='upload-btn'> Upload Image</button>
                        {succesfulUpload && <p className='success'>Image uploaded succesfully</p>}

                        <div>
                            <label htmlFor='description'>Description:</label>
                            {dog && <textarea type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />}

                        </div>
                        <div>
                            <label htmlFor='type'>Type:</label>
                            {dog && <input type="radio" name="type" value='adopt' onChange={typeChangeHandler} checked={typeSelectedOpion === 'adopt'} />} Adopt
                            {dog && <input type="radio" name="type" value='buy' onChange={typeChangeHandler} checked={typeSelectedOpion === 'buy'} />} Buy
                        </div>

                        <div>
                            <input type="submit" value="Save" className='submit-btn' />
                        </div>
                    </form>
                }

            </div>
        </motion.div>
    )
}