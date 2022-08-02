import { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import * as dogService from '../services/dogs';

const DogContext = createContext();

export { DogContext }

export const DogProvider = ({ children }) => {

    const [dog, setDog] = useState(null);
    const [dogState, setDogState] = useState(null);


    //TODO: Това работи, когато се даде едно рандом id от наличните
    // const dogId = '2cat';

    const location = useLocation();

    const locationDogId = location.pathname.split('/');
    const dogId = locationDogId[locationDogId.length - 1];

    useEffect(() => {
        dogService.getDogById(dogId)
            .then(res => setDogState(res))
    }, [])

    return (
        <DogContext.Provider value={dogState}>
            {children}
        </DogContext.Provider>
    )
}