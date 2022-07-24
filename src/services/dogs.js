import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
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

const getAllAdopt = async () => {
    const querySnapshot = await getDocs(collection(database, "adopt"));
    let results = [];
    querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data()}`);
        results.push([doc.id, doc.data()])
    });
    return results.map(([id, v]) => Object.assign({}, { id }, v));
}

const getAllBuy = async () => {
    const querySnapshot = await getDocs(collection(database, "dogs"));
    let results = [];
    querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data()}`);
        results.push([doc.id, doc.data()])
    });
    return results.map(([id, v]) => Object.assign({}, { id }, v));
}

const getDogById = async (dogId) => {
    try {
        let dog;
        const querySnapshot = await getDocs(collection(database, "dogs"));
        querySnapshot.forEach((doc) => {
            if (doc.id === dogId) {
                dog = doc.data()
            }
        });
        return dog;
    } catch (err) {
        throw new Error('No item with this ID')
    }
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
    await setDoc(docRef, dog);

    if (dog.type.toLowerCase() === 'adopt') {
        const docRef = doc(database, "adopt", dogId);
        await setDoc(docRef, dog);
    } else if (dog.type.toLowerCase() === 'buy') {
        const docRef = doc(database, "buy", dogId);
        await setDoc(docRef, dog);
    }
}

const deleteDog = async (dogId, dog) => {
    await deleteDoc(doc(database, "dogs", dogId));

    if (dog.type === 'adopt') {
        await deleteDoc(doc(database, "adopt", dogId));
    } else if (dog.type === 'buy') {
        await deleteDoc(doc(database, "buy", dogId));
    }
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