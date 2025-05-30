// Importa Link e hooks de navegação do React Router, hooks do React e contexto de autenticação
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  // Obtém funções de logout, usuário autenticado e hooks de navegação
  const { logout, user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  // Estado para controlar se o menu dropdown está aberto
  const [menuAberto, setMenuAberto] = useState(false);
  // Ref para detectar clique fora do dropdown
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fecha o dropdown ao clicar fora dele
  useEffect(() => {
    const handleClickFora = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMenuAberto(false);
      }
    };
    document.addEventListener("mousedown", handleClickFora);
    return () => {
      document.removeEventListener("mousedown", handleClickFora);
    };
  }, []);

  // Função para logout e redirecionamento
  const handleLogout = () => {
    logout();
    setMenuAberto(false);
    navigate("/login");
  };

  return (
    // Barra de navegação principal
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem 2rem",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #ddd",
        fontFamily: "Arial, sans-serif",
        position: "relative",
      }}
    >
      {/* Links principais à esquerda */}
      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
        <Link to="/home" style={linkEstilo(location.pathname === "/home")}>
          Home
        </Link>

        <Link
          to="/my-articles"
          style={linkEstilo(location.pathname === "/my-articles")}
        >
          Meus Artigos
        </Link>
      </div>

      {/* Foto do usuário e menu dropdown */}
      {user ? (
        <div style={{ position: "relative" }} ref={dropdownRef}>
          {/* Exibe imagem do usuário se houver, senão mostra inicial do nome */}
          {user.imagem ? (
            <img
              src={user.imagem}
              alt="Usuário"
              onClick={() => setMenuAberto(!menuAberto)}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                cursor: "pointer",
                border: "2px solid #1b1b1b",
              }}
            />
          ) : (
            <div
              onClick={() => setMenuAberto(!menuAberto)}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: "#C4C4C4",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: "14px",
                cursor: "pointer",
                border: "2px solid #1b1b1b",
                userSelect: "none",
              }}
            >
              {user.nome?.charAt(0).toUpperCase() || "U"}
            </div>
          )}

          {/* Dropdown de opções do usuário */}
          {menuAberto && (
            <div
              style={{
                position: "absolute",
                top: "40px",
                right: 0,
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                width: "180px",
                zIndex: 100,
                display: "flex",
                flexDirection: "column",
                fontFamily: "Arial, sans-serif",
              }}
            >
              <button
                onClick={() => {
                  navigate("/perfil");
                  setMenuAberto(false);
                }}
                style={btnStyle}
              >
                Perfil
              </button>
              <button
                onClick={() => {
                  navigate("/new-article");
                  setMenuAberto(false);
                }}
                style={btnStyle}
              >
                Novo Artigo
              </button>
              <hr style={{ margin: "8px 0", borderColor: "#ddd" }} />
              <button onClick={handleLogout} style={btnStyle}>
                Sair
              </button>
            </div>
          )}
        </div>
      ) : (
        // Caso não esteja logado, mostra os botões login e cadastro
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Link to="/login" style={linkEstilo(location.pathname === "/login")}>
            🔑 Login
          </Link>
          <Link
            to="/cadastro"
            style={linkEstilo(location.pathname === "/cadastro")}
          >
            📝 Cadastro
          </Link>
        </div>
      )}
    </nav>
  );
};

// Função utilitária para estilizar links da navbar
const linkEstilo = (ativo = false): React.CSSProperties => ({
  textDecoration: "none",
  color: ativo ? "#1b1b1b" : "#333",
  fontWeight: ativo ? "bold" : "normal",
  fontSize: "15px",
});

// Estilo dos botões do dropdown
const btnStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  padding: "12px 16px",
  textAlign: "left",
  cursor: "pointer",
  fontSize: "14px",
  color: "#1b1b1b",
  width: "100%",
};

export default Navbar;
