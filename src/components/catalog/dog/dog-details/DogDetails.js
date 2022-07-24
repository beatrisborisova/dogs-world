import './DogDetails.css';
import * as dogsService from '../../../../services/dogs';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { getAuth, onAuthStateChanged } from "firebase/auth";

export const DogDetails = () => {

    const location = useLocation();
    const url = location.pathname.split('/');
    const dogId = url[url.length - 1]

    const [dog, setDog] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        dogsService.getDogById(dogId)
            .then(res => setDog(res))
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
            console.log('User not logged in')
        }
    });


    const deleteDogHandler = () => {
        dogsService.deleteDog(dogId, dog)
    }

    return (
        <div className='dog-details-container'>
            {dog && <>
                <div className="image-wrapper-dog-details">
                    <img src='https://kb.rspca.org.au/wp-content/uploads/2018/11/golder-retriever-puppy.jpeg' alt="dog" />
                </div>
                <div className="dog-details-text">
                    <h2>{dog.breed}</h2>
                    <p>Age: {dog.age} years old</p>
                    <p>Паспорт: ДА / NE</p>
                    <p>Vacciness: {dog.vaccines}</p>
                    <p>{dog.description}</p>
                </div>
                <button onClick={() => navigate(`/edit/${dogId}`, { state: { dogId } })}>Edit dog</button>
                <button onClick={deleteDogHandler}>Delete dog</button>
            </>}

            {!dog && <div>Loading... /SPINNER TO BE ADDED/</div>}
        </div>
    )
}