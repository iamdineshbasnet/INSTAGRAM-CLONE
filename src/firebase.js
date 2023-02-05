import { initializeApp } from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage'
import {getAuth} from 'firebase/auth'
import { getDatabase } from "firebase/database";
const firebaseConfig = {
    apiKey: "AIzaSyAb6eU1SjK70eLx17YwukWVLUZKn4f9CXk",
    authDomain: "instagram-replicate1.firebaseapp.com",
    projectId: "instagram-replicate1",
    storageBucket: "instagram-replicate1.appspot.com",
    messagingSenderId: "54780188561",
    appId: "1:54780188561:web:935a45bbc5e56e31052c30",
    measurementId: "G-D12RY9EHL1",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app)
export const auth = getAuth(app)
export const database = getDatabase();
