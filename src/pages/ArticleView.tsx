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
  imagem?: string | null; // <- agora é string (nome do arquivo)
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
        console.log("Artigo carregado:", response.data);
        // Veja o valor da imagem:
        console.log("Valor de article.imagem:", response.data.imagem);
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

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", fontFamily: "Arial" }}>
      {/* Título do artigo */}
      <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>{article.titulo}</h1>

      {/* Informações do autor e data */}
      <p style={{ fontSize: "14px", color: "#555", marginBottom: "4px" }}>
        ✍️ <strong>Autor:</strong> {article.nome}
      </p>
      <p style={{ fontSize: "14px", color: "#555", marginBottom: "20px" }}>
        📅 <strong>Publicado em:</strong>{" "}
        {new Date(article.data_publicacao).toLocaleDateString("pt-BR")}
      </p>

      {/* Imagem */}
      {article.imagem && (
        <img
          src={`http://localhost:3000/uploads/${article.imagem}`}
          alt={article.titulo}
          style={{
            maxWidth: "100%",
            height: "auto",
            borderRadius: "6px",
            marginBottom: "20px",
            display: "block"
          }}
        />
      )}

      {/* Conteúdo */}
      <div style={{ marginBottom: "30px", lineHeight: "1.6", fontSize: "15px", whiteSpace: "pre-wrap" }}>
        {article.conteudo}
      </div>

      {/* Botões de ação (se autor) */}
      {user?.id === article.autor_id && (
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <button
            onClick={() => navigate(`/articles/${article.id}/edit`)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#1b1b1b",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            ✏️ Editar
          </button>

          <button
            onClick={handleDelete}
            style={{
              padding: "10px 20px",
              backgroundColor: "#dc3545",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: "bold",
              cursor: "pointer"
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
