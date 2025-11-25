import apiClient from './apiClient';

export const submitLead = async (payload) => {
  const { data } = await apiClient.post('/leads', payload);
  return data;
};
