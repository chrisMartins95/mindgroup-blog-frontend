// Importa funções do React e hook de navegação do React Router
import { createContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

// Define o tipo dos dados do usuário
interface User {
  id: number;
  email: string;
  nome: string;
  imagem?: string;
  // Adicione aqui outras propriedades que você queira do usuário
}

// Define o formato do contexto de autenticação
interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

// Cria o contexto de autenticação com valores padrão
export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
});

// Define o tipo das props do AuthProvider
interface Props {
  children: ReactNode;
}

// Componente que fornece o contexto de autenticação para toda a aplicação
export const AuthProvider = ({ children }: Props) => {
  // Estados locais para armazenar usuário e token
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  // Ao carregar, tenta recuperar usuário e token do localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setToken(savedToken);
        setUser(parsedUser);
      } catch (error) {
        console.error("Erro ao analisar usuário do localStorage:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
  }, []);

  // Função para fazer login: salva usuário e token no estado e localStorage
  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  // Função para logout: limpa usuário e token do estado e localStorage, e redireciona para login
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Fornece o contexto para os componentes filhos
  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
