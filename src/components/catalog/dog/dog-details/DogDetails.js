import './DogDetails.css';
import * as dogsService from '../../../../services/dogs';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { getAuth, onAuthStateChanged } from "firebase/auth";
import LinearColor from '../../../others/Loader';

export const DogDetails = () => {

    const dogId = useParams().id;

    const [dog, setDog] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        dogsService.getDogById(dogId)
            .then(res => setDog(res.dog.dog))
    }, [dogId])

    // CURRENT USER SCRIPT
    //More info: https://firebase.google.com/docs/auth/web/manage-users
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            // ...
            console.log('User logged in - uid: ', uid)
        } else {
            // User is signed out
            // ...
            console.log(' logged in')
        }
    });


    const deleteDogHandler = () => {
        dogsService.deleteDog(dogId, dog)
            .then(() => navigate(`/catalog/${dog.type}`))
            .catch((err) => console.log(err.message))

    }

    return (
        <div className='dog-details-container'>
            {dog && <>
                <div className="image-wrapper-dog-details">
                    <img src={dog.uploadImg} alt="dog" />
                </div>
                <div className="dog-details-text">
                    <h2>{dog.breed}</h2>
                    <p>Age: {dog.age} years old</p>
                    <p>Паспорт: ДА / NE</p>
                    <p>Vacciness: {dog.vaccines}</p>
                    <p>{dog.description}</p>
                </div>
                <button onClick={() => navigate(`/edit/${dogId}`, { state: { dogId } })} className="btn-level-two">Edit dog</button>
                <button onClick={deleteDogHandler} className="btn-level-two">Delete dog</button>
            </>}

            {!dog && <LinearColor />}
        </div>
    )
}