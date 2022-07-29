import './DogDetails.css';
import * as dogsService from '../../../../services/dogs';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AlertDialog from '../../../others/Confirmation';
import LinearColor from '../../../others/Linear';
import { useSelector } from 'react-redux';

export const DogDetails = () => {

    const dogId = useParams().id;
    const [dog, setDog] = useState(null);
    const [open, setOpen] = useState(false);
    const [agree, setAgree] = useState(false);
    const [isCreator, setIsCreator] = useState(false);
    const user = useSelector(states => states.user.value.payload);
    const stateDog = useSelector(states => states.dog.value.payload)

    const navigate = useNavigate();

    useEffect(() => {
        dogsService.getDogById(dogId)
            .then(res => setDog(res))
            .catch(err => console.log(err.messag))
    }, [])


    useEffect(() => {
        if (dog) {
            if (user.uid === dog.dog.creatorId) {
                setIsCreator(true)
            }
        }
    }, [user.uid, stateDog, dog])


    if (agree) {
        dogsService.deleteDog(dogId, dog)
            .then(() => {
                navigate(`/catalog/${dog.type}`)
                setOpen(false)
            })
            .catch((err) => console.log(err.message))
    }

    return (
        <div className='dog-details-container'>
            {open && <AlertDialog state={{ setOpen, setAgree }} />}

            {dog && <>
                <div className="image-wrapper-dog-details">
                    <img src={dog.dog.uploadImg} alt="dog" />
                </div>
                <div className="dog-details-text">
                    <h2>{dog.dog.breed}</h2>
                    <p>Age: {dog.dog.age} years old</p>
                    <p>Паспорт: ДА / NE</p>
                    <p>Vacciness: {dog.dog.vaccines}</p>
                    <p>{dog.dog.description}</p>
                </div>
                {isCreator &&
                    <>
                        <button onClick={() => navigate(`/edit/${dogId}`, { state: { dogId } })} className="btn-level-two">Edit dog</button>
                        <button onClick={() => setOpen(true)} className="btn-level-two">Delete dog</button>
                    </>
                }
            </>}

            {!dog && <LinearColor />}
        </div>
    )
}