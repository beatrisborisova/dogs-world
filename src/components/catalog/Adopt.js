import { useEffect, useState } from 'react';
import './Catalog.css';
import { Dog } from './dog/dog-item/Dog';
import * as dogsService from '../../services/dogs';
import LinearColor from '../others/Loader';

export const Adopt = () => {

    const [dogs, setDogs] = useState([]);

    useEffect(() => {
        dogsService.getAllAdopt()
            .then(res => setDogs(res))
    }, [])

    return (
        <>
            <section className='adopt-buy-section-container'>
                <p>Adopt a dog</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
            </section>
            <section className='adopt-buy-catalog-container'>
                {dogs && dogs.map(el => <Dog type="adopt" dog={el} key={el.id} />)}
                {dogs.length === 0 && <LinearColor />}
            </section>
        </>
    )
}