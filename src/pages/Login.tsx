import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api'; // <- importando o axios configurado

export default function Login() {
  const [form, setForm] = useState({ email: '', senha: '' });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', form);  // <-- usei api.post aqui
      localStorage.setItem('token', res.data.token);
      alert('Login realizado com sucesso!');
      navigate('/artigos'); // redireciona após login
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
