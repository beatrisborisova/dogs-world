import styles from './Create-Edit.module.css';
import * as dogsService from '../../services/dogs';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../firebase';
import { v4 } from 'uuid';


import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { setDog as setReduxState } from '../../features/dogs';
import LinearColor from '../others/Linear';

const errorsInitialState = {
    breed: {
        isValid: false,
        value: ''
    },
    age: {
        isValid: false,
        value: ''
    },
    image: {
        isValid: false,
        value: ''
    },
    description: {
        isValid: false,
        value: ''
    },
}

export const Edit = () => {

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

    const [errors, setErrors] = useState(errorsInitialState);

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


        if (!errors.breed.isValid && !errors.age.isValid && !errors.image.isValid && !errors.description.isValid) {
            breedValidator();
            ageValidator();
            imageValidator();
            descriptionValidator();
            return
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

    const breedValidator = () => {
        if (breed === "") {
            setErrors(oldState => {
                return { ...oldState, breed: { isValid: false, value: 'Breed field is required' } }
            })
        } else if (breed.length < 3) {
            setErrors(oldState => {
                return { ...oldState, breed: { isValid: false, value: 'Breed must be at least 3 characters long' } }
            })
        } else {
            setErrors(oldState => {
                return { ...oldState, breed: { isValid: true, value: '' } }
            })
        }
    }

    const ageValidator = () => {
        if (age === "") {
            setErrors(oldState => {
                return { ...oldState, age: { isValid: false, value: 'Age field is required' } }
            })
        } else if (Number(age) < 0) {
            setErrors(oldState => {
                return { ...oldState, age: { isValid: false, value: 'Age must a whole number bigger or equal to 0' } }
            })
        } else {
            setErrors(oldState => {
                return { ...oldState, age: { isValid: true, value: '' } }
            })
        }
    }

    const imageValidator = () => {
        if (currentImageUrl === "") {
            setErrors(oldState => {
                return { ...oldState, image: { isValid: false, value: 'Image field is required' } }
            })
        } else {
            setErrors(oldState => {
                return { ...oldState, image: { isValid: true, value: '' } }
            })
        }
    }

    const descriptionValidator = (e) => {
        if (description === "") {
            setErrors(oldState => {
                return { ...oldState, description: { isValid: false, value: 'Description field is required' } }
            })
        } else if (description.length < 10) {
            setErrors(oldState => {
                return { ...oldState, description: { isValid: false, value: 'Description must be at least 10 characters long' } }
            })
        } else {
            setErrors(oldState => {
                return { ...oldState, description: { isValid: true, value: '' } }
            })
        }
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
                            <input type="text" name="breed" value={breed} onChange={(e) => setBreed(e.target.value)} onBlur={breedValidator} />
                        </div>
                        {!errors.breed.isValid && <p className='error'>{errors.breed.value}</p>}

                        <div>
                            <label htmlFor='age'>Age:</label>
                            <input type="number" name="age" value={age} onChange={(e) => setAge(e.target.value)} onBlur={ageValidator} />
                        </div>
                        {!errors.age.isValid && <p className='error'>{errors.age.value}</p>}

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
                                <input type="file" name="uploadImg" onChange={(e) => setImageUpload(e.target.files[0])} onBlur={imageValidator} />
                            </>

                        </div>
                        <button onClick={uploadFile} type='button' className='upload-btn'> Upload Image</button>
                        {isImageChanged && <p className='success'>Image uploaded succesfully</p>}

                        <div>
                            <label htmlFor='description'>Description:</label>
                            <textarea type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} onBlur={descriptionValidator} />
                        </div>
                        {!errors.description.isValid && <p className='error'>{errors.description.value}</p>}

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