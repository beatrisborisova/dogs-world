import './Dog.css';
import { motion } from "framer-motion"
import { useContext } from 'react';
import DogContext from '../../../../contexts/Dog';
import { useSelector } from 'react-redux';

export const Dog = ({ currentDog, dogId, setCurrentDog, setSelectedId }) => {

    const stateDog = useSelector(states => states.dog.value.payload)


    return (
        <motion.div className={`dog-container ${stateDog.dog.type}-dog-container dog-modal`}
            onClick={() => {
                setSelectedId(stateDog.id)
                setCurrentDog(stateDog.dog)
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
    )
}