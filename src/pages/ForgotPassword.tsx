// Importa ícone, hooks de navegação, hooks de estado e CSS da página
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/forgotPassword.css";

const ForgotPassword = () => {
  // Hook para navegação entre páginas
  const navigate = useNavigate();

  // Estado local para armazenar os dados do formulário de redefinição de senha
  const [form, setForm] = useState({
    email: "",
    novaSenha: "",
    confirmarNovaSenha: "",
  });

  // Atualiza o estado do formulário conforme o usuário digita
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Função chamada ao enviar o formulário de redefinição de senha
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação: senhas precisam ser iguais
    if (form.novaSenha !== form.confirmarNovaSenha) {
      alert("As senhas não conferem.");
      return;
    }

    // Aqui seria feita a chamada à API para redefinir a senha
    alert("Link para redefinir senha enviado para seu email (simulado).");
  };

  return (
    // Container principal da página de esqueci a senha
    <div className="forgot-container">
      {/* Header da página */}
      <header>
        <div className="forgot-header">
          {/* Botão para voltar para a página anterior */}
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

      {/* Formulário de redefinição de senha */}
      <main style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <form onSubmit={handleSubmit} className="forgot-form">
          {/* Campo para email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={handleChange}
            className="forgot-input"
          />

          {/* Campo para nova senha */}
          <input
            type="password"
            name="novaSenha"
            placeholder="Nova senha"
            required
            value={form.novaSenha}
            onChange={handleChange}
            className="forgot-input"
          />

          {/* Campo para confirmar nova senha */}
          <input
            type="password"
            name="confirmarNovaSenha"
            placeholder="Confirmar nova senha"
            required
            value={form.confirmarNovaSenha}
            onChange={handleChange}
            className="forgot-input"
          />

          {/* Botão para enviar o formulário */}
          <button type="submit" className="forgot-button">
            Alterar
          </button>
        </form>

        {/* Link para cadastro de novo usuário */}
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
