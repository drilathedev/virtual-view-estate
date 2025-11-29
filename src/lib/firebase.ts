import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

interface FirebaseServices {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
  storage: FirebaseStorage;
}

let services: FirebaseServices | null = null;

export function getFirebase(): FirebaseServices {
  if (services) return services;

  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
    appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID as string | undefined
  };

  const required: (keyof typeof firebaseConfig)[] = [
    'apiKey',
    'authDomain',
    'projectId',
    'storageBucket',
    'messagingSenderId',
    'appId'
  ];
  const missing = required.filter(k => !firebaseConfig[k]);
  if (missing.length) {
    const msg = `Missing Firebase env vars: ${missing.join(', ')}.\n` +
      'Ensure .env has VITE_FIREBASE_* variables and restart dev server.';
    console.error(msg, firebaseConfig);
    throw new Error(msg);
  }

  if (firebaseConfig.apiKey && firebaseConfig.apiKey.startsWith('AIzaSy') === false) {
    console.warn('[firebase] apiKey looks unusual – double check value.');
  }

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);

  services = { app, auth, db, storage };
  return services;
}

export const app = getFirebase().app;
export const auth = getFirebase().auth;
export const db = getFirebase().db;
export const storage = getFirebase().storage;
