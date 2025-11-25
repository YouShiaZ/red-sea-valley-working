import apiClient from './apiClient';
import { seedProperties } from '../data/properties';

export const fetchProperties = async () => {
  try {
    const { data } = await apiClient.get('/properties');
    return data;
  } catch (error) {
    console.warn('Falling back to seed properties', error.message);
    return seedProperties;
  }
};

export const fetchProperty = async (id) => {
  try {
    const { data } = await apiClient.get(`/properties/${id}`);
    return data;
  } catch (error) {
    const property = seedProperties.find((p) => p.id === id);
    if (!property) throw error;
    return property;
  }
};

export const createProperty = async (payload) => {
  const { data } = await apiClient.post('/properties', payload);
  return data;
};

export const updateProperty = async (id, payload) => {
  const { data } = await apiClient.put(`/properties/${id}`, payload);
  return data;
};

export const deleteProperty = async (id) => apiClient.delete(`/properties/${id}`);
