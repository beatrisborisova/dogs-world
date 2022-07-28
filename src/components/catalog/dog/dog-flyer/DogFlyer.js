import './DogFlyer.css';
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom";


export const DogFlyer = ({ state }) => {

    const navigate = useNavigate();

    const dog = state.currentDog.dog;

    return (
        <motion.div className='dog-content-container'
            animate={state.setSelectedId ? { opacity: 1 } : { opacity: 0 }}>
            <div className='dog-content'>
                <motion.div key={state.currentDog.id}>
                    <motion.h4>{dog.breed}</motion.h4>
                    <motion.div className='image-wrapper-dog-main'>
                        <motion.img>{dog.image}</motion.img>
                    </motion.div>
                    <motion.p>{dog.age}</motion.p>
                    <motion.p>{dog.gender}</motion.p>
                    <motion.button onClick={() => state.setSelectedId(null)} className="btn-level-two close">CLOSE</motion.button>
                    <motion.button onClick={() => navigate(`${state.currentDog.id}`)} className="btn-level-two">More details</motion.button>
                </motion.div>
            </div>
        </motion.div>
    )
}