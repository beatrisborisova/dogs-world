import './Catalog.css';
import { Dog } from './dog/Dog';

export const Adopt = () => {
    return (
        <>
            <section className='adopt-buy-section-container'>
                <p>Adopt a dog</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
            </section>
            <section className='adopt-buy-catalog-container'>
                <Dog />
                <Dog />
                <Dog />
                <Dog />
                <Dog />
                <Dog />
                <Dog />

            </section>
        </>
    )
}