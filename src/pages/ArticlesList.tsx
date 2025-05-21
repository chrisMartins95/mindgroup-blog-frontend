import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Article {
  id: number;
  titulo: string;
  conteudo: string;
  nome: string; // nome do autor (vindo de JOIN no backend)
  data_publicacao: string;
  imagem?: {
    type: string;
    data: number[];
  } | null;  // aceita null
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

  if (loading) return <p>Carregando artigos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>📰 Lista de Artigos</h1>
      {articles.length === 0 ? (
        <p>Nenhum artigo encontrado.</p>
      ) : (
        articles.map((artigo) => {
          const imageSrc = artigo.imagem ? bufferToBase64(artigo.imagem) : undefined;

          return (
            <div
              key={artigo.id}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                marginBottom: "1rem",
                borderRadius: "8px",
              }}
            >
              <Link
                to={`/articles/${artigo.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
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
                    style={{ maxWidth: "300px", borderRadius: "6px", marginTop: "1rem" }}
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
