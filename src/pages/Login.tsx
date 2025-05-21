import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../hooks/useAuth'; // 👈 importar o hook do contexto

export default function Login() {
  const [form, setForm] = useState({ email: '', senha: '' });
  const navigate = useNavigate();
  const { login } = useAuth(); // 👈 usar o login do contexto

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/auth/login', form);

      const { token, user } = res.data;

      login(token, user); // 👈 salvar no contexto e localStorage
      alert('Login realizado com sucesso!');
      navigate('/new-article');
    } catch (err: any) {
      alert('Erro no login: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
