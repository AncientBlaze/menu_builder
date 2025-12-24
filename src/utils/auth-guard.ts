/**
 * Check if user is authenticated by checking localStorage
 */
export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  const user = localStorage.getItem('user');
  return !!user;
};

/**
 * Get authenticated user from localStorage
 */
export const getAuthUser = () => {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

/**
 * Clear user authentication
 */
export const clearAuth = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
  }
};
