import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { logout, user } = useContext(AuthContext);

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1.5rem",
        padding: "1rem 2rem",
        background: "#f4f4f4",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      {/* Links sempre visíveis */}
      <Link to="/" style={{ fontWeight: "bold", textDecoration: "none" }}>
        🏠 Início
      </Link>

      <Link to="/articles" style={{ textDecoration: "none" }}>
        📰 Artigos
      </Link>

      {/* Se estiver logado */}
      {user ? (
        <>
          <Link to="/new-article" style={{ textDecoration: "none" }}>
            ✍️ Novo Artigo
          </Link>
          {/* Espaço flexível pra empurrar o botão para a direita */}
          <div style={{ marginLeft: "auto" }}>
            <button
              onClick={logout}
              style={{
                cursor: "pointer",
                padding: "0.4rem 0.8rem",
                border: "none",
                borderRadius: "4px",
                backgroundColor: "#e74c3c",
                color: "white",
                fontWeight: "bold",
              }}
            >
              🔓 Sair
            </button>
          </div>
        </>
      ) : (
        // Se não estiver logado, pode ter opções de login/cadastro aqui, se quiser
        <div style={{ marginLeft: "auto" }}>
          <Link to="/login" style={{ marginRight: "1rem", textDecoration: "none" }}>
            🔑 Login
          </Link>
          <Link to="/cadastro" style={{ textDecoration: "none" }}>
            📝 Cadastro
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

