import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../styles/ArticleView.css";

interface Article {
  id: number;
  titulo: string;
  conteudo: string;
  nome: string;
  data_publicacao: string;
  imagem?: string | null;
  autor_id: number;
}

const ArticleView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { user, token } = useAuth();

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

  if (loading) return <p className="center-text">Carregando artigo...</p>;
  if (error) return <p className="center-text">{error}</p>;
  if (!article) return <p className="center-text">Artigo não encontrado.</p>;

  return (
    <div className="articleview-container">
      <h1 className="articleview-title">{article.titulo}</h1>

      <p className="articleview-meta">
        ✍️ <strong>Autor:</strong> {article.nome}
      </p>
      <p className="articleview-meta">
        📅 <strong>Publicado em:</strong>{" "}
        {new Date(article.data_publicacao).toLocaleDateString("pt-BR")}
      </p>

      {article.imagem && (
        <img
          src={`http://localhost:3000/uploads/${article.imagem}`}
          alt={article.titulo}
          className="articleview-image"
        />
      )}

      <div className="articleview-content">
        {article.conteudo}
      </div>

      {user?.id === article.autor_id && (
        <div className="articleview-buttons">
          <button
            onClick={() => navigate(`/articles/${article.id}/edit`)}
            className="btn btn-edit"
          >
            ✏️ Editar
          </button>

          <button onClick={handleDelete} className="btn btn-delete">
            🗑️ Excluir
          </button>
        </div>
      )}
    </div>
  );
};

export default ArticleView;
