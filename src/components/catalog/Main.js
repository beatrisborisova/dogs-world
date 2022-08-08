import styles from './Catalog.module.css';
import { NavLink } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import { useEffect, useState } from 'react';
import * as dogsService from '../../services/dogs';
import CircularColor from '../others/Spinner';
import { motion } from 'framer-motion';

import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Dog } from './dog/dog-item/Dog';
import { DogFlyer } from './dog/dog-flyer/DogFlyer';
import { NoDogs } from './dog/no-dogs/NoDogs';



export const Main = () => {

    const [adoptDogs, setAdoptDogs] = useState([]);
    const [buyDogs, setBuyDogs] = useState([]);
    const [dogs, setDogs] = useState([]);


    const [searchParams, setSearchParams] = useSearchParams();
    const [searchValue, setSeacrchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const [selectedId, setSelectedId] = useState(null);
    const [currentDog, setCurrentDog] = useState(null);
    const [creatorId, setCreatorId] = useState(null);


    useEffect(() => {
        dogsService.getAllAdopt()
            .then(res => setAdoptDogs(res))
        dogsService.getAllBuy()
            .then(res => setBuyDogs(res))
        dogsService.getAllDogs()
            .then(res => setDogs(res))
    }, [])

    const searchHandler = (e) => {
        e.preventDefault();

        const form = e.target;
        const search = new FormData(form).get('search');
        const result = dogs.filter(el => el.dog.breed.toLowerCase().trim() === search.toLowerCase().trim());

        const searchParams = createSearchParams({
            search
        }).toString()
        setSearchParams(searchParams)
        setSeacrchValue(search)
        form.reset();

        if (result.length === 0) {
            return setSearchResults([])
        }
        setSearchResults(result)

    }

    return (
        // <motion.section className='main-section'
        //     initial={{ width: 0 }} animate={{ width: '100%' }} exit={{ width: '100%', transition: { duration: 0.3 } }}>
        <>
            <div className={styles.searchContainer}>
                <form onSubmit={searchHandler}>
                    <input type="text" name='search' placeholder='Search by breed...' />
                    <button className='btn-level-three'>Search</button>
                </form>
            </div>
            <div className={styles.searchResultsContainer}>
                {searchResults && searchResults.length > 0 &&
                    <div className={styles.resultsContainer}>
                        <h2>Results</h2>
                        {searchResults.map(el => <Dog type={el.dog.type} currentDog={el.dog} dogId={el.id} key={el.id}
                            setCurrentDog={setCurrentDog} setSelectedId={setSelectedId} creatorId={el.creatorId}
                            setCreatorId={setCreatorId} />)}
                    </div>
                }
                {searchResults && searchResults.length === 0 && <NoDogs />}
                {selectedId && currentDog &&
                    <DogFlyer state={{ setSelectedId, setCurrentDog, currentDog, selectedId, creatorId }} />
                }
            </div>
            <div className={styles.mainSectionContent}>
                <article className={[styles.mainAdoptArticle, styles.mainArticle].join(' ')}>
                    <h2>Adopt a dog</h2>
                    <div className={styles.typeContainer}>
                        {adoptDogs.length > 0 &&
                            <Carousel className={styles.mainCarousel}>
                                {adoptDogs.map((el, index) => {
                                    if (index < 3) {
                                        return (
                                            <Carousel.Item key={el.id} className={styles.carouselItem}>
                                                <img
                                                    className="d-block w-100"
                                                    src={el.dog.uploadImg}
                                                    alt="slide"
                                                />
                                            </Carousel.Item>
                                        )
                                    }
                                })}
                            </Carousel>
                        }
                        {adoptDogs.length === 0 && <CircularColor />}
                        <NavLink to={'/catalog/adopt'} className="btn-level-two">GO</NavLink>
                    </div>

                </article>
                <article className={[styles.mainBuyArticle, styles.mainArticle].join(' ')}>
                    <h2>Buy a dog</h2>
                    {buyDogs.length > 0 &&
                        <Carousel className={styles.mainCarousel}>
                            {buyDogs.map((el, index) => {
                                if (index < 3) {
                                    return (
                                        <Carousel.Item key={el.id} className={styles.carouselItem}>
                                            <img
                                                className="d-block w-100"
                                                src={el.dog.uploadImg}
                                                alt="slide"
                                            />
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
        </>


        // </motion.section>
    )
}