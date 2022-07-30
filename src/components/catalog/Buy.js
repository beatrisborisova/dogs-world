import './Catalog.css';
import { useEffect, useState } from 'react';
import { Dog } from './dog/dog-item/Dog';
import * as dogsService from '../../services/dogs';
import LinearColor from '../others/Linear';
import { DogFlyer } from './dog/dog-flyer/DogFlyer';
import { motion } from 'framer-motion';


export const Buy = () => {

    const [dogs, setDogs] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [currentDog, setCurrentDog] = useState(null);
    const [creatorId, setCreatorId] = useState(null);


    useEffect(() => {
        dogsService.getAllBuy()
            .then(res => setDogs(res))
    }, [])

    return (
        <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} exit={{ width: '100%', transition: { duration: 0.3 } }}>
            <section className='adopt-buy-section-container'>
                <p>Buy a dog</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
            </section>
            <section className='adopt-buy-catalog-container'>
                {dogs.length === 0 && <LinearColor />}

                {dogs.length !== 0 &&
                    dogs.map(el => <Dog type="buy" currentDog={el} key={el.id}
                        setCurrentDog={setCurrentDog} setSelectedId={setSelectedId} setCreatorId={setCreatorId} />)
                }

                {selectedId && currentDog &&
                    <DogFlyer state={{ setSelectedId, setCurrentDog, currentDog, selectedId, creatorId }} />
                }
            </section>
        </motion.div>
    )
}