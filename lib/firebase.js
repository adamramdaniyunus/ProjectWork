import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCD5Lfpq5P4J-ULySBkIU49_ZzEm4zWYSA",
    authDomain: "chat-app-e23e1.firebaseapp.com",
    projectId: "chat-app-e23e1",
    storageBucket: "chat-app-e23e1.appspot.com",
    messagingSenderId: "614610507800",
    appId: "1:614610507800:web:a9676845508bb528c98b6d",
    measurementId: "G-PWQQ580R7Q"
}


const app = initializeApp(firebaseConfig);
const fireStore = getFirestore(app);
const auth = getAuth(app);

export {app, fireStore, auth};