import './DogFlyer.css';
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setDog } from '../../../../features/dogs';


export const DogFlyer = ({ state }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();


    console.log('state from flyer', state);

    const dog = state.currentDog.dog;

    return (
        <motion.div className='dog-content-container'
            animate={state.setSelectedId ? { opacity: 1 } : { opacity: 0 }}>
            <div className='dog-content'>
                <motion.div key={state.currentDog.id}>
                    <motion.h4><b>Breed:</b> {dog.breed}</motion.h4>
                    <motion.div className='image-wrapper-dog-main'>
                        <motion.img src={dog.uploadImg} key={dog.uploadImg} />
                    </motion.div>
                    <motion.p><b>Age:</b> {dog.age}</motion.p>
                    <motion.p><b>Gender:</b> {dog.gender}</motion.p>
                    <motion.button onClick={() => state.setSelectedId(null)} className="btn-level-two close">CLOSE</motion.button>
                    <motion.button onClick={() => {
                        navigate(`${state.currentDog.id}`);
                        dispatch(setDog({ payload: { email: dog, id: state.currentDog.id }, type: 'SET DOG' }));
                    }

                    } className="btn-level-two">More details</motion.button>
                </motion.div>
            </div >
        </motion.div >
    )
}