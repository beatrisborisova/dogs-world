import './Catalog.css';
import { NavLink } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';

export const Main = () => {
    return (
        <section className='main-section'>
            <div className='main-section-content'>
                <article className='main-adopt-article main-article'>
                    <h2>Adopt a dog</h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.</p>
                    <Carousel className="main-carousel">
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://ichef.bbci.co.uk/news/976/cpsprodpb/17638/production/_124800859_gettyimages-817514614.jpg"
                                alt="First slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://ggsc.s3.amazonaws.com/images/uploads/The_Science-Backed_Benefits_of_Being_a_Dog_Owner.jpg"
                                alt="Second slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://i.ytimg.com/vi/MPV2METPeJU/maxresdefault.jpg"
                                alt="Third slide"
                            />
                        </Carousel.Item>
                    </Carousel>
                    <NavLink to={'/catalog/adopt'} className="btn-level-two">GO</NavLink>
                </article>
                <article className='main-buy-article main-article'>
                    <h2>Buy a dog</h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.</p>
                    <Carousel className="main-carousel">
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://ichef.bbci.co.uk/news/976/cpsprodpb/17638/production/_124800859_gettyimages-817514614.jpg"
                                alt="First slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://ggsc.s3.amazonaws.com/images/uploads/The_Science-Backed_Benefits_of_Being_a_Dog_Owner.jpg"
                                alt="Second slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://i.ytimg.com/vi/MPV2METPeJU/maxresdefault.jpg"
                                alt="Third slide"
                            />
                        </Carousel.Item>
                    </Carousel>
                    <NavLink to={'/catalog/buy'} className="btn-level-two">GO</NavLink>
                </article>
            </div>
        </section>
    )
}