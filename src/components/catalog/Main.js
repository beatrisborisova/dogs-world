import './Catalog.css';
import { NavLink } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import { useEffect, useState } from 'react';
import * as dogsService from '../../services/dogs';
import CircularColor from '../others/Spinner';
import { motion } from 'framer-motion';


export const Main = () => {

    const [dogs, setDogs] = useState([]);

    useEffect(() => {
        dogsService.getAllAdopt()
            .then(res => setDogs(res))
    }, [])

    return (
        <motion.section className='main-section'
            initial={{ width: 0 }} animate={{ width: '100%' }} exit={{ width: '100%', transition: { duration: 0.3 } }}>
            <div className='main-section-content'>
                <article className='main-adopt-article main-article'>
                    <h2>Adopt a dog</h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.</p>
                    {dogs.length > 0 &&
                        <Carousel className="main-carousel">
                            {dogs.map(el => (
                                <Carousel.Item key={el.id}>
                                    <img
                                        className="d-block w-100"
                                        src="https://i.ytimg.com/vi/MPV2METPeJU/maxresdefault.jpg"
                                        alt="slide"
                                    />
                                    <p>{el.breed}</p>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    }
                    {dogs.length === 0 && <CircularColor />}
                    <NavLink to={'/catalog/adopt'} className="btn-level-two">GO</NavLink>
                </article>
                <article className='main-buy-article main-article'>
                    <h2>Buy a dog</h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.</p>
                    {dogs.length > 0 &&
                        <Carousel className="main-carousel">
                            {dogs.map(el => (
                                <Carousel.Item key={el.id}>
                                    <img
                                        className="d-block w-100"
                                        src="https://i.ytimg.com/vi/MPV2METPeJU/maxresdefault.jpg"
                                        alt="slide"
                                    />
                                    <p>{el.breed}</p>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    }
                    {dogs.length === 0 && <CircularColor />}
                    <NavLink to={'/catalog/buy'} className="btn-level-two">GO</NavLink>
                </article>
            </div>
        </motion.section>
    )
}