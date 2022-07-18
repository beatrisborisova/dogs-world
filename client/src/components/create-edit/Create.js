import './Create-Edit.css';
import '../user/User.css'

export const Create = () => {


    const createDog = (e) => {
        e.preventDefault();
        console.log('dog created')
    }

    return (
        <div className='create-edit-container'>
            <div className='create-edit-content'>
                <form onSubmit={createDog} className="create-edit-form">
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
                        <input type="submit" value="Post a dog" className='submit-btn' />
                    </div>
                </form>
            </div>
        </div>
    )
}
