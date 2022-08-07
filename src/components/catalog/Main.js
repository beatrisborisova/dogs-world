import styles from './Catalog.module.css';
import { NavLink } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import { useEffect, useState } from 'react';
import * as dogsService from '../../services/dogs';
import CircularColor from '../others/Spinner';
import { motion } from 'framer-motion';


export const Main = () => {

    const [adoptDogs, setAdoptDogs] = useState([]);
    const [buyDogs, setBuyDogs] = useState([]);
    const [dogs, setDogs] = useState([]);

    useEffect(() => {
        dogsService.getAllAdopt()
            .then(res => setAdoptDogs(res))
        dogsService.getAllBuy()
            .then(res => setBuyDogs(res))
        dogsService.getAllDogs()
            .then(res => setDogs(res))
    }, [])

    return (
        // <motion.section className='main-section'
        //     initial={{ width: 0 }} animate={{ width: '100%' }} exit={{ width: '100%', transition: { duration: 0.3 } }}>
        <div className={styles.mainSectionContent}>
            <article className={[styles.mainAdoptArticle, styles.mainArticle].join(' ')}>
                <h2>Adopt a dog</h2>
                {adoptDogs.length > 0 &&
                    <Carousel className={styles.mainCarousel}>
                        {adoptDogs.map((el, index) => {
                            if (index < 3) {
                                return (
                                    <Carousel.Item key={el.id}>
                                        <img
                                            className="d-block w-100"
                                            src={el.dog.uploadImg}
                                            alt="slide"
                                        />
                                        <p>{el.dog.breed}</p>
                                    </Carousel.Item>
                                )
                            }
                        })}
                    </Carousel>
                }
                {adoptDogs.length === 0 && <CircularColor />}
                <NavLink to={'/catalog/adopt'} className="btn-level-two">GO</NavLink>
            </article>
            <article className={[styles.mainBuyArticle, styles.mainArticle].join(' ')}>
                <h2>Buy a dog</h2>
                {buyDogs.length > 0 &&
                    <Carousel className={styles.mainCarousel}>
                        {buyDogs.map((el, index) => {
                            if (index < 3) {
                                return (
                                    <Carousel.Item key={el.id}>
                                        <img
                                            className="d-block w-100"
                                            src={el.dog.uploadImg}
                                            alt="slide"
                                        />
                                        <p>{el.dog.breed}</p>
                                    </Carousel.Item>
                                )
                            }
                        })}
                    </Carousel>
                }
                {buyDogs.length === 0 && <CircularColor />}
                <NavLink to={'/catalog/buy'} className="btn-level-two">GO</NavLink>
            </article>
        </div>


        // </motion.section>
    )
}