// Importa hooks do React, axios para requisições HTTP, contexto de autenticação, Link do React Router e CSS da página
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../styles/MyArticles.css";

// Define o tipo dos dados de um artigo
type Artigo = {
  id: number;
  titulo: string;
  conteudo: string;
  usuario_id: number;
  imagem?: string;
};

const MyArticles = () => {
  // Estado para armazenar os artigos do usuário logado
  const [artigos, setArtigos] = useState<Artigo[]>([]);
  // Obtém o token JWT do contexto de autenticação
  const { token } = useContext(AuthContext);

  // Estados para controle do modal de confirmação de exclusão
  const [modalOpen, setModalOpen] = useState(false);
  const [artigoParaDeletar, setArtigoParaDeletar] = useState<Artigo | null>(null);
  // Estado para controlar se o conteúdo do artigo está expandido ou não
  const [expandido, setExpandido] = useState<{ [key: number]: boolean }>({});

  // Busca os artigos do usuário ao carregar a página
  useEffect(() => {
    const fetchMyArticles = async () => {
      try {
        // Requisição para buscar apenas os artigos do usuário autenticado
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

  // Abre o modal de confirmação de exclusão para um artigo específico
  const abrirModalDeletar = (artigo: Artigo) => {
    setArtigoParaDeletar(artigo);
    setModalOpen(true);
  };

  // Fecha o modal de exclusão sem deletar
  const cancelarDelecao = () => {
    setArtigoParaDeletar(null);
    setModalOpen(false);
  };

  // Confirma a exclusão do artigo selecionado
  const confirmarDelecao = async () => {
    if (!artigoParaDeletar) return;
    try {
      await axios.delete(`http://localhost:3000/api/articles/${artigoParaDeletar.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Remove o artigo deletado da lista exibida
      setArtigos(artigos.filter((a) => a.id !== artigoParaDeletar.id));
      setModalOpen(false);
    } catch {
      alert("Erro ao deletar o artigo.");
    }
  };

  // Alterna entre mostrar mais ou menos conteúdo do artigo
  const toggleExpandido = (id: number) => {
    setExpandido((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    // Container principal da página de "Meus Artigos"
    <div className="myarticles-container">
      <h2>🧑‍💼 Meus Artigos</h2>

      {/* Se não houver artigos, exibe mensagem. Caso contrário, lista os artigos */}
      {artigos.length === 0 ? (
        <p>Você ainda não criou nenhum artigo.</p>
      ) : (
        artigos.map((artigo) => {
          // Define se o conteúdo do artigo está expandido
          const conteudoExpandido = expandido[artigo.id] || false;
          // Mostra apenas parte do conteúdo se não estiver expandido
          const textoExibido = conteudoExpandido
            ? artigo.conteudo
            : artigo.conteudo.length > 200
            ? artigo.conteudo.substring(0, 200) + "..."
            : artigo.conteudo;

          return (
            <div key={artigo.id} className="artigo-card">
              {/* Link para visualizar o artigo completo */}
              <Link
                to={`/articles/${artigo.id}`}
                className="artigo-link"
                onClick={(e) => {
                  // Evita navegação se clicar nos botões internos
                  if ((e.target as HTMLElement).tagName === "BUTTON") {
                    e.preventDefault();
                  }
                }}
              >
                <h3>{artigo.titulo}</h3>

                {/* Exibe imagem do artigo, se houver */}
                {artigo.imagem && (
                  <img
                    src={`http://localhost:3000/uploads/${artigo.imagem}`}
                    alt={`Imagem do artigo ${artigo.titulo}`}
                    className="artigo-imagem"
                  />
                )}

                {/* Exibe o conteúdo do artigo (resumido ou completo) */}
                <p className="artigo-conteudo">
                  {textoExibido}
                  {/* Botão para expandir/recolher o texto se for longo */}
                  {artigo.conteudo.length > 200 && (
                    <button onClick={() => toggleExpandido(artigo.id)} className="leia-mais">
                      {conteudoExpandido ? "Mostrar menos" : "Leia mais"}
                    </button>
                  )}
                </p>
              </Link>

              {/* Botões de ação: editar e deletar */}
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

      {/* Modal de confirmação de exclusão */}
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
