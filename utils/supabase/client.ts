import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';
import { validateEmail, validateQuantity, sanitizeInput, getCSRFToken } from '../security';

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

// API client for our custom server
export class ApiClient {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor() {
    this.baseUrl = `https://${projectId}.supabase.co/functions/v1/make-server-9c9fcc04`;
    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`,
    };
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          ...this.headers,
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  private async getAuthHeaders(): Promise<Record<string, string>> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.access_token) {
        return {
          'Authorization': `Bearer ${session.access_token}`,
        };
      }
    } catch (error) {
      console.error('Error getting auth headers:', error);
    }
    return {};
  }

  // Authentication methods
  async signUp(email: string, password: string, name: string) {
    return this.makeRequest('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  }

  async getProfile() {
    const authHeaders = await this.getAuthHeaders();
    return this.makeRequest('/auth/profile', {
      method: 'GET',
      headers: authHeaders,
    });
  }

  async updateProfile(data: { name?: string; preferences?: Record<string, unknown> }) {
    const authHeaders = await this.getAuthHeaders();
    const csrfToken = getCSRFToken();
    
    const sanitizedData = {
      name: data.name ? sanitizeInput(data.name) : undefined,
      preferences: data.preferences
    };
    
    const headers: Record<string, string> = {
      ...authHeaders,
      'X-CSRF-Token': csrfToken || ''
    };
    
    return this.makeRequest('/auth/profile', {
      method: 'PUT',
      headers,
      body: JSON.stringify(sanitizedData),
    });
  }

  // Products methods
  async getProducts(params: {
    category?: string;
    search?: string;
    page?: number;
    limit?: number;
  } = {}) {
    const searchParams = new URLSearchParams();
    
    if (params.category) searchParams.set('category', params.category);
    if (params.search) searchParams.set('search', params.search);
    if (params.page) searchParams.set('page', params.page.toString());
    if (params.limit) searchParams.set('limit', params.limit.toString());

    const query = searchParams.toString();
    return this.makeRequest(`/products${query ? `?${query}` : ''}`);
  }

  async getProduct(id: string) {
    return this.makeRequest(`/products/${id}`);
  }

  // Cart methods
  async getCart() {
    const authHeaders = await this.getAuthHeaders();
    return this.makeRequest('/cart', {
      method: 'GET',
      headers: authHeaders,
    });
  }

  async addToCart(productId: string, quantity: number = 1) {
    if (!validateQuantity(quantity)) {
      throw new Error('Invalid quantity. Must be a positive integer.');
    }
    
    const authHeaders = await this.getAuthHeaders();
    const csrfToken = getCSRFToken();
    
    const headers: Record<string, string> = {
      ...authHeaders,
      'X-CSRF-Token': csrfToken || ''
    };
    
    return this.makeRequest('/cart/add', {
      method: 'POST',
      headers,
      body: JSON.stringify({ 
        productId: sanitizeInput(productId), 
        quantity 
      }),
    });
  }

  // Newsletter methods
  async subscribeNewsletter(email: string) {
    if (!validateEmail(email)) {
      throw new Error('Invalid email address.');
    }
    
    const csrfToken = getCSRFToken();
    
    const headers: Record<string, string> = {
      'X-CSRF-Token': csrfToken || ''
    };
    
    return this.makeRequest('/newsletter/subscribe', {
      method: 'POST',
      headers,
      body: JSON.stringify({ email: sanitizeInput(email) }),
    });
  }

  // Initialize sample data
  async initializeData() {
    return this.makeRequest('/init-data', {
      method: 'POST',
    });
  }

  // Health check
  async healthCheck() {
    return this.makeRequest('/health');
  }
}

export const apiClient = new ApiClient();

// Auth helper functions for easier use
export const auth = {
  signUp: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { data, error };
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  getSession: async () => {
    const { data, error } = await supabase.auth.getSession();
    return { data, error };
  },

  getUser: async () => {
    const { data, error } = await supabase.auth.getUser();
    return { data, error };
  },

  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback);
  },
};