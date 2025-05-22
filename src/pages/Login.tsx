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
      navigate('/home');
    } catch (err: any) {
      alert('Erro no login: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <>
      <style>{`
        .container {
          position: relative;
          max-width: 375px;
          width: 100%;
          min-height: 100vh;
          margin: 0 auto;
          background-color: #FFFFFF;
          display: flex;
          flex-direction: column;
          padding: 70px 20px 0;
          gap: 70px;
          box-sizing: border-box;
        }

        .header-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          width: 100%;
          max-width: 303px;
        }

        .form-container {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 20px;
          width: 100%;
          max-width: 303px;
        }

        input {
          box-sizing: border-box;
          display: flex;
          align-items: center;
          padding: 12px 16px;
          width: 100%;
          height: 48px;
          background-color: #FFFFFF;
          border: 1px solid #9E9E9E;
          border-radius: 4px;
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          color: #1B1B1B;
        }

        button {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px 16px;
          gap: 8px;
          width: 100%;
          height: 50px;
          background-color: #18181B;
          border-radius: 16px;
          color: #FAFAFA;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 500;
          border: none;
          cursor: pointer;
        }

        .forgot-password {
          width: 100%;
          text-align: right;
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          color: #1B1B1B;
          cursor: pointer;
        }

        .signup {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          width: 100%;
          height: 12px;
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          color: #1B1B1B;
        }

        .signup span:last-child {
          cursor: pointer;
          text-decoration: underline;
          font-weight: 600;
          color: #1B1B1B;
        }

        @media (max-width: 400px) {
          .container {
            padding: 40px 16px 0;
            gap: 40px;
          }
          .header-container,
          .form-container {
            max-width: 100%;
          }
        }
      `}</style>

      <div className="container">
        <div className="header-container">
          <h1 style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '24px', lineHeight: '120%', color: '#1B1B1B', margin: 0 }}>
            Bem-vindo de volta!
          </h1>
          <p style={{ fontFamily: 'Montserrat', fontWeight: 400, fontSize: '14px', lineHeight: '150%', color: '#1B1B1B', margin: 0 }}>
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
