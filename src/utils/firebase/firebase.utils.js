import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqSYW2B8ifV-uEI0DdJDkViM-UpCHXpic",
  authDomain: "null-clothing-db.firebaseapp.com",
  projectId: "null-clothing-db",
  storageBucket: "null-clothing-db.appspot.com",
  messagingSenderId: "867265420938",
  appId: "1:867265420938:web:c06b286e72500f656e9773",
};

// Initializing Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// Setting up Firestore Database

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  // Creating the user doc reference using the doc method from firestore
  // The doc() method takes three arguments which are the database, the name of the collection
  // and the user.id that was generated when the user clicked on the button in the
  // signin component.
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  // a Snapshot of the user is created getDoc() method is used
  // get the user details to check whether the user exists in the
  // database or not
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  // check whether a user exists and creates that user in the database
  if (!userSnapshot.exists()) {
    // if the user doesn't exist the display-name and email
    // is destructured from the signin component used to create
    // a new user in the database
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    // after the user is destructured the setDoc() method is used to create a new user

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  // otherwise return the userDocRef

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};
