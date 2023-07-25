import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyClEl6DcFBw7GV603V3IexHN7QyQ9NTYeU',
  authDomain: 'kungfoo-65dce.firebaseapp.com',
  projectId: 'kungfoo-65dce',
  storageBucket: 'kungfoo-65dce.appspot.com',
  messagingSenderId: '1059885341058',
  appId: '1:1059885341058:web:682acb9397477415a8179b',
};

// Firebase init
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
