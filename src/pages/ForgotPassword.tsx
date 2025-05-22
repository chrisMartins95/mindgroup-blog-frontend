import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    novaSenha: "",
    confirmarNovaSenha: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
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
    <div
      style={{
        position: "relative",
        maxWidth: "400px",
        width: "90%",
        minHeight: "100vh",
        margin: "0 auto",
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        padding: "70px 20px 40px",
        gap: "70px",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <header>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            marginBottom: "20px",
          }}
        >
          <button
            onClick={() => navigate(-1)}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              height: "24px",
              width: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Voltar"
          >
            <ArrowLeftIcon size={24} />
          </button>

          <h1
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "24px",
              lineHeight: "28.8px",
              color: "#1B1B1B",
              margin: 0,
              textAlign: "center",
              flex: 1,
            }}
          >
            Esqueci a senha
          </h1>
        </div>

        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "21px",
            color: "#1B1B1B",
            textAlign: "justify",
            margin: 0,
          }}
        >
          Sem problemas! Informe seu e-mail e enviaremos um link para redefinir sua senha.
        </p>
      </header>

      {/* Formulário */}
      <main style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "24px" }}
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="password"
            name="novaSenha"
            placeholder="Nova senha"
            required
            value={form.novaSenha}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="password"
            name="confirmarNovaSenha"
            placeholder="Confirmar nova senha"
            required
            value={form.confirmarNovaSenha}
            onChange={handleChange}
            style={inputStyle}
          />

          <button
            type="submit"
            style={{
              height: "50px",
              width: "100%",
              backgroundColor: "#1B1B1B",
              color: "#FAFAFA",
              border: "none",
              borderRadius: "20px",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Alterar
          </button>
        </form>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "0 10px",
            fontFamily: "'Inter', sans-serif",
            fontSize: "10px",
            lineHeight: "12px",
            color: "#1B1B1B",
            textAlign: "center",
          }}
        >
          <p style={{ margin: 0 }}>
            Novo usuário?{" "}
            <span
              onClick={() => navigate("/cadastro")}
              style={{
                cursor: "pointer",
                textDecoration: "underline",
                fontWeight: 600,
                color: "#000",
              }}
            >
              Clique aqui
            </span>
          </p>
        </div>
      </main>
    </div>
  );
};

const inputStyle = {
  height: "48px",
  padding: "12px 16px",
  border: "1px solid #9E9E9E",
  borderRadius: "6px",
  fontSize: "14px",
  fontFamily: "'Inter', sans-serif",
  color: "#1B1B1B",
  boxSizing: "border-box" as const,
  width: "100%",
};

export default ForgotPassword;
