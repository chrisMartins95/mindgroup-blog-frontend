import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "relative",
        width: "375px",
        height: "812px",
        margin: "0 auto",
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        padding: "70px 36px 0",
        gap: "70px",
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
        <form style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <input
            type="email"
            placeholder="Email"
            required
            style={{
              height: "48px",
              padding: "12px 16px",
              border: "1px solid #9E9E9E",
              borderRadius: "6px",
              fontSize: "14px",
              fontFamily: "'Inter', sans-serif",
              color: "#1B1B1B",
              boxSizing: "border-box",
            }}
          />

          <input
            type="password"
            placeholder="Nova senha"
            required
            style={{
              height: "48px",
              padding: "12px 16px",
              border: "1px solid #9E9E9E",
              borderRadius: "6px",
              fontSize: "14px",
              fontFamily: "'Inter', sans-serif",
              color: "#1B1B1B",
              boxSizing: "border-box",
            }}
          />

          <input
            type="password"
            placeholder="Confirmar nova senha"
            required
            style={{
              height: "48px",
              padding: "12px 16px",
              border: "1px solid #9E9E9E",
              borderRadius: "6px",
              fontSize: "14px",
              fontFamily: "'Inter', sans-serif",
              color: "#1B1B1B",
              boxSizing: "border-box",
            }}
          />
        </form>

        <button
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

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "0 86px",
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

export default ForgotPassword;
