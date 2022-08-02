import styles from './NotFound.module.css';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {

    const navigate = useNavigate();

    return (
        <div className={styles.notFoundContainer}>
            <div className={styles.notFoundContent}>
                <h1>404</h1>
                <h2>Page not found</h2>
                <p className={styles.text}>The page you are looking for does not exist</p>
            </div>
            <button onClick={() => navigate('/')} className='btn-level-one'>Go to home</button>
        </div>
    )
}