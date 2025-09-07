// frontend/src/lib/api.ts

export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const headers = {
    ...options.headers,
    'Content-Type': 'application/json',
    'Authorization': token ? `Token ${token}` : '',
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    // You might want to handle 401/403 errors globally here, e.g., by logging the user out.
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  // Handle cases where the response body might be empty (e.g., for DELETE requests)
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return response.json();
  } else {
    return; // No JSON body
  }
};