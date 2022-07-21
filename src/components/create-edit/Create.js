import './Create-Edit.css';
import '../user/User.css'
import * as dogsService from '../../services/dogs';
import { useState } from 'react';

export const Create = () => {

    const [vaccinesSelectedOption, setVaccinesSelectedOption] = useState('Yes');
    const [typeSelectedOpion, setTypeSelectedOption] = useState('Adopt');

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
                        <label htmlFor='vaccines'>Vaccines:</label>
                        <input type="radio" name="vaccines" value='Yes' onChange={(e) => vaccinesChangeHandler(e.target.value)} checked={vaccinesSelectedOption === 'Yes'} /> Yes
                        <input type="radio" name="vaccines" value='No' onChange={(e) => vaccinesChangeHandler(e.target.value)} checked={vaccinesSelectedOption === 'No'} /> No
                    </div>
                    <div>
                        <label htmlFor='description'>Description:</label>
                        <input type="text" name="description" />
                    </div>
                    <div>
                        <label htmlFor='type'>Type:</label>
                        <input type="radio" name="type" value='Adopt' onChange={(e) => typeChangeHandler(e.target.value)} checked={typeSelectedOpion === 'Adopt'} /> Adopt
                        <input type="radio" name="type" value='Buy' onChange={(e) => typeChangeHandler(e.target.value)} checked={typeSelectedOpion === 'Buy'} /> Buy
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
