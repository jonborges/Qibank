import { createContext, useState, useContext, type ReactNode} from 'react';


interface User {
  id: string;
  nome: string;
  email: string;
  saldo: number;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {

    try {
      const storedUser = localStorage.getItem('qibank_user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Falha ao carregar usuário do localStorage", error);
      return null;
    }
  });

  const login = (userData: User) => {
    setUser(userData);
 
    localStorage.setItem('qibank_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);

    localStorage.removeItem('qibank_user');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!user, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
