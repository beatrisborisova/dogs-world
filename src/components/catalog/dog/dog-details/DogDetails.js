import './DogDetails.css';
import * as dogsService from '../../../../services/dogs';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { getAuth, onAuthStateChanged } from "firebase/auth";

export const DogDetails = () => {

    const location = useLocation();
    const url = location.pathname.split('/');
    const dogId = url[url.length - 1]

    const [dog, setDog] = useState([]);

    useEffect(() => {
        dogsService.getDogById(dogId)
            .then(res => console.log(res))
    }, [dogId])

    console.log('dog', dog);


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


    // const deleteDogHandler = () => {
    //     dogsService.deleteDog(dogId)
    // }

    return (
        <div className='dog-details-container'>
            <div className="image-wrapper-dog-details">
                <img src='https://kb.rspca.org.au/wp-content/uploads/2018/11/golder-retriever-puppy.jpeg' alt="dog" />
            </div>
            <div className="dog-details-text">
                {/* <h2>{dog && dog.breed}</h2> */}
                <p>Възраст: 7 години</p>
                <p>Паспорт: ДА / NE</p>
                <p>Ваксини: видове ваксини</p>
                <p>Описание</p>
            </div>
            {/* <button onClick={deleteDogHandler}>Delete dog</button> */}
        </div>
    )
}