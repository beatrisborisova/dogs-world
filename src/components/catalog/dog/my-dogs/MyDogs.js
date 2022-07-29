import { useEffect, useState } from "react"
import * as dogsService from '../../../../services/dogs';
import * as userService from '../../../../services/user';
import LinearColor from "../../../others/Linear";
import { DogFlyer } from "../dog-flyer/DogFlyer";
import { Dog } from "../dog-item/Dog";

export const MyDogs = () => {

    const [myDogs, setMyDogs] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [currentDog, setCurrentDog] = useState(null);

    useEffect(() => {
        const userId = userService.getUser();
        dogsService.getMyDogs(userId)
            .then(res => setMyDogs(res))
    }, [])

    return (
        <section className='adopt-buy-catalog-container'>
            {myDogs.length === 0 && <LinearColor />}

            {myDogs.length !== 0 &&
                myDogs.map(el => <Dog currentDog={el.dog.dog} dogId={el.dog.id} key={el.dog.id} setCurrentDog={setCurrentDog} setSelectedId={setSelectedId} />)
            }

            {selectedId && currentDog &&
                <DogFlyer state={{ setSelectedId, setCurrentDog, currentDog }} />
            }
        </section>
    )
} 