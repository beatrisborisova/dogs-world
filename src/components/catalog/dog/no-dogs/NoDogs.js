import styles from './NoDogs.module.css';
import { Link } from 'react-router-dom';

export const NoDogs = () => {



    return (
        <div className={styles.noDogsContainer}>
            <h1>Unfortunately there are no dogs in database</h1>
            <h3>Create the first dog</h3>
            <Link to={'/create'} className='btn-level-two'>Go</Link>
        </div>
    )
}