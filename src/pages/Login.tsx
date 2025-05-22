// Importa hooks do React, funções de navegação, API de autenticação, hook de autenticação e CSS da página
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import '../styles/Login.css';

export default function Login() {
  // Estado local para armazenar os dados do formulário de login
  const [form, setForm] = useState({ email: '', senha: '' });
  // Hook para navegação entre páginas
  const navigate = useNavigate();
  // Função de login obtida do contexto de autenticação
  const { login } = useAuth();

  // Atualiza o estado do formulário conforme o usuário digita
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Função chamada ao enviar o formulário de login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Envia os dados para a API para autenticar o usuário
      const res = await api.post('/api/auth/login', form);
      const { token, user } = res.data;
      // Salva o token e os dados do usuário no contexto de autenticação
      login(token, user);
      // Redireciona para a página inicial após login bem-sucedido
      navigate('/home');
    } catch (err: any) {
      // Exibe mensagem de erro caso a autenticação falhe
      alert('Erro no login: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <>
      {/* Container principal da página de login */}
      <style>{` 
      `}</style>

      <div className="container">
        <div className="header-container">
          {/* Título e subtítulo da tela de login */}
          <h1 className="login-title">
              Bem-vindo de volta!
          </h1>
          <p className="login-subtitle">
              Acesse sua conta para acompanhar artigos exclusivos, favoritar e muito mais.
          </p>
        </div>

        {/* Formulário de login */}
        <form onSubmit={handleSubmit} className="form-container">
          {/* Campo para email */}
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          {/* Campo para senha */}
          <input
            name="senha"
            type="password"
            placeholder="Senha"
            value={form.senha}
            onChange={handleChange}
            required
          />
          {/* Link para recuperação de senha */}
          <div className="forgot-password" onClick={() => navigate('/forgot-password')}>
            Esqueceu a senha?
          </div>
          {/* Botão para enviar o formulário */}
          <button type="submit">Login</button>
          {/* Link para cadastro de novo usuário */}
          <div className="signup">
            <span>Novo usuário?</span>
            <span onClick={() => navigate('/cadastro')}>Clique aqui</span>
          </div>
        </form>
      </div>
    </>
  );
}
