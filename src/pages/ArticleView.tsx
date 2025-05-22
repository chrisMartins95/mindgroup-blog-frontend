// Importa hooks do React, axios para requisições HTTP, hooks de navegação/params do React Router, hook de autenticação e CSS da página
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../styles/ArticleView.css";

// Define o tipo dos dados de um artigo
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
  // Obtém o ID do artigo pela URL
  const { id } = useParams<{ id: string }>();
  // Estado para armazenar os dados do artigo
  const [article, setArticle] = useState<Article | null>(null);
  // Estado para controle de carregamento e erro
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hooks de navegação e autenticação
  const navigate = useNavigate();
  const { user, token } = useAuth();

  // Busca os dados do artigo ao carregar a página
  useEffect(() => {
    async function fetchArticle() {
      try {
        // Requisição para buscar os dados do artigo pelo ID
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

  // Função para deletar o artigo (apenas se for o autor)
  const handleDelete = async () => {
    const confirmar = window.confirm("Deseja realmente excluir este artigo?");
    if (!confirmar || !token) return;

    try {
      // Envia requisição para deletar o artigo na API
      await axios.delete(`http://localhost:3000/api/articles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Artigo excluído com sucesso!");
      // Redireciona para a página inicial após exclusão
      navigate("/");
    } catch (err) {
      alert("Erro ao excluir o artigo.");
      console.error(err);
    }
  };

  // Exibe mensagem de carregando, erro ou artigo não encontrado
  if (loading) return <p className="center-text">Carregando artigo...</p>;
  if (error) return <p className="center-text">{error}</p>;
  if (!article) return <p className="center-text">Artigo não encontrado.</p>;

  return (
    // Container principal da visualização do artigo
    <div className="articleview-container">
      {/* Título do artigo */}
      <h1 className="articleview-title">{article.titulo}</h1>

      {/* Metadados do artigo: autor e data */}
      <p className="articleview-meta">
        ✍️ <strong>Autor:</strong> {article.nome}
      </p>
      <p className="articleview-meta">
        📅 <strong>Publicado em:</strong>{" "}
        {new Date(article.data_publicacao).toLocaleDateString("pt-BR")}
      </p>

      {/* Imagem do artigo, se houver */}
      {article.imagem && (
        <img
          src={`http://localhost:3000/uploads/${article.imagem}`}
          alt={article.titulo}
          className="articleview-image"
        />
      )}

      {/* Conteúdo do artigo */}
      <div className="articleview-content">
        {article.conteudo}
      </div>

      {/* Botões de editar e excluir, visíveis apenas para o autor */}
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
