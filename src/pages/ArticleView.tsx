import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

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

  if (loading) return <p style={{ textAlign: "center" }}>Carregando artigo...</p>;
  if (error) return <p style={{ textAlign: "center" }}>{error}</p>;
  if (!article) return <p style={{ textAlign: "center" }}>Artigo não encontrado.</p>;

  const containerStyle: React.CSSProperties = {
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto",
    fontFamily: "Arial",
    width: "90%",
    boxSizing: "border-box",
  };

  const buttonsContainerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    flexWrap: "wrap",
  };

  const buttonStyleBase: React.CSSProperties = {
    padding: "10px 20px",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: "10px",
  };

  const editButtonStyle: React.CSSProperties = {
    ...buttonStyleBase,
    backgroundColor: "#1b1b1b",
  };

  const deleteButtonStyle: React.CSSProperties = {
    ...buttonStyleBase,
    backgroundColor: "#dc3545",
  };

  const contentStyle: React.CSSProperties = {
    marginBottom: "30px",
    lineHeight: 1.8,
    fontSize: "16px",
    whiteSpace: "pre-wrap",
    backgroundColor: "#f9f9f9",
    padding: "15px 20px",
    borderRadius: "8px",
    textAlign: "justify",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    overflowWrap: "break-word",
    maxWidth: "100%",
    boxSizing: "border-box",
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>{article.titulo}</h1>

      <p style={{ fontSize: "14px", color: "#555", marginBottom: "4px" }}>
        ✍️ <strong>Autor:</strong> {article.nome}
      </p>
      <p style={{ fontSize: "14px", color: "#555", marginBottom: "20px" }}>
        📅 <strong>Publicado em:</strong>{" "}
        {new Date(article.data_publicacao).toLocaleDateString("pt-BR")}
      </p>

      {article.imagem && (
        <img
          src={`http://localhost:3000/uploads/${article.imagem}`}
          alt={article.titulo}
          style={{
            maxWidth: "100%",
            height: "auto",
            borderRadius: "6px",
            marginBottom: "20px",
            display: "block",
          }}
        />
      )}

      <div style={contentStyle}>
        {article.conteudo}
      </div>

      {user?.id === article.autor_id && (
        <div style={buttonsContainerStyle}>
          <button
            onClick={() => navigate(`/articles/${article.id}/edit`)}
            style={editButtonStyle}
          >
            ✏️ Editar
          </button>

          <button onClick={handleDelete} style={deleteButtonStyle}>
            🗑️ Excluir
          </button>
        </div>
      )}
    </div>
  );
};

export default ArticleView;
