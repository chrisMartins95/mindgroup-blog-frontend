// Importa hooks do React e funções de navegação do React Router
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Importa a instância do Axios configurada para fazer requisições à API
import { api } from '../services/api';
// Importa o CSS específico da página de cadastro
import '../styles/Register.css';

export default function Register() {
  // Estado para armazenar os dados do formulário de cadastro
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    termos: false,
  });

  // Hook para navegação programática entre páginas
  const navigate = useNavigate();

  // Função para atualizar o estado do formulário conforme o usuário digita
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Função chamada ao enviar o formulário de cadastro
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação: usuário precisa aceitar os termos
    if (!form.termos) {
      alert('Você precisa concordar com os Termos de Uso e a Política de Privacidade.');
      return;
    }

    // Validação: senhas precisam ser iguais
    if (form.senha !== form.confirmarSenha) {
      alert('As senhas não conferem.');
      return;
    }

    try {
      // Envia os dados para a API para criar o novo usuário
      await api.post('/api/auth/register', {
        nome: form.nome,
        email: form.email,
        senha: form.senha,
      });
      alert('Cadastro realizado com sucesso!');
      // Redireciona para a tela de login após cadastro bem-sucedido
      navigate('/login');
    } catch (err: any) {
      // Exibe mensagem de erro caso a API retorne erro
      alert('Erro no cadastro: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    // Container principal da página de cadastro
    <div className="register-container">
      <div className="register-content">
        <div>
          {/* Título e subtítulo da página */}
          <h1 className="register-title">Criar conta</h1>
          <p className="register-subtitle">
            Crie sua conta para explorar conteúdos incríveis, seguir autores e participar da comunidade.
          </p>
        </div>

        {/* Formulário de cadastro */}
        <form onSubmit={handleSubmit} className="register-form">
          {/* Campo para nome */}
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

          {/* Campo para email */}
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

          {/* Campo para senha */}
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

          {/* Campo para confirmar senha */}
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

          {/* Checkbox para aceitar os termos de uso */}
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

          {/* Botão para enviar o formulário */}
          <button type="submit" className="register-button">Criar conta</button>
        </form>
      </div>

      {/* Link para a tela de login caso o usuário já tenha cadastro */}
      <p className="login-link">
        Já tem cadastro?{' '}
        <span onClick={() => navigate('/login')}>
          Clique aqui
        </span>
      </p>
    </div>
  );
}
