import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  // Getting the Firebase to popup upon sign in
  const logGoogleUser = async () => {
    // After the user clicks the on the button and the user signs in into the account
    // the user object is destructured from the response and passed into the
    // createUserDocumentFromAuth() method which is then saved in firestore.

    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
    </div>
  );
};

export default SignIn;
