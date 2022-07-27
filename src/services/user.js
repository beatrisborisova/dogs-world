import {
    getAuth, signInWithEmailAndPassword, signInWithPopup,
    GoogleAuthProvider, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut
} from 'firebase/auth';
import { addDoc, collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { app, database } from '../firebase';

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(database, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(database, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const login = async (email, password) => {
    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        // console.log('eserrr', user);
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
        return myUser;
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const register = async ({ email, password, name, avatar, city, gender }) => {
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
        return { myUser, docRef };
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    signOut(auth);
    sessionStorage.removeItem('currentUserId')
};

const getUser = () => {
    return sessionStorage.getItem('currentUserId')
}

const getUserData = async (userId) => {
    try {
        let user;
        const querySnapshot = await getDocs(collection(database, "users"));
        querySnapshot.forEach((doc) => {
            if (doc.id.uid === userId.uid) {
                user = {
                    uid: doc.id,
                    user: doc.data()
                }
            }
        });
        return user;
    } catch (err) {
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
        return docRef;
    } catch (err) {
        throw new Error('Cannot edit entry with ID: ', userId)
    }
}

export {
    auth,
    signInWithGoogle,
    login,
    register,
    sendPasswordReset,
    logout,
    getUser,
    getUserData,
    editProfile
};