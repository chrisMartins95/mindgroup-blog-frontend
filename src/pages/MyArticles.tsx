import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../styles/MyArticles.css";

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
    <div className="myarticles-container">
      <h2>🧑‍💼 Meus Artigos</h2>

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
            <div key={artigo.id} className="artigo-card">
              <Link
                to={`/articles/${artigo.id}`}
                className="artigo-link"
                onClick={(e) => {
                  if ((e.target as HTMLElement).tagName === "BUTTON") {
                    e.preventDefault();
                  }
                }}
              >
                <h3>{artigo.titulo}</h3>

                {artigo.imagem && (
                  <img
                    src={`http://localhost:3000/uploads/${artigo.imagem}`}
                    alt={`Imagem do artigo ${artigo.titulo}`}
                    className="artigo-imagem"
                  />
                )}

                <p className="artigo-conteudo">
                  {textoExibido}
                  {artigo.conteudo.length > 200 && (
                    <button onClick={() => toggleExpandido(artigo.id)} className="leia-mais">
                      {conteudoExpandido ? "Mostrar menos" : "Leia mais"}
                    </button>
                  )}
                </p>
              </Link>

              <div className="artigo-actions">
                <Link to={`/articles/${artigo.id}/edit`} className="btn-editar">
                  ✏️ Editar
                </Link>
                <button
                  onClick={() => abrirModalDeletar(artigo)}
                  className="btn-deletar"
                  aria-label={`Deletar artigo ${artigo.titulo}`}
                >
                  🗑️ Deletar
                </button>
              </div>
            </div>
          );
        })
      )}

      {modalOpen && artigoParaDeletar && (
        <div className="modal-backdrop" onClick={cancelarDelecao}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Deseja deletar este artigo?</h3>
            <p>
              {artigoParaDeletar.conteudo.length > 200
                ? artigoParaDeletar.conteudo.substring(0, 200) + "..."
                : artigoParaDeletar.conteudo}
            </p>

            <div className="modal-buttons">
              <button onClick={cancelarDelecao} className="btn-cancelar">
                Cancelar
              </button>
              <button onClick={confirmarDelecao} className="btn-confirmar">
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
