import { NavLink } from 'react-router-dom';
import './Catalog.css';

export const Main = () => {
    return (
        <section className='main-section'>
            <article className='main-adopt-article main-article'>
                <h2>Adopt a dog</h2>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.</p>
                <NavLink to={'/catalog/adopt'} className="btn-level-two">GO</NavLink>
            </article>
            <article className='main-buy-article main-article'>
                <h2>Buy a dog</h2>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.</p>
                <NavLink to={'/catalog/buy'} className="btn-level-two">GO</NavLink>
            </article>
        </section>
    )
}