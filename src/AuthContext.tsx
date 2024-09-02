import React, { createContext, useContext, useState, ReactNode, FC } from 'react';
import { IUser } from './Interfaces';

// Define the types for the Auth context
interface AuthContextType {
  authToken: string | null;
  user: IUser | null; 
  login: (token: string, user: IUser) => void;
  logout: () => void;
}

// Define the context with an initial value of undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the props for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

// Define the AuthProvider component
export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(localStorage.getItem('authToken'));
  const [user, setUser] = useState<IUser | null>(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null);

  // useEffect(() => {
  //   if (authToken) {
  //     // Logic to fetch user data if needed
  //   }
  // }, [authToken]);

  const login = (token: string, userInfo: IUser) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(userInfo));

    setAuthToken(token);
    setUser(user)
    // Optionally, fetch user data or perform other actions
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');

    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
