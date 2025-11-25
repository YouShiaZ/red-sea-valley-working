import { db } from '../config/firebase.js';

const docRef = () => db().collection('settings').doc('global');

export const getSettings = async () => {
  const snapshot = await docRef().get();
  return snapshot.exists ? snapshot.data() : {};
};

export const setSettings = async (data) => {
  await docRef().set(data, { merge: true });
  return data;
};
