const API_BASE_URL = 'http://localhost:8080/api/auth';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  firstname?: string;
  lastname?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  username: string;
  firstName?: string;
  lastName?: string;
  email: string;
  role: string;
  message?: string;
}

export const authService = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || data.message || 'Login failed. Please check credentials.');
    }

    if (data.token) {
      localStorage.setItem('ccm_token', data.token);
      localStorage.setItem('ccm_user', JSON.stringify({
        username: data.username,
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        email: data.email,
        role: data.role,
      }));
    }

    return data as AuthResponse;
  },

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || data.message || 'Registration failed.');
    }

    if (data.token) {
      localStorage.setItem('ccm_token', data.token);
      localStorage.setItem('ccm_user', JSON.stringify({
        username: data.username,
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        email: data.email,
        role: data.role,
      }));
    }

    return data as AuthResponse;
  },

  logout(): void {
    localStorage.removeItem('ccm_token');
    localStorage.removeItem('ccm_user');
  },

  getToken(): string | null {
    return localStorage.getItem('ccm_token');
  },

  getCurrentUser() {
    const user = localStorage.getItem('ccm_user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('ccm_token');
  }
};

