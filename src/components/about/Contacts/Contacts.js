import styles from './Contacts.module.css';
import { motion } from 'framer-motion';

const Contacts = () => {
    return (
        <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} exit={{ width: '100%', transition: { duration: 0.3 } }}>
            <h2>Contacts</h2>
            <h4>About</h4>
            <div className={styles.softuniImageWrapper}>
                <img src={require('../../../assets/images/softuni-logo.png')} alt='softuni' />
            </div>
            <p>Handcrafter by me, <a href='https://github.com/beatrisborisova'>Beatris Borisova</a></p>
            <div className={styles.aboutText}>
                <p>This is a project for the React.js course at Software University</p>
                <h3>Technologies used:</h3>
                <ul>
                    <li>React.js 18.2.0</li>
                    <li>React Redux 8.0.2</li>
                    <li>Firebase 9.9.0</li>
                    <li>React Bootstrap 2.4.0</li>
                    <li>Font Awesome 6.1.1</li>
                    <li>Material UI 5.9.2</li>
                    <li>Framer Motion 6.5.1</li>
                    <li>React Paginate 8.1.3</li>
                    <li>React Toastify 9.0.7</li>
                </ul>
            </div>
        </motion.div>
    )
}

export default Contacts;