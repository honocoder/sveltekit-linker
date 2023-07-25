import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import pkg from 'firebase-admin';

import {
  FB_CLIENT_EMAIL,
  FB_PRIVATE_KEY,
  FB_PROJECT_ID,
  FB_SERVICE_ACCOUNT,
} from '$env/static/private';

try {
  pkg.initializeApp({
    credential: pkg.credential.cert({
      projectId: FB_PROJECT_ID,
      clientEmail: FB_CLIENT_EMAIL,
      privateKey: FB_PRIVATE_KEY,
    }),
  });
} catch (err: any) {
  if (!/already exists/u.test(err.message)) {
    console.error('Firebase admin initialization error', err.stack);
  }
}

export const adminDB = getFirestore();
export const adminAuth = getAuth();