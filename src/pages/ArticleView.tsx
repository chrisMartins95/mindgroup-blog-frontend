import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // 👈 importar o hook do auth

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
  autor_id: number;
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

  const navigate = useNavigate();
  const { user, token } = useAuth(); // 👈 pega user e token do contexto

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

  const handleDelete = async () => {
    const confirmar = window.confirm("Deseja realmente excluir este artigo?");
    if (!confirmar || !token) return;

    try {
      await axios.delete(`http://localhost:3000/api/articles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Artigo excluído com sucesso!");
      navigate("/");
    } catch (err) {
      alert("Erro ao excluir o artigo.");
      console.error(err);
    }
  };

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

      {/* 🔐 Mostrar botões apenas se o usuário logado for o autor */}
      {user?.id === article.autor_id && (
        <div style={{ marginTop: "2rem" }}>
          <button
            onClick={() => navigate(`/articles/${article.id}/edit`)} // ✅ Corrigido aqui
            style={{
              marginRight: "1rem",
              padding: "0.5rem 1rem",
              background: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            ✏️ Editar
          </button>

          <button
            onClick={handleDelete}
            style={{
              padding: "0.5rem 1rem",
              background: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            🗑️ Excluir
          </button>
        </div>
      )}
    </div>
  );
};

export default ArticleView;
