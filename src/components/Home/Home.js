import styles from './Home.module.css';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
const video = require('../../assets/images/home.mp4');

export const Home = () => {

    return (
        <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} exit={{ width: '100%', transition: { duration: 0.3 } }}>
            <div className={styles.homeContainer}>
                <div className={styles.homeContent}>
                    <div className={styles.homeText}>
                        <h1>Welcome to Dogland</h1>
                        <NavLink to={'catalog'} className="btn-level-one">EXPLORE</NavLink>
                    </div>
                    {video &&
                        <video width="100%" autoPlay muted className={styles.homeVideo}>
                            <source src={video} type="video/mp4" />
                        </video>
                    }
                </div>
            </div>
            <section className={styles.homeCategoriesContainer}>
                <NavLink to={'/catalog/adopt'} className={[styles.homeAdoptContainer, styles.homeArticle].join(' ')}>
                    <article>
                        <h3>Adopt a dog</h3>
                        <p>If you're here to adopt a dog, click here</p>
                    </article>
                </NavLink>
                <NavLink to={'/catalog/buy'} className={[styles.homeBuyContainer, styles.homeArticle].join(' ')}>
                    <article>
                        <h3>Buy a dog</h3>
                        <p>If you're here to buy a dog, click here</p>
                    </article>
                </NavLink>
                <NavLink to={'/create'} className={[styles.homeCreateContainer, styles.homeArticle].join(' ')}>
                    <article>
                        <h3>Post a dog</h3>
                        <p>If you're here to post a dog offer, click here</p>
                    </article>
                </NavLink>
            </section>
        </motion.div >

    )
}