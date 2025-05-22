import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import '../styles/Register.css';

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
    <div className="register-container">
      <div className="register-content">
        <div>
          <h1 className="register-title">Criar conta</h1>
          <p className="register-subtitle">
            Crie sua conta para explorar conteúdos incríveis, seguir autores e participar da comunidade.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <input
            id="nome"
            name="nome"
            type="text"
            placeholder="Nome"
            value={form.nome}
            onChange={handleChange}
            required
            className="register-input"
          />

          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="register-input"
          />

          <input
            id="senha"
            name="senha"
            type="password"
            placeholder="Senha"
            value={form.senha}
            onChange={handleChange}
            required
            className="register-input"
          />

          <input
            id="confirmarSenha"
            name="confirmarSenha"
            type="password"
            placeholder="Confirmar senha"
            value={form.confirmarSenha}
            onChange={handleChange}
            required
            className="register-input"
          />

          <div className="checkbox-container">
            <input
              id="termos"
              name="termos"
              type="checkbox"
              checked={form.termos}
              onChange={handleChange}
            />
            <label htmlFor="termos" className="checkbox-label">
              Li e concordo com os <b>Termos de Uso</b> e a <b>Política de Privacidade</b>.
            </label>
          </div>

          <button type="submit" className="register-button">Criar conta</button>
        </form>
      </div>

      <p className="login-link">
        Já tem cadastro?{' '}
        <span onClick={() => navigate('/login')}>
          Clique aqui
        </span>
      </p>
    </div>
  );
}
