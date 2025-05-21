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
        justifyContent: "space-between", // 🔧 garante espaçamento automático
        padding: "1rem 2rem",
        background: "#f4f4f4",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      {/* Links à esquerda */}
      <div style={{ display: "flex", gap: "1.5rem" }}>
        <Link to="/" style={{ fontWeight: "bold", textDecoration: "none" }}>
          🏠 Início
        </Link>

        <Link to="/articles" style={{ textDecoration: "none" }}>
          📰 Artigos
        </Link>

        {user && (
          <Link to="/new-article" style={{ textDecoration: "none" }}>
            ✍️ Novo Artigo
          </Link>
        )}
      </div>

      {/* Ações à direita */}
      <div>
        {user ? (
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
        ) : (
          <>
            <Link
              to="/login"
              style={{
                marginRight: "1rem",
                textDecoration: "none",
                color: "#333",
              }}
            >
              🔑 Login
            </Link>
            <Link
              to="/cadastro"
              style={{
                textDecoration: "none",
                color: "#333",
              }}
            >
              📝 Cadastro
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
