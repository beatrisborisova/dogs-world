import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Catalog.css';
import { Dog } from './dog/dog-item/Dog';
import * as dogsService from '../../services/dogs';

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
                <NavLink to={'/catalog/adopt/:id'}>
                    {dogs && dogs.map(el => <Dog type="adopt" dog={el} key={el.id} />)}
                </NavLink>
            </section>
        </>
    )
}