import './Create-Edit.css';
import '../user/User.css'
import * as dogsService from '../../services/dogs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../../firebase';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';

export const Create = () => {
    const [vaccinesSelectedOption, setVaccinesSelectedOption] = useState('yes');
    const [typeSelectedOpion, setTypeSelectedOption] = useState('adopt');
    const [genderSelectedOption, setGenderSelectedOption] = useState('male');
    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
    const [imageList, setImageList] = useState([]);

    const navigate = useNavigate();

    const imageListRef = ref(storage, 'dogs');
    let uploadImg;

    useEffect(() => {
        listAll(imageListRef)
            .then(res => {
                res.items.forEach(item => {
                    getDownloadURL(item)
                        .then(url => uploadImg = url)
                })
            })
    }, [])


    const createDogHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const dog = {
            breed: formData.get('breed'),
            age: formData.get('age'),
            gender: genderSelectedOption,
            vaccines: vaccinesSelectedOption,
            description: formData.get('description'),
            type: typeSelectedOpion,
            uploadImg: uploadImg
        }

        dogsService.createDog(dog)
            .then((res) => {
                uploadImage(res.id)
            })
            // navigate(`/catalog/${typeSelectedOpion}/${res.id}`)
            .catch((err) => console.log(err.message))
    }

    const vaccinesChangeHandler = (value) => {
        setVaccinesSelectedOption(value)
    }

    const typeChangeHandler = (value) => {
        setTypeSelectedOption(value);
    }

    const genderChangeHandler = (value) => {
        setGenderSelectedOption(value);
    }

    const uploadImage = (id) => {
        console.log('imageUpload', imageUpload);

        if (imageUpload == null) {
            return
        }
        console.log('imageUpload', imageUpload);
        const imageRef = ref(storage, `dogs/${imageUpload.name + id}`);
        uploadBytes(imageRef, imageUpload)
            .then((res) => {
                getDownloadURL(res.ref).then((url) => {
                    setImageUrls((state) => [...state, url]);
                })
            });
    }

    return (
        <div className='create-edit-container'>
            <div className='create-edit-content'>
                <h2>Publish a dog</h2>
                <form onSubmit={createDogHandler} className="create-edit-form">
                    <div>
                        <label htmlFor='breed'>Breed:</label>
                        <input type="text" name="breed" />
                    </div>
                    <div>
                        <label htmlFor='age'>Age:</label>
                        <input type="number" name="age" />
                    </div>
                    <div>
                        <label htmlFor='age'>Gender:</label>
                        <input type="radio" name="gender" value="male" onChange={(e) => genderChangeHandler(e.target.value)} checked={genderSelectedOption === 'male'} /> Male
                        <input type="radio" name="gender" value="female" onChange={(e) => genderChangeHandler(e.target.value)} checked={genderSelectedOption === 'female'} /> Female
                    </div>
                    <div>
                        <label htmlFor='vaccines'>Vaccines:</label>
                        <input type="radio" name="vaccines" value='yes' onChange={(e) => vaccinesChangeHandler(e.target.value)} checked={vaccinesSelectedOption === 'yes'} /> Yes
                        <input type="radio" name="vaccines" value='no' onChange={(e) => vaccinesChangeHandler(e.target.value)} checked={vaccinesSelectedOption === 'no'} /> No
                    </div>
                    <div>
                        <label htmlFor='description'>Description:</label>
                        <input type="text" name="description" />
                    </div>
                    <div>
                        <label htmlFor='type'>Type:</label>
                        <input type="radio" name="type" value='adopt' onChange={(e) => typeChangeHandler(e.target.value)} checked={typeSelectedOpion === 'adopt'} /> Adopt
                        <input type="radio" name="type" value='buy' onChange={(e) => typeChangeHandler(e.target.value)} checked={typeSelectedOpion === 'buy'} /> Buy
                    </div>
                    <div>
                        <label htmlFor='uploadImg'>Upload image:</label>
                        <input type="file" name="uploadImg" onChange={(e) => setImageUpload(e.target.files[0])} />
                        {/* <button>Upload</button> */}
                    </div>
                    <div>
                        <input type="submit" value="Post a dog" className='submit-btn' />
                    </div>
                </form>
            </div>
        </div>
    )
}
