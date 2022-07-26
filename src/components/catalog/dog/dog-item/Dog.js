import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { storage } from '../../../../firebase';
import './Dog.css';

export const Dog = (props) => {

    const dog = props.dog.dog;
    const imageListRef = ref(storage, 'dogs');

    const [imageList, setImageList] = useState([]);

    useEffect(() => {
        listAll(imageListRef)
            .then(res => {
                res.items.forEach(item => {
                    if (item.name.includes(props.dog.id)) {
                        getDownloadURL(item)
                            .then(url => setImageList(state => [...state, url]))
                        return
                    }
                })
            })
    }, [])

    return (
        <article className={`dog-container ${dog.type}-dog-container`}>
            <div className='image-wrapper-dog-main'>
                <img src={imageList[0]} alt={dog.breed} />
            </div>
            <h4>{dog.breed}</h4>
            <p>{dog.gender}</p>
            <p>{dog.age}</p>
            <NavLink to={`/catalog/${dog.type}/${props.dog.id}`} className="btn-level-two">Details</NavLink>
        </article>
    )
}