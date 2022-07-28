import { useEffect, useState } from 'react';
import './Catalog.css';
import { Dog } from './dog/dog-item/Dog';
import * as dogsService from '../../services/dogs';
import LinearColor from '../others/Loader';

import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom';
import { DogFlyer } from './dog/dog-flyer/DogFlyer';



export const Adopt = () => {

    const [dogs, setDogs] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [currentDog, setCurrentDog] = useState(null);

    useEffect(() => {
        dogsService.getAllAdopt()
            .then(res => setDogs(res))
    }, [])


    return (
        <section>
            <section className='adopt-buy-section-container'>
                <p>Adopt a dog</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
            </section>
            <section className='adopt-buy-catalog-container'>
                {dogs.length === 0 && <LinearColor />}

                {dogs.length !== 0 &&
                    dogs.map(el => <Dog type="adopt" currentDog={el} key={el.id} setCurrentDog={setCurrentDog} setSelectedId={setSelectedId} />)
                }

                {selectedId && currentDog &&
                    <DogFlyer state={{ setSelectedId, setCurrentDog, currentDog }} />
                }
            </section>
        </section>
    )
}