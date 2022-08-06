import styles from './Cause.module.css';
import { motion } from 'framer-motion';


export const Cause = () => {
    return (
        <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} exit={{ width: '100%', transition: { duration: 0.3 } }}>
            Cause page
        </motion.div>
    )
}