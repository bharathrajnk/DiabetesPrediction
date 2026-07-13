import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000',
  timeout: 10000,
});

export const checkHealth = async () => {
  const response = await api.get('/health');
  return response.data;
};

export const predictRisk = async (data) => {
  const response = await api.post('/predict', data);
  return response.data;
};

export const getStatistics = async () => {
  const response = await api.get('/statistics');
  return response.data;
};

export const getChartsData = async () => {
  const response = await api.get('/charts');
  return response.data;
};

export default api;
