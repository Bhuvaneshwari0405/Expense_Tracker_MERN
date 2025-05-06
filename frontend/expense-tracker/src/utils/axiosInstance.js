import axios from 'axios';
import { BASE_URL } from './apiPaths';
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000, // 10 seconds timeout
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },

    });

    // Add a request interceptor to include the token in the headers
    axiosInstance.interceptors.request.use(
        (config) => {
            const accesstoken = localStorage.getItem('token');
            if (accesstoken) {
                config.headers['Authorization'] = `Bearer ${accesstoken}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Add a response interceptor to handle errors globally
    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                // Handle unauthorized access (e.g., redirect to login page)
                window.location.href = '/login';
            }
            else if (error.response && error.response.status === 403) {
                // Handle forbidden access (e.g., show a message)
                console.error('Access denied. You do not have permission to perform this action.');
            } else if (error.response && error.response.status === 500) {
                // Handle server errors (e.g., show a message)
                console.error('Server error. Please try again later.');
            } else {
                // Handle other errors
                console.error('An error occurred:', error.message);
            }
            return Promise.reject(error);
        }
    );

    export default axiosInstance;
// This code creates an Axios instance with a base URL and a timeout of 10 seconds. It also sets up request and response interceptors to handle authentication tokens and errors globally. The request interceptor adds the token to the headers if it exists, while the response interceptor handles unauthorized access, forbidden access, server errors, and other errors.