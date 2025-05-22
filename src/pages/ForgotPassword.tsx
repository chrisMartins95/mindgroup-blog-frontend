import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/forgotPassword.css";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    novaSenha: "",
    confirmarNovaSenha: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.novaSenha !== form.confirmarNovaSenha) {
      alert("As senhas não conferem.");
      return;
    }

    // Aqui você pode implementar a chamada API para enviar o link de redefinição
    alert("Link para redefinir senha enviado para seu email (simulado).");
  };

  return (
    <div className="forgot-container">
      {/* Header */}
      <header>
        <div className="forgot-header">
          <button
            onClick={() => navigate(-1)}
            className="back-button"
            aria-label="Voltar"
          >
            <ArrowLeftIcon size={24} />
          </button>

          <h1 className="forgot-title">Esqueci a senha</h1>
        </div>

        <p className="forgot-description">
          Sem problemas! Informe seu e-mail e enviaremos um link para redefinir sua senha.
        </p>
      </header>

      {/* Formulário */}
      <main style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <form onSubmit={handleSubmit} className="forgot-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={handleChange}
            className="forgot-input"
          />

          <input
            type="password"
            name="novaSenha"
            placeholder="Nova senha"
            required
            value={form.novaSenha}
            onChange={handleChange}
            className="forgot-input"
          />

          <input
            type="password"
            name="confirmarNovaSenha"
            placeholder="Confirmar nova senha"
            required
            value={form.confirmarNovaSenha}
            onChange={handleChange}
            className="forgot-input"
          />

          <button type="submit" className="forgot-button">
            Alterar
          </button>
        </form>

        <div className="forgot-footer">
          <p style={{ margin: 0 }}>
            Novo usuário?{" "}
            <span
              onClick={() => navigate("/cadastro")}
              className="forgot-link"
            >
              Clique aqui
            </span>
          </p>
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;
