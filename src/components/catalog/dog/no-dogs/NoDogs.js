import styles from './NoDogs.module.css';

export const NoDogs = () => {
    return (
        <div className={styles.noDogsContainer}>
            <h1>Unfortunately there are no dogs in database</h1>
            <h3>Create the first dog</h3>
            <button className='btn-level-two'>Go</button>
        </div>
    )
}