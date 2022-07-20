import {
    getAuth, signInWithEmailAndPassword, signInWithPopup,
    GoogleAuthProvider, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut
} from 'firebase/auth';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
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
        sessionStorage.setItem('currentUserId', user.user.uid)
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const register = async (email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(database, "users"), {
            uid: user.uid,
            authProvider: "local",
            email,
        });
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
};

export {
    auth,
    signInWithGoogle,
    login,
    register,
    sendPasswordReset,
    logout,
};