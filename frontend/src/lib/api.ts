// frontend/src/lib/api.ts

export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const headers: HeadersInit = {
    ...options.headers,
    'Authorization': token ? `Token ${token}` : '',
  };

  // For FormData, let the browser set the Content-Type header with the boundary
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }


  const response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    // If unauthorized, clear the token and redirect to login
    localStorage.removeItem('authToken');
    // Use location.assign for a full page reload to clear any component state
    window.location.assign('/login'); 
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    const errorData = await response.text(); // Try to get more info from the response
    throw new Error(`Network response was not ok: ${response.statusText} - ${errorData}`);
  }

  // Handle cases where the response body might be empty (e.g., for DELETE or 204 No Content responses)
  if (response.status === 204) {
    return;
  }
  
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return response.json();
  } 
  
  return; // No JSON body, or non-json response
};