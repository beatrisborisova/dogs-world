import './Dog.css';
import { motion } from "framer-motion"

export const Dog = ({ currentDog, setCurrentDog, setSelectedId }) => {

    const dog = currentDog.dog;

    console.log('dog', dog);

    console.log('currentDog.id', currentDog.dog);

    // от myDogs.js идва като currentDog.dog.dog, а от Adopt.js идва currentDog.dog

    return (
        <motion.div className={`dog-container ${dog.type}-dog-container dog-modal`}
            onClick={() => {
                setSelectedId(currentDog.id)
                setCurrentDog(currentDog)
            }}
            animate={{ scale: 1, opacity: 1 }}
            initial={{ scale: 0.7, opacity: 0 }}>
            <motion.div>
                <motion.div className='image-wrapper-dog-main'>
                    <motion.img src={dog.uploadImg} key={dog.uploadImg} />
                </motion.div>
                <motion.h2>{dog.breed}</motion.h2>
                <motion.p><b>Gender:</b> {dog.gender}</motion.p>
            </motion.div>
        </motion.div>
    )
}