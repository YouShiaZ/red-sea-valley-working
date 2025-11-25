import admin from 'firebase-admin';

let initialized = false;
const ensureActive = () => {
  if (!admin.apps.length) throw new Error('Firebase not configured');
};

export const initFirebase = () => {
  if (initialized) return admin.app();
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
    ? JSON.parse(Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, 'base64').toString('utf8'))
    : null;

  try {
    admin.initializeApp({
      credential: serviceAccount ? admin.credential.cert(serviceAccount) : admin.credential.applicationDefault(),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET
    });
    initialized = true;
    return admin.app();
  } catch (error) {
    console.warn('Firebase init skipped', error.message);
    initialized = true;
    return null;
  }
};

export const db = () => {
  ensureActive();
  return admin.firestore();
};
export const bucket = () => {
  ensureActive();
  return admin.storage().bucket();
};
export const messaging = () => {
  ensureActive();
  return admin.messaging();
};
