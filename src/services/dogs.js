import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { database } from '../firebase';

function getDogImage() {
    return fetch('https://dog.ceo/api/breeds/image/random')
        .then(res => res.json())
        .then(img => img.message)
        .catch(err => console.log(err.message))
}


const getAllDogs = async () => {
    const querySnapshot = await getDocs(collection(database, "dogs"));
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });
}

const getDogById = async (dogId) => {
    const querySnapshot = await getDocs(collection(database, "dogs"));
    let dog;
    querySnapshot.forEach(el => {
        if (el.id === dogId) {
            dog = el.data();
        }
    })
    return dog
}

const createDog = async (dog) => {
    try {
        const docRef = await addDoc(collection(database, "dogs"), {
            dog,
            crator: sessionStorage.currentUserId
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

const editDog = async (dogId, dog) => {
    const docRef = doc(database, "dogs", dogId);
    await updateDoc(docRef, dog);
}

const deleteDog = async (dogId) => {
    await deleteDoc(doc(database, "dogs", dogId));
}

export {
    getDogImage,
    getAllDogs,
    getDogById,
    createDog,
    editDog,
    deleteDog
}