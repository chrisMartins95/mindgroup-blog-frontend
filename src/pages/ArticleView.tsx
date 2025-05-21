import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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
    new Uint8Array(buffer.data).reduce((data, byte) => data + String.fromCharCode(byte), "")
  );
  return `data:image/jpeg;base64,${base64}`;
}

const ArticleView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const response = await axios.get(`http://localhost:3000/api/articles/${id}`);
        setArticle(response.data);
      } catch (err) {
        setError("Erro ao carregar artigo.");
      } finally {
        setLoading(false);
      }
    }
    fetchArticle();
  }, [id]);

  if (loading) return <p>Carregando artigo...</p>;
  if (error) return <p>{error}</p>;
  if (!article) return <p>Artigo não encontrado.</p>;

  const imageSrc = bufferToBase64(article.imagem);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{article.titulo}</h1>
      <p>
        ✍️ <strong>Autor:</strong> {article.nome}
      </p>
      <p>
        📅 <strong>Publicado em:</strong>{" "}
        {new Date(article.data_publicacao).toLocaleDateString("pt-BR")}
      </p>
      {imageSrc && (
        <img
          src={imageSrc}
          alt={article.titulo}
          style={{ maxWidth: "400px", borderRadius: "6px", marginTop: "1rem" }}
        />
      )}
      <div style={{ marginTop: "2rem" }}>
        <p>{article.conteudo}</p>
      </div>
    </div>
  );
};

export default ArticleView;
