import apiClient from './apiClient';

export const loginAdmin = async (credentials) => {
  const { data } = await apiClient.post('/auth/login', credentials);
  localStorage.setItem('rsv_admin_token', data.token);
  return data;
};

export const logoutAdmin = () => {
  localStorage.removeItem('rsv_admin_token');
};
