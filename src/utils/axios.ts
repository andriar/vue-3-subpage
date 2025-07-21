// services/axios/index.ts (modifications)
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';

import { useAppConfigStore } from '../stores/app-config';

// API Base URLs from environment variables
const API_BASE_URL_V1 = import.meta.env.VITE_API_BASE_URL_V1;
const API_BASE_URL_V2 = import.meta.env.VITE_API_BASE_URL_V2;
const API_BASE_URL_V3 = import.meta.env.VITE_API_BASE_URL_V3;

// Default timeout
const DEFAULT_TIMEOUT = 10000;

// Create axios instances for different API versions
export const createAxiosInstance = (
  baseURL: string,
  timeout: number = DEFAULT_TIMEOUT
): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    timeout,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor
  instance.interceptors.request.use(
    (config) => {
      // Get app config store
      const appConfigStore = useAppConfigStore();

      // Add custom headers from Pinia store if configured
      if (appConfigStore.isConfigured()) {
        const customHeaders = appConfigStore.getHeaders();
        // Merge headers properly
        Object.assign(config.headers, customHeaders);
      } else {
        // Fallback to localStorage token for backward compatibility
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }

      // Log request in development
      if (import.meta.env.DEV) {
        console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
        // console.log('📋 Headers:', config.headers);
      }

      return config;
    },
    (error) => {
      console.error('Request error:', error);
      return Promise.reject(error);
    }
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      // Log response in development
      if (import.meta.env.DEV) {
        console.log(`✅ API Response: ${response.status} ${response.config.url}`);
      }
      return response;
    },
    (error) => {
      // Handle common errors
      if (axios.isCancel(error)) {
        // This is a cancellation error, do not treat as a regular API error
        if (import.meta.env.DEV) {
          console.warn('Request was cancelled:', error.message);
        }
        return Promise.reject(error); // Re-throw so the calling code can catch it
      }

      if (error.response) {
        const { status, data } = error.response;

        // Log error in development
        if (import.meta.env.DEV) {
          console.error(`❌ API Error: ${status} ${error.config?.url}`, data);
        }

        // Handle specific status codes
        switch (status) {
          case 401:
            localStorage.removeItem('auth_token');
            const appConfigStore = useAppConfigStore();
            appConfigStore.clearConfig();
            break;
          case 403:
            // Forbidden
            console.error('Access forbidden');
            break;
          case 404:
            // Not found
            console.error('Resource not found');
            break;
          case 500:
            // Server error
            console.error('Server error');
            break;
        }
      } else if (error.request) {
        // Network error (no response received)
        console.error('Network error:', error.request);
      } else {
        // Other error (e.g., error in setting up request)
        console.error('Error:', error.message);
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

// Create instances for each API version
export const apiV1 = createAxiosInstance(API_BASE_URL_V1 || '');
export const apiV2 = createAxiosInstance(API_BASE_URL_V2 || '');
export const apiV3 = createAxiosInstance(API_BASE_URL_V3 || '');

// Default export for backward compatibility
export default apiV1;

// Type definitions for API responses
export interface ApiResponse<T = any> {
  data: T | null; // Data can be null if success is false
  message?: string;
  success: boolean;
  error?: string;
}

// Helper function to make API calls with proper typing
export const apiCall = async <T>(
  instance: AxiosInstance,
  config: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  try {
    const response = await instance(config);
    return {
      data: response.data,
      success: true,
      message: response.data?.message,
    };
  } catch (error: any) {
    // Check if it's an Axios cancellation error
    if (axios.isCancel(error)) {
      if (import.meta.env.DEV) {
        console.warn('API call cancelled:', error.message);
      }
      // Re-throw the error so the consumer knows it was cancelled,
      // but return an APIResponse with success: false
      return {
        data: null,
        success: false,
        error: 'Request cancelled',
      };
    }

    return {
      data: null,
      success: false,
      error: error.response?.data?.message || error.message || 'An unknown error occurred',
    };
  }
};

// Helper function to create form-encoded data
export const createFormData = (data: Record<string, any>): URLSearchParams => {
  const formData = new URLSearchParams();
  Object.keys(data).forEach((key) => {
    formData.append(key, String(data[key]));
  });
  return formData;
};

// Helper function for POST request with form-encoded data
export const postFormData = <T>(
  instance: AxiosInstance,
  url: string,
  data: Record<string, any>,
  config?: AxiosRequestConfig // Add config to allow passing signal
): Promise<AxiosResponse<T>> => {
  const formData = createFormData(data);
  return instance.post<T>(url, formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    ...config, // Spread the config here
  });
};
