import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { database } from '../firebase';
import { getUser } from "./user";

function getDogImage() {
    return fetch('https://dog.ceo/api/breeds/image/random')
        .then(res => res.json())
        .then(img => img.message)
        .catch(err => { throw new Error('Cannot get dog image') })
}


const getAllDogs = async () => {
    try {
        const querySnapshot = await getDocs(collection(database, "dogs"));
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
        });
    } catch (err) {
        throw new Error('Cannot get all dogs');
    }
}

const getAllAdopt = async () => {
    try {
        const querySnapshot = await getDocs(collection(database, "adopt"));
        let results = [];
        querySnapshot.forEach((doc) => {
            // console.log(`${doc.id} => ${doc.data()}`);
            results.push([doc.id, doc.data()])
        });
        return results.map(([id, v]) => Object.assign({}, { id }, v));
    } catch (err) {
        throw new Error('Cannot get all ADOPT dogs');
    }
}

const getAllBuy = async () => {
    try {
        const querySnapshot = await getDocs(collection(database, "dogs"));
        let results = [];
        querySnapshot.forEach((doc) => {
            // console.log(`${doc.id} => ${doc.data()}`);
            results.push([doc.id, doc.data()])
        });
        return results.map(([id, v]) => Object.assign({}, { id }, v));
    } catch (err) {
        throw new Error('Cannot get all BUY dogs');
    }
}

const getDogById = async (dogId) => {
    try {
        let dog;
        const querySnapshot = await getDocs(collection(database, "dogs"));
        querySnapshot.forEach((doc) => {
            if (doc.id === dogId) {
                dog = {
                    id: doc.id,
                    dog: doc.data()
                }
            }
        });
        return dog;
    } catch (err) {
        throw new Error('No item with this ID');
    }
}

const getMyDogs = async (userId) => {
    try {
        let dogs = [];
        const querySnapshot = await getDocs(collection(database, "dogs"));
        querySnapshot.forEach((doc) => {
            if (doc.data().creatorId === userId) {
                dogs.push({ id: doc.id, dog: doc.data() })
            }
        });
        return dogs;
    } catch (err) {
        throw new Error('No items owned by user with ID: ', userId)
    }
}

const createDog = async (dog) => {
    let docRef;
    try {
        if (dog.type === 'adopt') {
            docRef = await addDoc(collection(database, "adopt"), {
                dog,
                creatorId: getUser()
            });
        } else if (dog.type === 'buy') {
            docRef = await addDoc(collection(database, "buy"), {
                dog,
                creatorId: getUser()
            });
        }

        await setDoc(doc(database, "dogs", docRef.id), {
            dog,
            creatorId: getUser()
        });
        console.log('Document written with ID: ', docRef.id);
        return docRef;

    } catch (err) {
        throw new Error('Cannot create entry');
    }
}

const editDog = async (dogId, dog) => {

    try {
        const docRef = doc(database, "dogs", dogId);
        const editedDog = {
            creatorId: getUser(),
            dog
        }
        await setDoc(docRef, editedDog);

        if (dog.type === 'adopt') {
            const docRef = doc(database, "adopt", dogId);
            await setDoc(docRef, editedDog);
        } else if (dog.type === 'buy') {
            const docRef = doc(database, "buy", dogId);
            await setDoc(docRef, editedDog);
        }

        return docRef;
    } catch (err) {
        throw new Error('Cannot delete entry with ID: ', dog.id)
    }
}

const deleteDog = async (dogId, dog) => {
    try {
        await deleteDoc(doc(database, "dogs", dogId));

        if (dog.type === 'adopt') {
            await deleteDoc(doc(database, "adopt", dogId));
        } else if (dog.type === 'buy') {
            await deleteDoc(doc(database, "buy", dogId));
        }
    } catch (err) {
        throw new Error('Cannot delete entry with ID: ', dog.id)
    }

}

export {
    getDogImage,
    getAllDogs,
    getAllAdopt,
    getAllBuy,
    getDogById,
    getMyDogs,
    createDog,
    editDog,
    deleteDog
}