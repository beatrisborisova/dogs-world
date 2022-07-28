import './Home.css';
import { getDogImage } from '../../services/dogs';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Home = () => {

    const [dogImg, setDogImg] = useState('');

    useEffect(() => {
        setTimeout(() => {
            getDogImage()
                .then(img => setDogImg(img))
        }, 3000)
    }, [dogImg])

    return (
        <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} exit={{ width: '100%', transition: { duration: 0.3 } }}>
            <div className="home-container" style={{ backgroundImage: `url(${dogImg})` }}>
                <div className='home-content'>
                    <h1>Welcome to the DOGS World</h1>
                    <NavLink to={'catalog'} className="btn-level-one">EXPLORE</NavLink>
                </div>
            </div>
            <section className='home-categories-container'>
                <NavLink to={'/catalog/adopt'} className='home-adopt-container home-article'>
                    <article>
                        <h3>Adopt a dog</h3>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. </p>
                    </article>
                </NavLink>
                <NavLink to={'/catalog/buy'} className='home-buy-container home-article'>
                    <article>
                        <h3>Buy a dog</h3>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. </p>
                    </article>
                </NavLink>
                <NavLink to={'/create'} className='home-create-container home-article'>
                    <article>
                        <h3>Post a dog</h3>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. </p>
                    </article>
                </NavLink>
            </section>
        </motion.div>

    )
}