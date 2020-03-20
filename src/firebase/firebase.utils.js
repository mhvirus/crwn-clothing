import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyD6R9ym93sGrhnoW6IkurBzoeXv83J-W9s",
  authDomain: "crwn-db-6945b.firebaseapp.com",
  databaseURL: "https://crwn-db-6945b.firebaseio.com",
  projectId: "crwn-db-6945b",
  storageBucket: "crwn-db-6945b.appspot.com",
  messagingSenderId: "825250074703",
  appId: "1:825250074703:web:e5837970633be95154da3a",
  measurementId: "G-XCEDY540NM"
};

export const createUserProfileDoucment = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (e) {
      console.log("error creating user", e.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
