import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { app, database } from '../firebase';
import { getDatabase, ref, child, get } from "firebase/database";

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

const getAllAdopt = async () => {
    const querySnapshot = await getDocs(collection(database, "adopt"));
    let results = [];
    querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data()}`);
        results.push([doc.id, doc.data().dog])
    });
    return results.map(([id, v]) => Object.assign({}, { id }, v));
}

const getAllBuy = async () => {
    const querySnapshot = await getDocs(collection(database, "dogs/buy"));
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });
}

const getDogById = async (dogId) => {
    let dog;

    const querySnapshot = await getDocs(collection(database, "dogs"));
    querySnapshot.forEach((doc) => {
        if (doc.id === dogId) {
            dog = doc.data()
        }
    });
    return dog;
}

const createDog = async (dog) => {
    let docRef;
    try {
        if (dog.type === 'adopt') {
            docRef = await addDoc(collection(database, "adopt"), {
                dog,
                // creator: sessionStorage.currentUserId
                //тука е по-добре да се ползва currentUser от firebase getAuth() (кода го има в DogDetails.js)
            });
            console.log('docRef.id', docRef.id);
        } else if (dog.type === 'buy') {
            docRef = await addDoc(collection(database, "buy"), {
                dog,
                // creator: sessionStorage.currentUserId
                //тука е по-добре да се ползва currentUser от firebase getAuth() (кода го има в DogDetails.js)
            });
        }


        await setDoc(doc(database, "dogs", docRef.id), {
            dog,
            // creator: sessionStorage.currentUserId
            //тука е по-добре да се ползва currentUser от firebase getAuth() (кода го има в DogDetails.js)
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
    getAllAdopt,
    getAllBuy,
    getDogById,
    createDog,
    editDog,
    deleteDog
}