// Importa hooks do React, Link do React Router, axios para requisições HTTP e CSS da página
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Home.css";

// Define o tipo dos dados de um artigo
interface Artigo {
  id: number;
  titulo: string;
  conteudo: string;
  nome: string;
  imagem?: string;
  createdAt: string;
  data_publicacao: string;
}

const Home = () => {
  // Estado para armazenar todos os artigos
  const [artigos, setArtigos] = useState<Artigo[]>([]);
  // Obtém o token JWT do localStorage para autenticação nas requisições
  const token = localStorage.getItem("token");
  // Estado para controlar se o conteúdo do artigo está expandido ou não
  const [expandido, setExpandido] = useState<{ [key: number]: boolean }>({});

  // Busca os artigos ao carregar a página
  useEffect(() => {
    async function fetchArtigos() {
      try {
        // Requisição para buscar todos os artigos do sistema
        const response = await axios.get("http://localhost:3000/api/articles", {
          headers: {
            Authorization: `Bearer {token}`,
          },
        });
        setArtigos(response.data);
      } catch (error) {
        alert("Erro ao carregar artigos.");
      }
    }

    fetchArtigos();
  }, [token]);

  // Alterna entre mostrar mais ou menos conteúdo do artigo
  const toggleExpandido = (id: number) => {
    setExpandido((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    // Container principal da página inicial (lista de artigos)
    <div className="home-container">
      <div className="artigo-lista">
        {artigos.map((artigo) => {
          // Define se o conteúdo do artigo está expandido
          const conteudoExpandido = expandido[artigo.id] || false;
          // Mostra apenas parte do conteúdo se não estiver expandido
          const textoExibido = conteudoExpandido
            ? artigo.conteudo
            : artigo.conteudo.length > 100
            ? artigo.conteudo.substring(0, 100) + "..."
            : artigo.conteudo;

          return (
            // Cada artigo é um card clicável que leva para a página do artigo
            <Link
              to={`/articles/{artigo.id}`}
              key={artigo.id}
              className="artigo-card"
              onClick={(e) => {
                // Evita navegação se clicar nos botões internos
                if ((e.target as HTMLElement).tagName === "BUTTON") {
                  e.preventDefault();
                }
              }}
            >
              {/* Cabeçalho do card: autor e ícone de like */}
              <div className="card-header">
                <div className="autor">
                  <div className="autor-imagem">
                    {artigo.nome?.charAt(0).toUpperCase() || "A"}
                  </div>
                  <span className="autor-nome">{artigo.nome || "Desconhecido"}</span>
                </div>
                <span className="like-icon">♡</span>
              </div>

              {/* Imagem do artigo, se houver */}
              {artigo.imagem && (
                <img
                  src={`http://localhost:3000/uploads/{artigo.imagem}`}
                  alt={`Imagem do artigo {artigo.titulo}`}
                  className="artigo-imagem"
                />
              )}

              {/* Título do artigo */}
              <h3 className="artigo-titulo">{artigo.titulo}</h3>
              {/* Conteúdo do artigo (resumido ou completo) */}
              <p className="artigo-conteudo">
                {textoExibido}
                {/* Botão para expandir/recolher o texto se for longo */}
                {artigo.conteudo.length > 100 && (
                  <button onClick={() => toggleExpandido(artigo.id)} className="leia-mais">
                    {conteudoExpandido ? "Mostrar menos" : "Leia mais"}
                  </button>
                )}
              </p>
              {/* Data de publicação formatada */}
              <p className="artigo-data">
                Publicado em {new Date(artigo.data_publicacao).toLocaleDateString("pt-BR")}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
