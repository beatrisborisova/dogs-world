import './Create-Edit.css';

export const Edit = () => {

    const editDog = (e) => {
        e.preventDefault();

        console.log(e.target);
    }


    return (
        <div className='create-edit-container'>
            <div className='create-edit-content'>
                <form onSubmit={editDog} className="create-edit-form">
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
                        <input type="text" name="vaccines" />
                    </div>
                    <div>
                        <label htmlFor='description'>Description:</label>
                        <input type="text" name="description" />
                    </div>
                    <div>
                        <label htmlFor='uploadImg'>Upload image:</label>
                        <input type="text" name="uploadImg" />
                    </div>
                    <div>
                        <input type="submit" value="Edit a dog" className='submit-btn' />
                    </div>
                </form>
            </div>
        </div>
    )
}