import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { IUsers } from "../types/user";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  user: IUsers | null;
  isFirstLogin: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUsers | null>>;
  setIsFirstLogin: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void;
  loading: boolean;
  resetContext: boolean;
  setResetContext: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext: React.Context<AuthContextType | undefined> = createContext<
  AuthContextType | undefined
>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUsers | null>(null);
  const [isFirstLogin, setIsFirstLogin] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [resetContext, setResetContext] = useState<boolean>(false);

  const host: string = import.meta.env.VITE_HOST;
  const port: string = import.meta.env.VITE_API_PORT;
  const urlFecthAuthContext = import.meta.env.VITE_URL_FETCH_AUTHCONTEXT;
  const urlFetchLogout = import.meta.env.VITE_URL_FETCH_LOGOUT;

  const fetchAuthcontext = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://${host}:${port}${urlFecthAuthContext}`, {
        credentials: "include",
      });

      if (res.status === 401) {
        logout();
        return;
      }

      if (!res.ok) {
        throw new Error(`Erreur HTTP: ${res.status}`);
      }

      const data = await res.json();

      setUser(data.user);
      setIsFirstLogin(data.isFirstLogin);
      setIsAuthenticated(data.isAuthenticated);
    } catch (err) {
      logout();
      console.error(err);
    }
    setLoading(false);
  };

  const fetchLogout = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://${host}:${port}${urlFetchLogout}`, {
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`Erreur HTTP: ${res.status}`);
      }

      const data = await res.json();
      setUser(data.user);
      setIsFirstLogin(data.isFirstLogin);
      setIsAuthenticated(data.isAuthenticated);
    } catch (error) {
      setUser(null);
      setIsFirstLogin(true);
      setLoading(false);
      setIsAuthenticated(false);
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAuthcontext();
  }, [resetContext]);

  const logout = useCallback(() => {
    fetchLogout();
  }, []);

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      setIsAuthenticated,
      user,
      setUser,
      isFirstLogin,
      setIsFirstLogin,
      logout,
      loading,
      resetContext,
      setResetContext,
    }),
    [user, logout, loading, resetContext],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
