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
                    <motion.img src={currentDog.dog.uploadImg} key={currentDog.dog.uploadImg} />
                </motion.div>
                <motion.h2>{currentDog.dog.breed}</motion.h2>
                <motion.p><b>Gender:</b> {currentDog.dog.gender}</motion.p>
            </motion.div>
        </motion.div>
    )
}