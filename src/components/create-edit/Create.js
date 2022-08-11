import styles from './Create-Edit.module.css';
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

    const [errors, setErrors] = useState(errorsInitialState);
    const [hasError, setHasError] = useState(false);

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
                        setErrors(oldState => {
                            return { ...oldState, image: { isValid: true, value: '' } }
                        })
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

        if (!errors.breed.isValid || !errors.age.isValid || !errors.image.isValid || !errors.description.isValid) {
            breedValidator();
            ageValidator();
            imageValidator();
            descriptionValidator();
            return
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
        <motion.div className={styles.createEditContainer}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className={styles.createEditContent}>
                <h2>Publish a dog</h2>
                <form onSubmit={createDogHandler} className={styles.createEditForm}>
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
                        <span className='radio-span'><input type="radio" name="gender" value="male" onChange={genderChangeHandler} checked={genderSelectedOption === 'male'} /> Male</span>
                        <span className='radio-span'><input type="radio" name="gender" value="female" onChange={genderChangeHandler} checked={genderSelectedOption === 'female'} /> Female</span>
                    </div>
                    <div>
                        <label htmlFor='uploadImg'>Upload image:</label>
                        <input type="file" name="uploadImg" onChange={(e) => setImageUpload(e.target.files[0])} onBlur={imageValidator} />
                    </div>
                    {!errors.image.isValid && <p className='error'>{errors.image.value}</p>}
                    <button onClick={uploadFile} type='button' className='upload-btn'> Upload Image</button>
                    {succesfulUpload && <p className='success'>Image uploaded succesfully</p>}

                    <div className='radio-div-container'>
                        <label htmlFor='vaccines'>Vaccines:</label>
                        <span className='radio-span'><input type="radio" name="vaccines" value='yes' onChange={vaccinesChangeHandler} checked={vaccinesSelectedOption === 'yes'} /> Yes</span>
                        <span className='radio-span'><input type="radio" name="vaccines" value='no' onChange={vaccinesChangeHandler} checked={vaccinesSelectedOption === 'no'} /> No</span>
                    </div>
                    <div>
                        <label htmlFor='description'>Description:</label>
                        <textarea type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} onBlur={descriptionValidator} />
                    </div>
                    {!errors.description.isValid && <p className='error'>{errors.description.value}</p>}

                    <div className='radio-div-container'>
                        <label htmlFor='type'>Type:</label>
                        <span className='radio-span'> <input type="radio" name="type" value='adopt' onChange={typeChangeHandler} checked={typeSelectedOpion === 'adopt'} /> Adopt</span>
                        <span className='radio-span'><input type="radio" name="type" value='buy' onChange={typeChangeHandler} checked={typeSelectedOpion === 'buy'} /> Buy</span>
                    </div>

                    <div>
                        <input type="submit" value="Post a dog" className='submit-btn' />
                    </div>
                </form>
            </div>
        </motion.div>
    )
}
