import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

export default function Register() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    termos: false,
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.termos) {
      alert('Você precisa concordar com os Termos de Uso e a Política de Privacidade.');
      return;
    }

    if (form.senha !== form.confirmarSenha) {
      alert('As senhas não conferem.');
      return;
    }

    try {
      await api.post('/api/auth/register', {
        nome: form.nome,
        email: form.email,
        senha: form.senha,
      });
      alert('Cadastro realizado com sucesso!');
      navigate('/login');
    } catch (err: any) {
      alert('Erro no cadastro: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div>
      <h1>Registrar</h1>
      <p>
        Crie sua conta para explorar conteúdos incríveis, seguir autores e participar da comunidade.
      </p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome:</label><br />
          <input
            id="nome"
            name="nome"
            type="text"
            placeholder="Nome"
            value={form.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label><br />
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="senha">Senha:</label><br />
          <input
            id="senha"
            name="senha"
            type="password"
            placeholder="Senha"
            value={form.senha}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="confirmarSenha">Confirmar senha:</label><br />
          <input
            id="confirmarSenha"
            name="confirmarSenha"
            type="password"
            placeholder="Confirmar senha"
            value={form.confirmarSenha}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <input
            id="termos"
            name="termos"
            type="checkbox"
            checked={form.termos}
            onChange={handleChange}
          />
          <label htmlFor="termos">
            Li e concordo com os Termos de Uso e a Política de Privacidade.
          </label>
        </div>

        <button type="submit">Criar conta</button>
      </form>

      <p>
        Já tem cadastro?{' '}
        <span
          style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
          onClick={() => navigate('/login')}
        >
          Clique aqui
        </span>
      </p>
    </div>
  );
}
