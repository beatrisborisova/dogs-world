import {
    getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut
} from 'firebase/auth';

import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { app, database } from '../firebase';

const auth = getAuth(app);
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

const login = async (email, password) => {
    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        let myUser;
        const querySnapshot = await getDocs(collection(database, "users"));
        querySnapshot.forEach((doc) => {
            // console.log('doc.data().id', doc.data().uid);
            // console.log('user.uid', user.user.uid);
            if (doc.data().uid === user.user.uid) {
                myUser = {
                    uid: doc.id,
                    user: doc.data()
                }
            }
        });
        sessionStorage.setItem('currentUserId', myUser.uid)
        toast.success("Successfully logged in", toastSettings)
        return myUser;
    } catch (err) {
        toast.error("Unsuccessful login", toastSettings)
    }
};

const register = async ({ email, password, name, avatar, city, gender }) => {
    console.log('{ email, password, name, avatar, city, gender }', { email, password, name, avatar, city, gender });
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        console.log('user', user);
        const myUser = {
            email,
            name,
            avatar,
            city,
            gender,
            uid: user.uid
        }
        const docRef = doc(database, "users", user.uid);
        await setDoc(docRef, { myUser, uid: docRef.id });
        sessionStorage.setItem('currentUserId', docRef.id)
        console.log('myUser', myUser);
        toast.success("Successfully registered", toastSettings)
        return { myUser, docRef };
        // return myUser;
    } catch (err) {
        toast.error("Unsuccessful register", toastSettings)
    }
};

const logout = () => {
    signOut(auth);
    toast.success("Successfully logged out", toastSettings)
    sessionStorage.removeItem('currentUserId')
};

const getUser = () => {
    return sessionStorage.getItem('currentUserId')
}

const getUserData = async (userId) => {
    try {
        let myUser;
        const querySnapshot = await getDocs(collection(database, "users"));
        querySnapshot.forEach((doc) => {
            console.log('doc.id.uid ', doc.id);
            console.log('userId.uid', userId);
            if (doc.id === userId) {
                myUser = {
                    uid: doc.id,
                    user: doc.data()
                }
            }
        });
        return myUser;
    } catch (err) {
        toast.error("Unsuccessful request", toastSettings)
        throw new Error('No user with this ID');
    }
}


const editProfile = async (user, userId) => {
    try {
        const docRef = doc(database, "users", userId);
        // const editedUser = user;
        const editedUser = {
            myUser: {
                email: user.email,
                name: user.name,
                avatar: user.avatar,
                city: user.city,
                gender: user.gender,
                uid: user.uid
            },
            uid: user.uid
        }
        // const docRef = doc(database, "users", user.uid);
        // await setDoc(docRef, { myUser, uid: docRef.id });
        sessionStorage.setItem('currentUserId', docRef.id)
        await setDoc(docRef, editedUser);
        // return docRef;
        toast.success("Profile edited successfully", toastSettings)
        return { editedUser, docRef };
    } catch (err) {
        toast.error("Unsuccessful edit", toastSettings)
        throw new Error('Cannot edit entry with ID: ', userId)
    }
}

export {
    auth,
    login,
    register,
    logout,
    getUser,
    getUserData,
    editProfile
};