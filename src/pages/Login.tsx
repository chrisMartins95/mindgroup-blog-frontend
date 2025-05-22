import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import '../styles/Login.css';


export default function Login() {
  const [form, setForm] = useState({ email: '', senha: '' });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/auth/login', form);
      const { token, user } = res.data;
      login(token, user);
      navigate('/home');
    } catch (err: any) {
      alert('Erro no login: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <>
      <style>{` 
      `}</style>

      <div className="container">
        <div className="header-container">
          <h1 className="login-title">
              Bem-vindo de volta!
          </h1>
          <p className="login-subtitle">
              Acesse sua conta para acompanhar artigos exclusivos, favoritar e muito mais.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="form-container">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="senha"
            type="password"
            placeholder="Senha"
            value={form.senha}
            onChange={handleChange}
            required
          />
          <div className="forgot-password" onClick={() => navigate('/forgot-password')}>
            Esqueceu a senha?
          </div>
          <button type="submit">Login</button>
          <div className="signup">
            <span>Novo usuário?</span>
            <span onClick={() => navigate('/cadastro')}>Clique aqui</span>
          </div>
        </form>
      </div>
    </>
  );
}
