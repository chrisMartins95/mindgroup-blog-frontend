import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Home.css";

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
  const [artigos, setArtigos] = useState<Artigo[]>([]);
  const token = localStorage.getItem("token");
  const [expandido, setExpandido] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    async function fetchArtigos() {
      try {
        const response = await axios.get("http://localhost:3000/api/articles", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setArtigos(response.data);
      } catch (error) {
        alert("Erro ao carregar artigos.");
      }
    }

    fetchArtigos();
  }, [token]);

  const toggleExpandido = (id: number) => {
    setExpandido((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="home-container">
      <div className="artigo-lista">
        {artigos.map((artigo) => {
          const conteudoExpandido = expandido[artigo.id] || false;
          const textoExibido = conteudoExpandido
            ? artigo.conteudo
            : artigo.conteudo.length > 100
            ? artigo.conteudo.substring(0, 100) + "..."
            : artigo.conteudo;

          return (
            <Link
              to={`/articles/${artigo.id}`}
              key={artigo.id}
              className="artigo-card"
              onClick={(e) => {
                if ((e.target as HTMLElement).tagName === "BUTTON") {
                  e.preventDefault();
                }
              }}
            >
              <div className="card-header">
                <div className="autor">
                  <div className="autor-imagem">
                    {artigo.nome?.charAt(0).toUpperCase() || "A"}
                  </div>
                  <span className="autor-nome">{artigo.nome || "Desconhecido"}</span>
                </div>
                <span className="like-icon">♡</span>
              </div>

              {artigo.imagem && (
                <img
                  src={`http://localhost:3000/uploads/${artigo.imagem}`}
                  alt={`Imagem do artigo ${artigo.titulo}`}
                  className="artigo-imagem"
                />
              )}

              <h3 className="artigo-titulo">{artigo.titulo}</h3>
              <p className="artigo-conteudo">
                {textoExibido}
                {artigo.conteudo.length > 100 && (
                  <button onClick={() => toggleExpandido(artigo.id)} className="leia-mais">
                    {conteudoExpandido ? "Mostrar menos" : "Leia mais"}
                  </button>
                )}
              </p>
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
