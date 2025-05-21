import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { logout, user } = useContext(AuthContext);

  return (
    <nav style={{ display: "flex", gap: "1rem", padding: "1rem", background: "#f4f4f4" }}>
      <Link to="/">🏠 Início</Link>

      {user && (
        <>
          <Link to="/new-article">✍️ Novo Artigo</Link>
          <button onClick={logout} style={{ marginLeft: "auto" }}>
            🔓 Sair
          </button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
