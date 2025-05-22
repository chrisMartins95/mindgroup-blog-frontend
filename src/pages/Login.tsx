import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../hooks/useAuth';

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
      //alert('Login realizado com sucesso!');
      navigate('/home');
    } catch (err: any) {
      alert('Erro no login: ' + (err.response?.data?.error || err.message));
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
        display: 'flex',
        flexDirection: 'column',
        padding: '70px 36px 0',
        gap: '70px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '303px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '303px' }}>
          <h1
            style={{
              fontFamily: 'Inter',
              fontWeight: 700,
              fontSize: '24px',
              lineHeight: '120%',
              color: '#1B1B1B',
              margin: 0,
            }}
          >
            Bem-vindo de volta!
          </h1>
          <p
            style={{
              fontFamily: 'Montserrat',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '150%',
              color: '#1B1B1B',
              margin: 0,
            }}
          >
            Acesse sua conta para acompanhar artigos exclusivos, favoritar e muito mais.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '20px',
          width: '303px',
        }}
      >
        {/* Campo Email */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={{
              boxSizing: 'border-box',
              display: 'flex',
              alignItems: 'center',
              padding: '12px 16px',
              width: '100%',
              height: '48px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #9E9E9E',
              borderRadius: '4px',
              fontFamily: 'Inter',
              fontSize: '16px',
              color: '#1B1B1B',
            }}
          />
        </div>

        {/* Campo Senha */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
          <input
            name="senha"
            type="password"
            placeholder="Senha"
            value={form.senha}
            onChange={handleChange}
            required
            style={{
              boxSizing: 'border-box',
              display: 'flex',
              alignItems: 'center',
              padding: '12px 16px',
              width: '100%',
              height: '48px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #9E9E9E',
              borderRadius: '4px',
              fontFamily: 'Inter',
              fontSize: '16px',
              color: '#1B1B1B',
            }}
          />
        </div>

        {/* Esqueceu a senha */}
        <div
          onClick={() => navigate('/forgot-password')}
          style={{
            width: '100%',
            textAlign: 'right',
            fontFamily: 'Inter',
            fontSize: '10px',
            color: '#1B1B1B',
            cursor: 'pointer',
          }}
        >
          Esqueceu a senha?
        </div>

        {/* Botão de login */}
        <button
          type="submit"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px 16px',
            gap: '8px',
            width: '100%',
            height: '50px',
            backgroundColor: '#18181B',
            borderRadius: '16px',
            color: '#FAFAFA',
            fontFamily: 'Inter',
            fontSize: '14px',
            fontWeight: 500,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Login
        </button>

        {/* Link para cadastro */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            width: '100%',
            height: '12px',
            fontFamily: 'Inter',
            fontSize: '10px',
            color: '#1B1B1B',
          }}
        >
          <span>Novo usuário?</span>
          <span
            onClick={() => navigate('/cadastro')}
            style={{
              cursor: 'pointer',
              textDecoration: 'underline',
              fontWeight: '600',
              color: '#1B1B1B',
            }}
          >
            Clique aqui
          </span>
        </div>
      </form>
    </div>
  );
}
