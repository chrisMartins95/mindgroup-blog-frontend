// Importa tipos do React, componente de navegação do React Router e hook de autenticação
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// Define o tipo das props do componente PrivateRoute
interface Props {
  children: ReactNode;
}

// Componente que protege rotas privadas: só permite acesso se houver token de autenticação
const PrivateRoute = ({ children }: Props) => {
  const { token } = useAuth();

  // Se não estiver autenticado, redireciona para a tela de login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Se autenticado, renderiza os componentes filhos normalmente
  return children;
};

export default PrivateRoute;
