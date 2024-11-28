// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPydfS5AWThl0HhmV3JzqVgONZhgz8HRs",
  authDomain: "react-loginauth-5c07c.firebaseapp.com",
  projectId: "react-loginauth-5c07c",
  storageBucket: "react-loginauth-5c07c.firebasestorage.app",
  messagingSenderId: "261518366273",
  appId: "1:261518366273:web:3888a5e117da97ddaa98c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;
