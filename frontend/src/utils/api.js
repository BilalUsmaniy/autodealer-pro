// API utility for AutoDealer Pro
// Handles all backend communication with JWT authentication

const API_BASE = 'http://localhost:8000/api';

// Token management
const getTokens = () => ({
  access: localStorage.getItem('access_token'),
  refresh: localStorage.getItem('refresh_token'),
});

const setTokens = (access, refresh) => {
  localStorage.setItem('access_token', access);
  if (refresh) localStorage.setItem('refresh_token', refresh);
};

const clearTokens = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

// Authenticated fetch wrapper
const apiFetch = async (url, options = {}) => {
  const tokens = getTokens();
  const headers = {
    ...options.headers,
  };
  
  // Don't set Content-Type for FormData (file uploads)
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }
  
  if (tokens.access) {
    headers['Authorization'] = `Bearer ${tokens.access}`;
  }

  let response = await fetch(`${API_BASE}${url}`, { ...options, headers });

  // If 401, try refreshing the token
  if (response.status === 401 && tokens.refresh) {
    const refreshResp = await fetch(`${API_BASE}/auth/token/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh: tokens.refresh }),
    });

    if (refreshResp.ok) {
      const data = await refreshResp.json();
      setTokens(data.access, data.refresh);
      headers['Authorization'] = `Bearer ${data.access}`;
      response = await fetch(`${API_BASE}${url}`, { ...options, headers });
    } else {
      clearTokens();
      window.location.reload();
    }
  }

  return response;
};

// ═══════ Auth ═══════
export const auth = {
  login: async (username, password) => {
    const resp = await fetch(`${API_BASE}/auth/token/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!resp.ok) throw new Error('Invalid credentials');
    const data = await resp.json();
    setTokens(data.access, data.refresh);
    return data;
  },
  logout: () => clearTokens(),
  getUser: async () => {
    const resp = await apiFetch('/auth/me/');
    return resp.json();
  },
  isAuthenticated: () => !!getTokens().access,
};

// ═══════ Generic CRUD ═══════
const crud = (resource) => ({
  list: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const resp = await apiFetch(`/${resource}/${query ? '?' + query : ''}`);
    return resp.json();
  },
  get: async (id) => {
    const resp = await apiFetch(`/${resource}/${id}/`);
    return resp.json();
  },
  create: async (data) => {
    const isFormData = data instanceof FormData;
    const resp = await apiFetch(`/${resource}/`, {
      method: 'POST',
      body: isFormData ? data : JSON.stringify(data),
    });
    return resp.json();
  },
  update: async (id, data) => {
    const isFormData = data instanceof FormData;
    const resp = await apiFetch(`/${resource}/${id}/`, {
      method: 'PATCH',
      body: isFormData ? data : JSON.stringify(data),
    });
    return resp.json();
  },
  delete: async (id) => {
    await apiFetch(`/${resource}/${id}/`, { method: 'DELETE' });
  },
});

// ═══════ API Endpoints ═══════
export const api = {
  // Dashboard
  dashboard: async () => {
    const resp = await apiFetch('/dashboard/');
    return resp.json();
  },

  // Vehicles
  vehicles: {
    ...crud('vehicles'),
    sell: async (id, data) => {
      const resp = await apiFetch(`/vehicles/${id}/sell/`, {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return resp.json();
    },
    addExpense: async (id, data) => {
      const resp = await apiFetch(`/vehicles/${id}/add_expense/`, {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return resp.json();
    },
  },

  // Customers
  customers: {
    ...crud('customers'),
    changeStage: async (id, stage) => {
      const resp = await apiFetch(`/customers/${id}/change_stage/`, {
        method: 'POST',
        body: JSON.stringify({ stage }),
      });
      return resp.json();
    },
  },

  // Other resources
  employees: crud('employees'),
  sales: crud('sales'),
  expenses: crud('expenses'),
  documents: crud('documents'),
  locations: crud('locations'),

  // Settings
  settings: {
    get: async () => {
      const resp = await apiFetch('/settings/');
      return resp.json();
    },
    update: async (data) => {
      const resp = await apiFetch('/settings/1/', {
        method: 'PATCH',
        body: JSON.stringify(data),
      });
      return resp.json();
    },
  },

  // Audit log
  auditLog: {
    list: async () => {
      const resp = await apiFetch('/audit-log/');
      return resp.json();
    },
  },
};

export default api;
