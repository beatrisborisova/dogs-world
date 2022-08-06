import styles from './Dog.module.css';
import { motion } from "framer-motion"
import { useDispatch, useSelector } from 'react-redux';
import { setDog } from '../../../../features/dogs';

export const Dog = ({ currentDog, dogId, creatorId, setCurrentDog, setSelectedId, setCreatorId }) => {


    const stateDog = useSelector(states => states.dog.value.payload)
    const dispatch = useDispatch();

    return (
        <>
            {stateDog &&
                // <motion.div className={[styles.dogContainer, styles.{stateDog.dog.type}DogContainer, styles.dogModal]}
                <motion.div className={[styles.dogContainer]}
                    onClick={() => {
                        setSelectedId(stateDog.id)
                        setCurrentDog(stateDog.dog)
                        setCreatorId(creatorId)
                    }}
                    animate={{ scale: 1, opacity: 1 }}
                    initial={{ scale: 0.7, opacity: 0 }}>
                    <motion.div>
                        <motion.div className={styles.imageWrapperDogMain}>
                            <motion.img src={stateDog.dog.uploadImg} key={stateDog.dog.uploadImg} />
                        </motion.div>
                        <motion.h2>{stateDog.dog.breed}</motion.h2>
                        <motion.p><b>Gender:</b> {stateDog.dog.gender}</motion.p>
                    </motion.div>
                </motion.div>
            }

            {!stateDog &&
                // <motion.div className={`dog-container ${currentDog.type}-dog-container dog-modal`}
                <motion.div className={[styles.dogContainer]}

                    onClick={() => {
                        setSelectedId(dogId)
                        setCurrentDog(currentDog)
                        setCreatorId(creatorId)
                        // dispatch(setDog({ payload: { dog: currentDog, id: currentDog.id, creatorId: currentDog.creatorId }, type: 'SET DOG' }))
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
            }
        </>
    )
}