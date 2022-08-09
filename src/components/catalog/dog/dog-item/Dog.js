import styles from './Dog.module.css';
import { motion } from "framer-motion"
import { useDispatch } from 'react-redux';
import { setDog } from '../../../../features/dogs';

export const Dog = ({ currentDog, dogId, creatorId, setCurrentDog, setSelectedId, setCreatorId }) => {

    const dispatch = useDispatch();

    return (
        <motion.div className={[styles.dogContainer]}
            onClick={() => {
                setSelectedId(dogId)
                setCurrentDog(currentDog)
                setCreatorId(creatorId)
                dispatch(setDog({ payload: { dog: currentDog, id: currentDog.id, creatorId: currentDog.creatorId }, type: 'SET DOG' }))
            }}
            animate={{ scale: 1, opacity: 1 }}
            initial={{ scale: 0.7, opacity: 0 }}>
            <motion.div>
                <motion.div className={styles.imageWrapperDogMain}>
                    <motion.img src={currentDog.uploadImg} key={currentDog.uploadImg} />
                </motion.div>
                <motion.h2>{currentDog.breed}</motion.h2>
                <motion.p><b>Gender:</b> {currentDog.gender}</motion.p>
            </motion.div>
        </motion.div>
    )
}