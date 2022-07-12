import { getDogImage } from '../../services/dogs';
import { useEffect, useState } from 'react';
import './Home.css';
import { NavLink } from 'react-router-dom';

export const Home = () => {

    const [dogImg, setDogImg] = useState('');

    useEffect(() => {
        setTimeout(() => {
            getDogImage()
                .then(img => setDogImg(img))
        }, 3000)
    }, [dogImg])

    return (
        <div className="home-container" style={{ backgroundImage: `url(${dogImg})` }}>
            <div className='home-content'>
                Welcome to the DOGS World
                {/* Линк към страницата, от която се избира към осиновяване или към купуване страницата */}
                <NavLink to={'catalog'} className="btn-level-one">EXPLORE</NavLink>
            </div>
        </div>
    )
}