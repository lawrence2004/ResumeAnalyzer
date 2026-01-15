import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8080';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});


apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export const authService = {
  login: async (email, password) => {
    const response = await apiClient.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  register: async (name, email, password) => {
    const response = await apiClient.post('/auth/register', {
      name,
      email,
      password,
    });
    return response.data;
  },
};


export const analysisService = {
  uploadResume: async (
    file,
    companyName,
    jobTitle,
    jobDescription
  ) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('companyName', companyName);
    formData.append('jobTitle', jobTitle);
    formData.append('jobDescription', jobDescription);

    const response = await apiClient.post(
      '/analysis/upload',
      formData
    );

    return response.data;
  },

  getAllAnalysis: async () => {
    const response = await apiClient.get('/analysis/getAllAnalysis');
    return response.data;
  },
};

export default apiClient;
