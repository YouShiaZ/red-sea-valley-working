import apiClient from './apiClient';

export const fetchSettings = async () => {
  const { data } = await apiClient.get('/settings');
  return data;
};

export const updateSettings = async (payload) => {
  const { data } = await apiClient.put('/settings', payload);
  return data;
};
