// Importa o hook useContext do React e o contexto de autenticação criado na aplicação
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// Hook personalizado para acessar facilmente o contexto de autenticação em qualquer componente
export const useAuth = () => useContext(AuthContext);
