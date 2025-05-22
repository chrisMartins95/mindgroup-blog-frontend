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
      alert('Login realizado com sucesso!');
      navigate('/home');
    } catch (err: any) {
      alert('Erro no login: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="bg-white flex flex-row justify-center w-full min-h-screen items-center">
      <div className="bg-white w-[375px] h-auto p-8 rounded-lg shadow-md">
        <div className="flex flex-col w-full gap-6">
          <div className="flex flex-col items-start gap-2 w-full">
            <h1 className="font-bold text-2xl text-[#1b1b1b]">
              Bem-vindo de volta!
            </h1>
            <p className="font-normal text-sm text-[#1b1b1b]">
              Acesse sua conta para acompanhar artigos exclusivos, favoritar e muito mais.
            </p>
          </div>

          <div className="border-none shadow-none w-full p-4 bg-white rounded-md">
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="min-w-60 h-12 px-4 py-3 bg-white rounded border border-solid border-[#9e9e9e] text-[#1b1b1b] font-sans"
              />

              <input
                name="senha"
                type="password"
                placeholder="Senha"
                value={form.senha}
                onChange={handleChange}
                required
                className="min-w-60 h-12 px-4 py-3 bg-white rounded border border-solid border-[#9e9e9e] text-[#1b1b1b] font-sans"
              />

              <div
                className="self-stretch text-right text-[10px] text-[#1b1b1b] cursor-pointer"
                onClick={() => alert('Funcionalidade "Esqueceu a senha?" não implementada')}
              >
                Esqueceu a senha?
              </div>

              <button
                type="submit"
                className="flex h-[50px] items-center justify-center gap-2 px-4 py-2.5 w-full bg-zinc-900 rounded-2xl text-neutral-50 font-sans"
              >
                Login
              </button>
            </form>

            <div className="flex items-center justify-center gap-2.5 px-[86px] py-0 self-stretch w-full">
              <p className="text-[10px] text-center text-[#1b1b1b]">
                <span>Novo usuário? </span>
                <span
                  className="text-black cursor-pointer font-semibold underline"
                  onClick={() => navigate('/cadastro')}
                >
                  Clique aqui
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
