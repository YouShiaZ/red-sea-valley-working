import { db } from '../config/firebase.js';

const docRef = () => db().collection('admins').doc('owner');

export const getAdmin = async () => {
  const snapshot = await docRef().get();
  return snapshot.exists ? snapshot.data() : null;
};

export const setAdmin = async (data) => {
  await docRef().set(data, { merge: true });
  return data;
};
