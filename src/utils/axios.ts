import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { useAppConfigStore } from '../stores/app-config'

// API Base URLs from environment variables
const API_BASE_URL_V1 = import.meta.env.VITE_API_BASE_URL_V1
const API_BASE_URL_V2 = import.meta.env.VITE_API_BASE_URL_V2
const API_BASE_URL_V3 = import.meta.env.VITE_API_BASE_URL_V3

// Default timeout
const DEFAULT_TIMEOUT = 10000

// Create axios instances for different API versions
export const createAxiosInstance = (baseURL: string, timeout: number = DEFAULT_TIMEOUT): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    timeout,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // Request interceptor
  instance.interceptors.request.use(
    (config) => {
      // Get app config store
      const appConfigStore = useAppConfigStore()
      
      // Add custom headers from Pinia store if configured
      if (appConfigStore.isConfigured()) {
        const customHeaders = appConfigStore.getHeaders()
        // Merge headers properly
        Object.assign(config.headers, customHeaders)
      } else {
        // Fallback to localStorage token for backward compatibility
        const token = localStorage.getItem('auth_token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }
      
      // Log request in development
      if (import.meta.env.DEV) {
        console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`)
        console.log('📋 Headers:', config.headers)
      }
      
      return config
    },
    (error) => {
      console.error('Request error:', error)
      return Promise.reject(error)
    }
  )

  // Response interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      // Log response in development
      if (import.meta.env.DEV) {
        console.log(`✅ API Response: ${response.status} ${response.config.url}`)
      }
      return response
    },
    (error) => {
      // Handle common errors
      if (error.response) {
        const { status, data } = error.response
        
        // Log error in development
        if (import.meta.env.DEV) {
          console.error(`❌ API Error: ${status} ${error.config?.url}`, data)
        }
        
        // Handle specific status codes
        switch (status) {
          case 401:
            // Unauthorized - clear both localStorage and Pinia store
            localStorage.removeItem('auth_token')
            const appConfigStore = useAppConfigStore()
            appConfigStore.clearConfig()
            // You can add router navigation here if needed
            break
          case 403:
            // Forbidden
            console.error('Access forbidden')
            break
          case 404:
            // Not found
            console.error('Resource not found')
            break
          case 500:
            // Server error
            console.error('Server error')
            break
        }
      } else if (error.request) {
        // Network error
        console.error('Network error:', error.request)
      } else {
        // Other error
        console.error('Error:', error.message)
      }
      
      return Promise.reject(error)
    }
  )

  return instance
}

// Create instances for each API version
export const apiV1 = createAxiosInstance(API_BASE_URL_V1 || '')
export const apiV2 = createAxiosInstance(API_BASE_URL_V2 || '')
export const apiV3 = createAxiosInstance(API_BASE_URL_V3 || '')

// Default export for backward compatibility
export default apiV1

// Type definitions for API responses
export interface ApiResponse<T = any> {
  data: T
  message?: string
  success: boolean
  error?: string
}

// Helper function to make API calls with proper typing
export const apiCall = async <T>(
  instance: AxiosInstance,
  config: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  try {
    const response = await instance(config)
    return {
      data: response.data,
      success: true,
      message: response.data?.message
    }
  } catch (error: any) {
    return {
      data: null as T,
      success: false,
      error: error.response?.data?.message || error.message
    }
  }
} 