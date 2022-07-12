import { getDogImage } from '../../services/dogs';
import { useEffect, useState } from 'react';
import './Home.css';

export const Home = () => {

    const [dogImg, setDogImg] = useState('');

    useEffect(() => {
        getDogImage()
            .then(img => setDogImg(img))
    }, [])

    return (
        <div className="home-container" style={{ backgroundImage: `url(${dogImg})` }}>
            <div  className='home-content'>
                Welcome to the DOGS World
                {/* Линк към страницата, от която се избира към осиновяване или към купуване страницата */}
                <a href="#">Exlore</a>
            </div>
        </div>
    )
}