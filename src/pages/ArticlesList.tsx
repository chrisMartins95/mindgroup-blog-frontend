import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/ArticlesList.css";

interface Article {
  id: number;
  titulo: string;
  conteudo: string;
  nome: string;
  data_publicacao: string;
  imagem?: {
    type: string;
    data: number[];
  } | null;
}

function bufferToBase64(buffer: { data: number[] } | null | undefined): string | null {
  if (!buffer?.data) return null;
  const base64 = btoa(
    new Uint8Array(buffer.data).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    )
  );
  return `data:image/jpeg;base64,${base64}`;
}

const ArticlesList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = useCallback(() => {
    setLoading(true);
    setError(null);
    axios
      .get("http://localhost:3000/api/articles")
      .then((res) => {
        setArticles(res.data);
      })
      .catch((err) => {
        console.error("Erro ao buscar artigos:", err);
        setError("Falha ao carregar artigos.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  if (loading) return <p className="status-msg">Carregando artigos...</p>;
  if (error) return <p className="status-msg">{error}</p>;

  return (
    <div className="articles-container">
      <h1>📰 Lista de Artigos</h1>
      {articles.length === 0 ? (
        <p>Nenhum artigo encontrado.</p>
      ) : (
        articles.map((artigo) => {
          const imageSrc = artigo.imagem ? bufferToBase64(artigo.imagem) : undefined;

          return (
            <div className="article-card" key={artigo.id}>
              <Link to={`/articles/${artigo.id}`} className="article-link">
                <h2>{artigo.titulo}</h2>
                <p>
                  ✍️ <strong>Autor:</strong> {artigo.nome}
                </p>
                <p>
                  📅 <strong>Publicado em:</strong>{" "}
                  {new Date(artigo.data_publicacao).toLocaleDateString("pt-BR")}
                </p>
                {imageSrc && (
                  <img
                    src={imageSrc}
                    alt={artigo.titulo}
                    className="article-image"
                  />
                )}
              </Link>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ArticlesList;
