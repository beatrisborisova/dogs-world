import './DogDetails.css';
import * as dogsService from '../../../../services/dogs';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AlertDialog from '../../../others/Confirmation';
import LinearColor from '../../../others/Linear';
import { useDispatch, useSelector } from 'react-redux';
import { removeDog } from '../../../../features/dogs';

export const DogDetails = () => {

    const dogId = useParams().id;
    const [dog, setDog] = useState(null);
    const [open, setOpen] = useState(false);
    const [agree, setAgree] = useState(false);
    const [isCreator, setIsCreator] = useState(false);

    const user = useSelector(states => states.user.value.payload);

    const stateDog = useSelector(states => states.dog.value.payload)


    const navigate = useNavigate();
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dogsService.getDogById(dogId)
    //         .then(res => setDog(res))
    //         .catch(err => console.log(err.messag))
    // }, [dogId])

    useEffect(() => {
        if (stateDog) {
            if (user.uid === stateDog.creatorId) {
                setIsCreator(true)
            }
        }
    }, [stateDog, user])


    if (agree) {
        dogsService.deleteDog(dogId, dog)
            .then(() => {
                navigate(`/catalog/${stateDog.dog.type}`)
                dispatch(removeDog());
                setOpen(false)
            })
            .catch((err) => console.log(err.message))
    }

    return (
        <div className='dog-details-container'>
            {open && <AlertDialog state={{ setOpen, setAgree }} />}

            {stateDog && <>
                <div className="image-wrapper-dog-details">
                    <img src={stateDog.dog.uploadImg} alt="dog" />
                </div>
                <div className="dog-details-text">
                    <h2>{stateDog.dog.breed}</h2>
                    <p>Age: {stateDog.dog.age} years old</p>
                    <p>Паспорт: ДА / NE</p>
                    <p>Vacciness: {stateDog.dog.vaccines}</p>
                    <p>{stateDog.dog.description}</p>
                </div>
                {isCreator &&
                    <>
                        <button onClick={() => navigate(`/edit/${stateDog.id}`, { state: { id: stateDog.id } })} className="btn-level-two">Edit dog</button>
                        <button onClick={() => setOpen(true)} className="btn-level-two">Delete dog</button>
                    </>
                }
            </>}

            {!stateDog && <LinearColor />}
        </div>
    )
}