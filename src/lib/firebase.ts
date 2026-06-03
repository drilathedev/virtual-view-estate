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

// Whether real Firebase credentials are present. When false the app runs in a
// degraded "preview" mode: the data layer serves local demo content instead of
// hitting Firestore, and the public site renders without crashing. Set real
// VITE_FIREBASE_* vars in .env to enable live data, auth and admin features.
export const isFirebaseConfigured = Boolean(
  import.meta.env.VITE_FIREBASE_API_KEY &&
  import.meta.env.VITE_FIREBASE_AUTH_DOMAIN &&
  import.meta.env.VITE_FIREBASE_PROJECT_ID &&
  import.meta.env.VITE_FIREBASE_STORAGE_BUCKET &&
  import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID &&
  import.meta.env.VITE_FIREBASE_APP_ID
);

// Export the configured storage bucket (accepts plain name or full gs:// URL)
export const STORAGE_BUCKET_RAW = (import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string) || 'demo-prona360.appspot.com';
export const STORAGE_BUCKET_URL = STORAGE_BUCKET_RAW && STORAGE_BUCKET_RAW.startsWith('gs://')
  ? STORAGE_BUCKET_RAW
  : `gs://${STORAGE_BUCKET_RAW}`;

export function getFirebase(): FirebaseServices {
  if (services) return services;

  // Fall back to a harmless placeholder config when env vars are missing so
  // module evaluation never throws and white-screens the whole app. Live
  // network calls won't succeed, but the demo data layer covers the public UI.
  const firebaseConfig = {
    apiKey: (import.meta.env.VITE_FIREBASE_API_KEY as string) || 'AIzaSyDEMO-preview-key-not-for-production',
    authDomain: (import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string) || 'demo-prona360.firebaseapp.com',
    projectId: (import.meta.env.VITE_FIREBASE_PROJECT_ID as string) || 'demo-prona360',
    storageBucket: (import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string) || 'demo-prona360.appspot.com',
    messagingSenderId: (import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string) || '000000000000',
    appId: (import.meta.env.VITE_FIREBASE_APP_ID as string) || '1:000000000000:web:0000000000000000000000',
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID as string | undefined
  };

  if (!isFirebaseConfigured) {
    console.warn(
      '[firebase] Running in preview mode without Firebase credentials — ' +
      'serving local demo data. Add VITE_FIREBASE_* vars to .env for live data.'
    );
  } else if (firebaseConfig.apiKey && firebaseConfig.apiKey.startsWith('AIzaSy') === false) {
    console.warn('[firebase] apiKey looks unusual – double check value.');
  }

  try {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    // Ensure the Storage service explicitly targets the configured bucket.
    // Accept either a plain bucket name (e.g. "prona360d.firebasestorage.app")
    // or a full gs:// URL. getStorage(app, url) expects a gs:// URL.
    const storage = getStorage(app, STORAGE_BUCKET_URL);

    services = { app, auth, db, storage };
    return services;
  } catch (error: any) {
    console.error('[firebase] Failed to initialize Firebase:', error);
    // Re-throw with more context
    throw new Error(`Firebase initialization failed: ${error?.message || 'Unknown error'}. This may be due to network restrictions in your region.`);
  }
}

export const app = getFirebase().app;
export const auth = getFirebase().auth;
export const db = getFirebase().db;
export const storage = getFirebase().storage;
