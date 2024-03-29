import styles from './DogFlyer.module.css';
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { removeDog, setDog } from '../../../../features/dogs';

export const DogFlyer = ({ state }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentDog = state.currentDog;
    const dogId = state.selectedId;


    return (
        <motion.div className={styles.dogContentContainer}
            animate={state.setSelectedId ? { opacity: 1 } : { opacity: 0 }}>
            <div className={styles.dogContent}>
                <motion.div key={state.currentDog.id}>
                    <motion.h4><b>Breed:</b> {currentDog.breed}</motion.h4>
                    <motion.div className={styles.imageWrapperDogMain}>
                        <motion.img src={currentDog.uploadImg} alt='dog' />
                    </motion.div>
                    <motion.p><b>Age:</b> {currentDog.age}</motion.p>
                    <motion.p><b>Gender:</b> {currentDog.gender}</motion.p>
                    <motion.button onClick={() => {
                        state.setSelectedId(null)
                        dispatch(removeDog())
                    }} className="btn-level-two close">CLOSE</motion.button>
                    <motion.button onClick={() => {
                        navigate(`/catalog/${currentDog.type}/${dogId}`, { state: { currentDog, dogId } });
                        dispatch(setDog({ payload: { dog: currentDog, id: dogId, creatorId: state.creatorId }, type: 'SET DOG' }));
                    }} className="btn-level-two">More details</motion.button>
                </motion.div>
            </div >
        </motion.div >
    )
}