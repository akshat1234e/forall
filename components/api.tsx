import { projectId, publicAnonKey } from '../utils/supabase/info';

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-9c9fcc04`;

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  requireAuth?: boolean;
  accessToken?: string;
}

async function apiCall(endpoint: string, options: ApiOptions = {}) {
  const { method = 'GET', body, requireAuth = false, accessToken } = options;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (requireAuth && accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  } else if (!requireAuth) {
    headers['Authorization'] = `Bearer ${publicAnonKey}`;
  }

  const config: RequestInit = {
    method,
    headers,
  };

  if (body && method !== 'GET') {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API call failed for ${endpoint}:`, error);
    throw error;
  }
}

// Product API
export const productApi = {
  getAll: () => apiCall('/products'),
  getById: (id: string) => apiCall(`/products/${id}`),
  create: (productData: any, accessToken: string) => 
    apiCall('/products', { method: 'POST', body: productData, requireAuth: true, accessToken }),
};

// User API
export const userApi = {
  signup: (userData: { email: string; password: string; name: string }) =>
    apiCall('/signup', { method: 'POST', body: userData }),
};

// Order API
export const orderApi = {
  create: (orderData: any, accessToken: string) =>
    apiCall('/orders', { method: 'POST', body: orderData, requireAuth: true, accessToken }),
  getAll: (accessToken: string) =>
    apiCall('/orders', { requireAuth: true, accessToken }),
};

// Review API
export const reviewApi = {
  create: (reviewData: any, accessToken: string) =>
    apiCall('/reviews', { method: 'POST', body: reviewData, requireAuth: true, accessToken }),
  getByProduct: (productId: string) =>
    apiCall(`/reviews/${productId}`),
};

// Newsletter API
export const newsletterApi = {
  subscribe: (email: string) =>
    apiCall('/newsletter', { method: 'POST', body: { email } }),
};

// Contact API
export const contactApi = {
  submit: (contactData: any) =>
    apiCall('/contact', { method: 'POST', body: contactData }),
};

// Blog API
export const blogApi = {
  getAll: () => apiCall('/blog'),
  create: (postData: any, accessToken: string) =>
    apiCall('/blog', { method: 'POST', body: postData, requireAuth: true, accessToken }),
};

// Analytics API
export const analyticsApi = {
  get: (accessToken: string) =>
    apiCall('/analytics', { requireAuth: true, accessToken }),
};

// Utility API
export const utilityApi = {
  initData: () => apiCall('/init-data', { method: 'POST' }),
  health: () => apiCall('/health'),
};