import { NavLink } from 'react-router-dom';
import './Dog.css';

export const Dog = (props) => {

    const dog = props.dog.dog;

    console.log('dog edit -> details', props.dog);
    console.log('dog', dog);

    return (
        <article className={`dog-container ${dog.type}-dog-container`}>
            <div className='image-wrapper-dog-main'>
                <img src='https://kb.rspca.org.au/wp-content/uploads/2018/11/golder-retriever-puppy.jpeg' alt={dog.breed} />
            </div>
            <h4>{dog.breed}</h4>
            <p>{dog.gender}</p>
            <p>{dog.age}</p>
            <NavLink to={`/catalog/${dog.type}/${props.dog.id}`} className="btn-level-two">Details</NavLink>
        </article>
    )
}