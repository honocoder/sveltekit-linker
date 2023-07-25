import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

import { type Writable, writable } from 'svelte/store';

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

/**
 * @returns a store with the current firebase user
 */
function userStore() {
  let unsubscribe: () => void;

  if (!auth || !globalThis.window) {
    console.warn('Auth is not initialized or not in browser');
    const { subscribe } = writable<User | null>(null);
    return {
      subscribe,
    };
  }

  const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
    unsubscribe = onAuthStateChanged(auth, (user) => {
      set(user);
    });

    return () => unsubscribe();
  });

  return {
    subscribe,
  };
}

export const user = userStore();
