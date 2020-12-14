import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBITm7U3W-zxk2KALhquMZm4lYOAjC_sAQ",
    authDomain: "crwn-db-a01b1.firebaseapp.com",
    databaseURL: "https://crwn-db-a01b1.firebaseio.com",
    projectId: "crwn-db-a01b1",
    storageBucket: "crwn-db-a01b1.appspot.com",
    messagingSenderId: "625328883636",
    appId: "1:625328883636:web:7c1ba85c7cf39c7e0314e1",
    measurementId: "G-YLDH1CHNY4"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
 
    if (!userAuth) return;


    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();


    if(!snapShot.exists) {
        const { displayName, email } =userAuth;
        const createdAt = new Date ();

        try {
            await userRef.set({
               displayName,
               email,
               createdAt,
               ...additionalData 
            })
            
        } catch (error) {
            console.log('error creating user', error.message);

        }
    }

    return userRef;


};




firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;