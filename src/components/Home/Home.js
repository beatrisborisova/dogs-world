import './Home.css';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
const video = require('../../assets/images/home.mp4');

export const Home = () => {

    return (
        <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} exit={{ width: '100%', transition: { duration: 0.3 } }}>
            <div className="home-container" >
                <div className='home-content'>
                    <div className='home-text'>
                        <h1>Welcome to Dogland</h1>
                        <NavLink to={'catalog'} className="btn-level-one">EXPLORE</NavLink>
                    </div>
                    <div className='home-image-wrapper'>
                        <video width="100%" autoPlay muted className='home-video'>
                            <source src={video} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
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
        </motion.div >

    )
}