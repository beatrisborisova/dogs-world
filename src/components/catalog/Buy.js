import './Catalog.css';
import { Dog } from './dog/dog-item/Dog';

export const Buy = () => {
    return (
        <>
            <section className='adopt-buy-section-container'>
                <p>Buy a dog</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
            </section>
            <section className='adopt-buy-catalog-container'>
                <Dog type={'buy'} />
                <Dog type={'buy'} />
                <Dog type={'buy'} />
                <Dog type={'buy'} />
                <Dog type={'buy'} />
                <Dog type={'buy'} />
                <Dog type={'buy'} />
            </section>
        </>
    )
}