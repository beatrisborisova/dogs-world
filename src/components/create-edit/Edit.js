import './Create-Edit.css';
import * as dogsService from '../../services/dogs';
import { useEffect, useState } from 'react';

export const Edit = () => {

    const [dog, setDog] = useState('');
    const [vaccinesSelectedOption, setVaccinesSelectedOption] = useState('Yes');
    const [typeSelectedOpion, setTypeSelectedOption] = useState('Adopt');

    useEffect(() => {
        dogsService.getDogById('Q9PtaYQj9cYjlAYl6RY6')
            .then(res => setDog(res))

    }, [])


    const editDogHandler = (e) => {
        e.preventDefault();

        const newDogData = Object.fromEntries(new FormData(e.target));
        dogsService.editDog('Q9PtaYQj9cYjlAYl6RY6', newDogData)
    }

    const vaccinesChangeHandler = (value) => {
        setVaccinesSelectedOption(value)
    }

    const typeChangeHandler = (value) => {
        setTypeSelectedOption(value);
    }

    return (
        <div className='create-edit-container'>
            <p>TO BE CHANGED TO CONTROLLED FORM</p>
            <div className='create-edit-content'>
                <form onSubmit={editDogHandler} className="create-edit-form">
                    <div>
                        <label htmlFor='breed'>Breed:</label>
                        {dog && <input type="text" name="breed" defaultValue={dog.breed} />}
                    </div>
                    <div>
                        <label htmlFor='age'>Age:</label>
                        {dog && <input type="number" name="age" defaultValue={dog.age} />}
                    </div>
                    <div>
                        <label htmlFor='vaccines'>Vaccines:</label>
                        {dog && <input type="radio" name="vaccines" value='Yes' onChange={(e) => vaccinesChangeHandler(e.target.value)} checked={vaccinesSelectedOption === 'Yes'} />} Yes
                        {dog && <input type="radio" name="vaccines" value='No' onChange={(e) => vaccinesChangeHandler(e.target.value)} checked={vaccinesSelectedOption === 'No'} />} No

                    </div>
                    <div>
                        <label htmlFor='description'>Description:</label>
                        {dog && <input type="text" name="description" defaultValue={dog.description} />}

                    </div>
                    <div>
                        <label htmlFor='type'>Type:</label>
                        {dog && <input type="radio" name="type" value='Adopt' onChange={(e) => typeChangeHandler(e.target.value)} checked={typeSelectedOpion === 'Adopt'} />} Adopt
                        {dog && <input type="radio" name="type" value='Buy' onChange={(e) => typeChangeHandler(e.target.value)} checked={typeSelectedOpion === 'Buy'} />} Buy
                    </div>
                    <div>
                        <label htmlFor='uploadImg'>Upload image:</label>
                        <input type="text" name="uploadImg" />
                        {dog && <input type="text" name="uploadImg" defaultValue={dog.uploadImg} />}

                    </div>
                    <div>
                        <input type="submit" value="Edit a dog" className='submit-btn' />
                    </div>
                </form>
            </div>
        </div>
    )
}