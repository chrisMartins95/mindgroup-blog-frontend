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

  const [modalOpen, setModalOpen] = useState(false);
  const [artigoParaDeletar, setArtigoParaDeletar] = useState<Artigo | null>(null);
  const [expandido, setExpandido] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const fetchMyArticles = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/articles/meus", {
          headers: { Authorization: `Bearer ${token}` },
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
      setArtigos(artigos.filter((a) => a.id !== artigoParaDeletar.id));
      setModalOpen(false);
    } catch {
      alert("Erro ao deletar o artigo.");
    }
  };

  const toggleExpandido = (id: number) => {
    setExpandido((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div
      style={{
        position: "relative",
        maxWidth: "600px",
        width: "100%",
        height: "100vh",
        margin: "0 auto",
        background: "#FFFFFF",
        padding: "16px 20px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
      }}
    >
      <h2 style={{ marginBottom: "16px" }}>🧑‍💼 Meus Artigos</h2>

      {artigos.length === 0 ? (
        <p>Você ainda não criou nenhum artigo.</p>
      ) : (
        artigos.map((artigo) => {
          const conteudoExpandido = expandido[artigo.id] || false;
          const textoExibido = conteudoExpandido
            ? artigo.conteudo
            : artigo.conteudo.length > 200
            ? artigo.conteudo.substring(0, 200) + "..."
            : artigo.conteudo;

          return (
            <div
              key={artigo.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "12px",
                padding: "16px",
                width: "100%",
                boxSizing: "border-box",
                background: "#fafafa",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                wordWrap: "break-word",
              }}
            >
              <Link
                to={`/articles/${artigo.id}`}
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  display: "block",
                  wordWrap: "break-word",
                }}
                onClick={(e) => {
                  if ((e.target as HTMLElement).tagName === "BUTTON") {
                    e.preventDefault();
                  }
                }}
              >
                <h3 style={{ margin: "0 0 8px 0" }}>{artigo.titulo}</h3>

                {artigo.imagem && (
                  <img
                    src={`http://localhost:3000/uploads/${artigo.imagem}`}
                    alt={`Imagem do artigo ${artigo.titulo}`}
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "cover",
                      borderRadius: "12px",
                      marginBottom: "8px",
                      maxWidth: "100%",
                    }}
                  />
                )}

                <p
                  style={{
                    margin: 0,
                    color: "#333",
                    whiteSpace: "pre-wrap",
                    overflowWrap: "break-word",
                    fontSize: "14px",
                  }}
                >
                  {textoExibido}
                  {artigo.conteudo.length > 200 && (
                    <button
                      onClick={() => toggleExpandido(artigo.id)}
                      style={{
                        marginLeft: "8px",
                        background: "none",
                        border: "none",
                        color: "#007BFF",
                        cursor: "pointer",
                        padding: 0,
                        fontSize: "14px",
                        fontWeight: "bold",
                        textDecoration: "underline",
                      }}
                    >
                      {conteudoExpandido ? "Mostrar menos" : "Leia mais"}
                    </button>
                  )}
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
                    border: "1.5px solid #1b1b1b",
                    borderRadius: "8px",
                    padding: "6px 12px",
                    backgroundColor: "#f0f0f0",
                    transition: "background-color 0.3s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ddd")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
                >
                  ✏️ Editar
                </Link>
                <button
                  onClick={() => abrirModalDeletar(artigo)}
                  style={{
                    background: "transparent",
                    border: "1.5px solid red",
                    color: "red",
                    cursor: "pointer",
                    textDecoration: "underline",
                    fontWeight: "600",
                    borderRadius: "8px",
                    padding: "6px 12px",
                    transition: "background-color 0.3s, color 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "red";
                    e.currentTarget.style.color = "white";
                    e.currentTarget.style.textDecoration = "none";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "red";
                    e.currentTarget.style.textDecoration = "underline";
                  }}
                  aria-label={`Deletar artigo ${artigo.titulo}`}
                >
                  🗑️ Deletar
                </button>
              </div>
            </div>
          );
        })
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
          onClick={cancelarDelecao}
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
            onClick={(e) => e.stopPropagation()}
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
