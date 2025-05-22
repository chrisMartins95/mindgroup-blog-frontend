import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

type Artigo = {
  id: number;
  titulo: string;
  conteudo: string;
  usuario_id: number;
  imagem?: string;
};

const MyArticles = () => {
  const [artigos, setArtigos] = useState<Artigo[]>([]);
  const { token } = useContext(AuthContext);

  // Estado da modal
  const [modalOpen, setModalOpen] = useState(false);
  const [artigoParaDeletar, setArtigoParaDeletar] = useState<Artigo | null>(null);

  useEffect(() => {
    const fetchMyArticles = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/articles/meus", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setArtigos(response.data);
      } catch (error) {
        alert("Erro ao buscar seus artigos.");
      }
    };

    fetchMyArticles();
  }, [token]);

  const abrirModalDeletar = (artigo: Artigo) => {
    setArtigoParaDeletar(artigo);
    setModalOpen(true);
  };

  const cancelarDelecao = () => {
    setArtigoParaDeletar(null);
    setModalOpen(false);
  };

  const confirmarDelecao = async () => {
    if (!artigoParaDeletar) return;

    try {
      await axios.delete(`http://localhost:3000/api/articles/${artigoParaDeletar.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setArtigos(artigos.filter((artigo) => artigo.id !== artigoParaDeletar.id));
      setModalOpen(false);
      //alert("Artigo deletado com sucesso!");
    } catch (error) {
      alert("Erro ao deletar o artigo.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "16px 20px",
        gap: "16px",
        position: "relative",
        width: "375px",
        height: "812px",
        background: "#FFFFFF",
        overflowY: "auto",
        margin: "0 auto",
      }}
    >
      <h2 style={{ marginBottom: "16px" }}>🧑‍💼 Meus Artigos</h2>

      {artigos.length === 0 ? (
        <p>Você ainda não criou nenhum artigo.</p>
      ) : (
        artigos.map((artigo) => (
          <div
            key={artigo.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "12px 16px",
              width: "100%",
              boxSizing: "border-box",
              background: "#fafafa",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <Link
              to={`/articles/${artigo.id}`}
              style={{
                color: "inherit",
                textDecoration: "none",
                display: "block",
              }}
            >
              <h3 style={{ margin: "0 0 8px 0" }}>{artigo.titulo}</h3>
              <p style={{ margin: 0, color: "#333", whiteSpace: "pre-wrap" }}>
                {artigo.conteudo.length > 200
                  ? artigo.conteudo.substring(0, 200) + "..."
                  : artigo.conteudo}
              </p>
            </Link>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "16px",
              }}
            >
              <Link
                to={`/articles/${artigo.id}/edit`}
                style={{
                  color: "#1b1b1b",
                  fontWeight: "600",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                ✏️ Editar
              </Link>
              <button
                onClick={() => abrirModalDeletar(artigo)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "red",
                  cursor: "pointer",
                  textDecoration: "underline",
                  fontWeight: "600",
                }}
                aria-label={`Deletar artigo ${artigo.titulo}`}
              >
                🗑️ Deletar
              </button>
            </div>
          </div>
        ))
      )}

      {/* Modal de confirmação de exclusão */}
      {modalOpen && artigoParaDeletar && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={cancelarDelecao} // fechar modal clicando fora
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "24px",
              width: "90%",
              maxWidth: "375px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()} // impedir fechar clicando dentro
          >
            <h3>Deseja deletar este artigo?</h3>
            <p style={{ color: "#666", whiteSpace: "pre-wrap" }}>
              {artigoParaDeletar.conteudo.length > 200
                ? artigoParaDeletar.conteudo.substring(0, 200) + "..."
                : artigoParaDeletar.conteudo}
            </p>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
              <button
                onClick={cancelarDelecao}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: "1px solid #999",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                Cancelar
              </button>
              <button
                onClick={confirmarDelecao}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: "red",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Confirmar exclusão
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyArticles;
