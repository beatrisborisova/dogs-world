import styles from './NoDogs.module.css';
import { Link } from 'react-router-dom';

export const NoDogs = () => {
    return (
        <div className={styles.noDogsContainer}>
            <h1>Unfortunately there are no dogs found</h1>
            <h3>Add a dog</h3>
            <Link to={'/create'} className='btn-level-two'>Go</Link>
        </div>
    )
}