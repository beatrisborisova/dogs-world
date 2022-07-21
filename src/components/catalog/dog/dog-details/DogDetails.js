import './DogDetails.css';
import * as dogsService from '../../../../services/dogs';

export const DogDetails = () => {

    // const deleteDogHandler = () => {
    //     dogsService.deleteDog(dogId)
    // }

    return (
        <div className='dog-details-container'>
            <div className="image-wrapper-dog-details">
                <img src='https://kb.rspca.org.au/wp-content/uploads/2018/11/golder-retriever-puppy.jpeg' alt="dog" />
            </div>
            <div className="dog-details-text">
                <h2>Dog's порода</h2>
                <p>Възраст: 7 години</p>
                <p>Паспорт: ДА / NE</p>
                <p>Ваксини: видове ваксини</p>
                <p>Описание</p>
            </div>
            <button onClick={deleteDogHandler}>Delete dog</button>
        </div>
    )
}