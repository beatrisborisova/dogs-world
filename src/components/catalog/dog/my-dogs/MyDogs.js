import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { removeDog } from "../../../../features/dogs";
import * as dogsService from '../../../../services/dogs';
import * as userService from '../../../../services/user';
import LinearColor from "../../../others/Linear";
import { DogFlyer } from "../dog-flyer/DogFlyer";
import { Dog } from "../dog-item/Dog";

export const MyDogs = () => {

    const [myDogs, setMyDogs] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [currentDog, setCurrentDog] = useState(null);
    const [creatorId, setCreatorId] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        const userId = userService.getUser();
        dogsService.getMyDogs(userId)
            .then(res => {
                setMyDogs(res)
                dispatch(removeDog());
            })
    }, [])

    console.log('myDogs', myDogs)
    console.log('selectedId', selectedId);

    return (
        <section className='adopt-buy-catalog-container'>

            {/* TODO: тука трябва да се сложи тоя loader да не зарежда до безкрай, а в един момент да изписва, че няма добавени кучета на тоя потребители */}

            {myDogs.length === 0 && <LinearColor />}

            {myDogs.length !== 0 &&
                myDogs.map(el => <Dog currentDog={el.dog} dogId={el.id} key={el.id} creatorId={el.creatorId}
                    setCurrentDog={setCurrentDog} setSelectedId={setSelectedId} setCreatorId={setCreatorId} />)
            }

            {selectedId && currentDog &&
                <DogFlyer state={{ setSelectedId, setCurrentDog, currentDog, selectedId, creatorId }} />
            }
        </section>
    )
} 