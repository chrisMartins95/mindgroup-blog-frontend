import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api'; // axios já configurado

export default function Register() {
  const [form, setForm] = useState({ nome: '', email: '', senha: '' });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Ajuste da URL: colocar /api/auth/register pra bater com backend
      await api.post('/api/auth/register', form);
      alert('Cadastro realizado com sucesso!');
      navigate('/login'); // redireciona para login após cadastro
    } catch (err: any) {
      alert('Erro no cadastro: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div>
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange}
          required
        />
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
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
