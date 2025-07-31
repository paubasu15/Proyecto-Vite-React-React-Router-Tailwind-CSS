import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { useLocalStorage } from '../hooks/useLocalStorage';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser, removeUser] = useLocalStorage('auth_user', null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(
    async (username, password) => {
      setIsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (username === 'admin' && password === 'password') {
        const userData = {
          id: 1,
          username: 'admin',
          name: 'Administrador',
          token: 'fake-jwt-token-123',
          roles: ['admin'],
          loginTime: new Date().toISOString(),
        };

        setUser(userData);
        setIsLoading(false);
        return Promise.resolve();
      }

      setIsLoading(false);
      return Promise.reject(new Error('Credenciales inválidas'));
    },
    [setUser, setIsLoading]
  );

  const logout = useCallback(() => {
    removeUser();
  }, [removeUser]);

  const updateProfile = useCallback(
    (profileData) => {
      setUser((prevUser) => ({
        ...prevUser,
        ...profileData,
      }));
    },
    [setUser]
  );

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      updateProfile,
      isLoading,
      isAuthenticated: !!user,
      clearAuth: removeUser,
      hasRole: (role) => user?.roles?.includes(role) || false,
      getToken: () => user?.token || null,
    }),
    [user, login, logout, updateProfile, isLoading, removeUser]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthStorage = () => {
  const [authData, setAuthData, removeAuthData] = useLocalStorage('auth_data', {
    rememberMe: false,
    lastLoginTime: null,
    preferences: {},
  });

  return {
    authData,
    setAuthData,
    removeAuthData,
    updatePreferences: (prefs) =>
      setAuthData((prev) => ({
        ...prev,
        preferences: { ...prev.preferences, ...prefs },
      })),
  };
};
