import { addDoc, collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { database } from '../firebase';
import { getUser } from "./user";
import { toast } from 'react-toastify';

const toastSettings = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored'
}

const getDogImage = () => {
    return fetch('https://dog.ceo/api/breeds/image/random')
        .then(res => res.json())
        // .then(img => img.message)
        .catch(err => { throw new Error('Cannot get dog image') })
}


const getAllDogs = async () => {
    try {
        const querySnapshot = await getDocs(collection(database, "dogs"));
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
        });
    } catch (err) {
        toast.error("Cannot open catalog", toastSettings)
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
        toast.error("Cannot open adopt catalog", toastSettings)
        throw new Error('Cannot get all ADOPT dogs');
    }
}

const getAllBuy = async () => {
    try {
        const querySnapshot = await getDocs(collection(database, "buy"));
        let results = [];
        querySnapshot.forEach((doc) => {
            // console.log(`${doc.id} => ${doc.data()}`);
            results.push([doc.id, doc.data()])
        });
        return results.map(([id, v]) => Object.assign({}, { id }, v));
    } catch (err) {
        toast.error("Cannot open buy catalog", toastSettings)
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
                    dog: doc.data(),
                    comments: doc.data().comments
                }
            }
        });

        return dog;
    } catch (err) {
        toast.error("Cannot find item with this ID", toastSettings)
        throw new Error('No item with this ID');
    }
}

const getMyDogs = async (userId) => {
    try {
        let dogs = [];
        const querySnapshot = await getDocs(collection(database, "dogs"));
        querySnapshot.forEach((doc) => {
            if (doc.data().creatorId === userId) {
                dogs.push([doc.id, doc.data()])
            }
        });
        return dogs.map(([id, v]) => Object.assign({}, { id }, v));


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
                comments: [],
                creatorId: getUser()
            });
        } else if (dog.type === 'buy') {
            docRef = await addDoc(collection(database, "buy"), {
                dog,
                comments: [],
                creatorId: getUser()
            });
        }

        await setDoc(doc(database, "dogs", docRef.id), {
            dog,
            comments: [],
            creatorId: getUser()
        });
        toast.success("Successfully created dog", toastSettings)
        return docRef;

    } catch (err) {
        toast.error("Cannot create dog", toastSettings)
        throw new Error('Cannot create entry.');
    }
}

const editDog = async (dogId, dog, comments) => {

    try {
        const docRef = doc(database, "dogs", dogId);
        const editedDog = {
            creatorId: getUser(),
            dog,
            comments
        }

        await setDoc(docRef, editedDog);

        if (dog.type === 'adopt') {
            const docRef = doc(database, "adopt", dogId);
            await setDoc(docRef, editedDog);
        } else if (dog.type === 'buy') {
            const docRef = doc(database, "buy", dogId);
            await setDoc(docRef, editedDog);
        }
        toast.success("Successfully edited dog", toastSettings)
        return docRef;
    } catch (err) {
        toast.error("Cannot edit dog", toastSettings)
        throw new Error('Cannot edit entry with ID: ', dog.id)
    }
}

const deleteDog = async (dogId, dog) => {
    try {
        await deleteDoc(doc(database, "dogs", dogId));
        console.log('dog.type', dog);

        if (dog.dog.dog.type === 'adopt') {
            await deleteDoc(doc(database, "adopt", dogId));
        } else if (dog.dog.dog.type === 'buy') {
            await deleteDoc(doc(database, "buy", dogId));
        }

        toast.success("Successfully deleted dog", toastSettings)

    } catch (err) {
        toast.error("Cannot delete dog", toastSettings)
        throw new Error('Cannot delete entry with ID: ', dog.id)
    }

}

const addComment = async (dogId, dog, oldComments, comment) => {
    try {
        const docRef = doc(database, "dogs", dogId);
        const comments = [...oldComments, comment]
        const editedDog = {
            comments
        }
        await updateDoc(docRef, editedDog);

        if (dog.dog.dog.type === 'adopt') {
            const docRef = doc(database, "adopt", dogId);
            await updateDoc(docRef, editedDog);
        } else if (dog.dog.dog.type === 'buy') {
            const docRef = doc(database, "buy", dogId);
            await updateDoc(docRef, editedDog);
        }

        toast.success("Successfully added comment", toastSettings)
        return docRef;
    } catch (err) {
        toast.error("Cannot add comment", toastSettings)
        throw new Error('Cannot edit entry with ID: ', dogId)
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
    deleteDog,
    addComment
}