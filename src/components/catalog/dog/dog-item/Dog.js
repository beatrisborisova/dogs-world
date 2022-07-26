import './Dog.css';
import { NavLink } from 'react-router-dom';

export const Dog = (props) => {

    const dog = props.dog.dog;

    return (
        <article className={`dog-container ${dog.type}-dog-container`}>
            <div className='image-wrapper-dog-main'>
                <img src={dog.uploadImg} alt={dog.breed} />
            </div>
            <h4>{dog.breed}</h4>
            <p>{dog.gender}</p>
            <p>{dog.age}</p>
            <NavLink to={`/catalog/${dog.type}/${props.dog.id}`} className="btn-level-two">Details</NavLink>
        </article>
    )
}