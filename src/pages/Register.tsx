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
    <div
      style={{
        position: 'relative',
        width: '375px',
        height: '812px',
        margin: '0 auto',
        backgroundColor: '#FFFFFF',
        padding: '70px 36px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <h1
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: '24px',
              lineHeight: '29px',
              color: '#1B1B1B',
              marginBottom: '12px',
            }}
          >
            Criar conta
          </h1>
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '21px',
              color: '#1B1B1B',
              textAlign: 'justify',
            }}
          >
            Crie sua conta para explorar conteúdos incríveis, seguir autores e participar da comunidade.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <input
            id="nome"
            name="nome"
            type="text"
            placeholder="Nome"
            value={form.nome}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            id="senha"
            name="senha"
            type="password"
            placeholder="Senha"
            value={form.senha}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            id="confirmarSenha"
            name="confirmarSenha"
            type="password"
            placeholder="Confirmar senha"
            value={form.confirmarSenha}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              id="termos"
              name="termos"
              type="checkbox"
              checked={form.termos}
              onChange={handleChange}
              style={{ width: '16px', height: '16px' }}
            />
            <label
              htmlFor="termos"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '12px',
                color: '#1B1B1B',
              }}
            >
              Li e concordo com os <b>Termos de Uso</b> e a <b>Política de Privacidade</b>.
            </label>
          </div>

          <button
            type="submit"
            style={{
              height: '50px',
              backgroundColor: '#1B1B1B',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '20px',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            Criar conta
          </button>
        </form>
      </div>

      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '12px',
          textAlign: 'center',
          marginTop: '20px',
          color: '#1B1B1B',
        }}
      >
        Já tem cadastro?{' '}
        <span
          style={{
            textDecoration: 'underline',
            cursor: 'pointer',
            color: 'black',
          }}
          onClick={() => navigate('/login')}
        >
          Clique aqui
        </span>
      </p>
    </div>
  );
}

const inputStyle = {
  height: '48px',
  padding: '12px 16px',
  border: '1px solid #9E9E9E',
  borderRadius: '6px',
  fontSize: '14px',
  fontFamily: "'Inter', sans-serif",
  color: '#1B1B1B',
  boxSizing: 'border-box' as const,
};
