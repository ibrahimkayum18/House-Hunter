// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4mZEisuJho-tFPKv4Pt1No6dYqIGNwDg",
  authDomain: "house-hunter-f6581.firebaseapp.com",
  projectId: "house-hunter-f6581",
  storageBucket: "house-hunter-f6581.appspot.com",
  messagingSenderId: "348423627512",
  appId: "1:348423627512:web:3ec4ddb68f0e7abf92510d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;