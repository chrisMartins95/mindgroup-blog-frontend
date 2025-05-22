import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/EditArticle.css";

const EditArticle = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [imagem, setImagem] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticle() {
      try {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("conteudo", conteudo);
    if (imagem) formData.append("imagem", imagem);

    try {
      await axios.put(`http://localhost:3000/api/articles/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Artigo atualizado com sucesso!");
      navigate(`/articles/${id}`);
    } catch (error) {
      alert("Erro ao atualizar artigo.");
    }
  };

  if (loading) return <p className="loading-text">Carregando...</p>;

  return (
    <div className="edit-article-container">
      <h2 className="edit-article-title">✏️ Editar Artigo</h2>

      <form onSubmit={handleSubmit} className="edit-article-form">
        <div className="form-group">
          <label className="form-label">Nova Imagem (opcional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImagem(e.target.files?.[0] || null)}
            className="form-input-file"
          />
        </div>

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

        <button type="submit" className="btn-submit">
          Salvar Alterações
        </button>
      </form>
    </div>
  );
};

export default EditArticle;
