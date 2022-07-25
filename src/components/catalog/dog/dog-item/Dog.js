import { NavLink } from 'react-router-dom';
import './Dog.css';

export const Dog = (props) => {

    return (
        <article className={`dog-container ${props.dog.type}-dog-container`}>
            <div className='image-wrapper-dog-main'>
                <img src='https://kb.rspca.org.au/wp-content/uploads/2018/11/golder-retriever-puppy.jpeg' alt={props.dog.breed} />
            </div>
            <h4>{props.dog.breed}</h4>
            <p>{props.dog.gender}</p>
            <p>{props.dog.age}</p>
            <NavLink to={`/catalog/${props.dog.type}/${props.dog.id}`} className="btn-level-two">Details</NavLink>
        </article>
    )
}