import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDoN09XDSKWZym_GF4caWry0LVg6cjpDAk",
  authDomain: "bocchi-the-work.firebaseapp.com",
  projectId: "bocchi-the-work",
  storageBucket: "bocchi-the-work.appspot.com",
  messagingSenderId: "256183841052",
  appId: "1:256183841052:web:2a8eff3b7776d89666cad9",
  measurementId: "G-N4TRSHSZ7H"
}

const firebaseApp = initializeApp(firebaseConfig)

export const storage = getStorage(firebaseApp)
export const auth = getAuth(firebaseApp)
export const db = getFirestore(firebaseApp)