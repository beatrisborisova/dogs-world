import './Dog.css';
import { motion } from "framer-motion"
import { useDispatch, useSelector } from 'react-redux';
import { setDog } from '../../../../features/dogs';

export const Dog = ({ currentDog, dogId, creatorId, setCurrentDog, setSelectedId, setCreatorId }) => {


    const stateDog = useSelector(states => states.dog.value.payload)
    console.log('creatorId', creatorId);
    const dispatch = useDispatch();

    return (
        <>
            {stateDog &&
                <motion.div className={`dog-container ${stateDog.dog.type}-dog-container dog-modal`}
                    onClick={() => {
                        setSelectedId(stateDog.id)
                        setCurrentDog(stateDog.dog)
                        setCreatorId(creatorId)
                    }}
                    animate={{ scale: 1, opacity: 1 }}
                    initial={{ scale: 0.7, opacity: 0 }}>
                    <motion.div>
                        <motion.div className='image-wrapper-dog-main'>
                            <motion.img src={stateDog.dog.uploadImg} key={stateDog.dog.uploadImg} />
                        </motion.div>
                        <motion.h2>{stateDog.dog.breed}</motion.h2>
                        <motion.p><b>Gender:</b> {stateDog.dog.gender}</motion.p>
                    </motion.div>
                </motion.div>
            }

            {!stateDog &&
                <motion.div className={`dog-container ${currentDog.type}-dog-container dog-modal`}
                    onClick={() => {
                        setSelectedId(dogId)
                        setCurrentDog(currentDog)
                        setCreatorId(creatorId)
                        // dispatch(setDog({ payload: { dog: currentDog, id: currentDog.id, creatorId: currentDog.creatorId }, type: 'SET DOG' }))
                    }}
                    animate={{ scale: 1, opacity: 1 }}
                    initial={{ scale: 0.7, opacity: 0 }}>
                    <motion.div>
                        {console.log('from Dog.js', creatorId)}
                        <motion.div className='image-wrapper-dog-main'>
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