import { NavLink } from 'react-router-dom';
import './Catalog.css';
import { Dog } from './dog/dog-item/Dog';

export const Adopt = () => {
    return (
        <>
            <section className='adopt-buy-section-container'>
                <p>Adopt a dog</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
            </section>
            <section className='adopt-buy-catalog-container'>
                {/* <NavLink to={'/catalog/dog/:id'}><Dog type={'adopt'}/></NavLink> */}
                <NavLink to={'/'}><Dog type={'adopt'}/></NavLink>
                <Dog type={'adopt'}/>
                <Dog type={'adopt'}/>
                <Dog type={'adopt'}/>
                <Dog type={'adopt'}/>
                <Dog type={'adopt'}/>
                <Dog type={'adopt'}/>

            </section>
        </>
    )
}