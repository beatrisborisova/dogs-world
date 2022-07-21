import './Create-Edit.css';
import '../user/User.css'
import * as dogsService from '../../services/dogs';
import { useState } from 'react';

export const Create = () => {

    const [vaccinesSelectedOption, setVaccinesSelectedOption] = useState('yes');
    const [typeSelectedOpion, setTypeSelectedOption] = useState('adopt');
    const [genderSelectedOption, setGenderSelectedOption] = useState('male');

    const createDogHandler = async (e) => {
        e.preventDefault();
        const dog = Object.fromEntries(new FormData(e.target));
        dogsService.createDog(dog);
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

    return (
        <div className='create-edit-container'>
            <div className='create-edit-content'>
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
                        <input type="text" name="uploadImg" />
                    </div>
                    <div>
                        <input type="submit" value="Post a dog" className='submit-btn' />
                    </div>
                </form>
            </div>
        </div>
    )
}
