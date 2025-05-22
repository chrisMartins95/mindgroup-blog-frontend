// Importa hooks do React, hooks de navegação/params do React Router, axios para requisições HTTP e CSS da página
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/EditArticle.css";

const EditArticle = () => {
  // Obtém o ID do artigo pela URL
  const { id } = useParams<{ id: string }>();
  // Hook para navegação entre páginas
  const navigate = useNavigate();
  // Obtém o token JWT do localStorage para autenticação
  const token = localStorage.getItem("token");

  // Estados locais para os campos do formulário de edição
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [imagem, setImagem] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);

  // Busca os dados do artigo ao carregar a página
  useEffect(() => {
    async function fetchArticle() {
      try {
        // Requisição para buscar os dados do artigo pelo ID
        const response = await axios.get(`http://localhost:3000/api/articles/${id}`);
        setTitulo(response.data.titulo);
        setConteudo(response.data.conteudo);
      } catch (error) {
        alert("Erro ao carregar artigo");
      } finally {
        setLoading(false);
      }
    }
    fetchArticle();
  }, [id]);

  // Função chamada ao enviar o formulário de edição
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Cria um FormData para enviar dados e imagem juntos (multipart/form-data)
    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("conteudo", conteudo);
    if (imagem) formData.append("imagem", imagem);

    try {
      // Envia requisição para atualizar o artigo na API
      await axios.put(`http://localhost:3000/api/articles/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Artigo atualizado com sucesso!");
      // Redireciona para a página do artigo após salvar
      navigate(`/articles/${id}`);
    } catch (error) {
      alert("Erro ao atualizar artigo.");
    }
  };

  // Exibe mensagem de carregando enquanto busca os dados do artigo
  if (loading) return <p className="loading-text">Carregando...</p>;

  return (
    // Container principal da página de edição de artigo
    <div className="edit-article-container">
      <h2 className="edit-article-title">✏️ Editar Artigo</h2>

      {/* Formulário para editar artigo */}
      <form onSubmit={handleSubmit} className="edit-article-form">
        {/* Campo para nova imagem (opcional) */}
        <div className="form-group">
          <label className="form-label">Nova Imagem (opcional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImagem(e.target.files?.[0] || null)}
            className="form-input-file"
          />
        </div>

        {/* Campo para editar título */}
        <div className="form-group">
          <label className="form-label">Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            placeholder="Edite o título"
            className="form-input-text"
          />
        </div>

        {/* Campo para editar conteúdo */}
        <div className="form-group">
          <label className="form-label">Texto</label>
          <textarea
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
            required
            placeholder="Edite seu artigo"
            className="form-textarea"
          />
        </div>

        {/* Botão para salvar as alterações */}
        <button type="submit" className="btn-submit">
          Salvar Alterações
        </button>
      </form>
    </div>
  );
};

export default EditArticle;
