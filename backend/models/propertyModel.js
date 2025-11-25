import { db } from '../config/firebase.js';

const collection = () => db().collection('properties');

export const listProperties = async () => {
  const snapshot = await collection().get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const findProperty = async (id) => {
  const doc = await collection().doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
};

export const createProperty = async (data) => {
  const doc = await collection().add({ ...data, createdAt: new Date().toISOString() });
  return { id: doc.id, ...data };
};

export const updateProperty = async (id, data) => {
  await collection().doc(id).update(data);
  return { id, ...data };
};

export const removeProperty = async (id) => {
  await collection().doc(id).delete();
  return true;
};
