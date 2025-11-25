import { db } from '../config/firebase.js';

const collection = () => db().collection('leads');

export const createLead = async (data) => {
  const doc = await collection().add({ ...data, createdAt: new Date().toISOString() });
  return { id: doc.id, ...data };
};

export const listLeads = async () => {
  const snapshot = await collection().orderBy('createdAt', 'desc').get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
