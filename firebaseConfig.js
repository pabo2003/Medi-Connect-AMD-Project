import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {

  apiKey: "AIzaSyAoQ_LSHA3xdBB9bcUOcoTCqlzzOLTyPz0",

  authDomain: "mediconnect-c1c3b.firebaseapp.com",

  projectId: "mediconnect-c1c3b",

  storageBucket: "mediconnect-c1c3b.firebasestorage.app",

  messagingSenderId: "320729184463",

  appId: "1:320729184463:web:ef0cc325edd6fe3b769fba"

};






const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
