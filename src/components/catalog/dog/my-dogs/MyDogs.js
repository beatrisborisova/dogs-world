import { useEffect, useState } from "react"
import * as dogsService from '../../../../services/dogs';
import * as userService from '../../../../services/user';
import { Dog } from "../dog-item/Dog";

export const MyDogs = () => {

    const [myDogs, setMyDogs] = useState([]);

    useEffect(() => {
        const userId = userService.getUser();
        dogsService.getMyDogs(userId)
            .then(res => setMyDogs(res))
    }, [])

    console.log('myDogs', myDogs)

    return (
        <section className='adopt-buy-catalog-container'>
            {myDogs && myDogs.map(el => <Dog type="adopt" dog={el.dog} key={el.id} />)}
        </section>
    )
} 