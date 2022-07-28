import './Dog.css';
import { motion } from "framer-motion"

export const Dog = ({ type, currentDog, setCurrentDog, setSelectedId }) => {

    return (
        <motion.div className={`dog-container ${type}-dog-container dog-modal`}
            onClick={() => {
                setSelectedId(currentDog.id)
                setCurrentDog(currentDog)
            }}
            animate={{ scale: 1, opacity: 1 }}
            initial={{ scale: 0.7, opacity: 0 }}>
            <motion.div>
                <motion.div className='image-wrapper-dog-main'>
                    <motion.img>{currentDog.dog.image}</motion.img>
                </motion.div>
                <motion.h2>{currentDog.dog.breed}</motion.h2>
                <motion.p>{currentDog.dog.gender}</motion.p>
                <motion.p>{currentDog.dog.age}</motion.p>
            </motion.div>
        </motion.div>
    )
}