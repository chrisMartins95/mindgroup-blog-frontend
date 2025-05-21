import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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

  if (loading) return <p>Carregando...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>✏️ Editar Artigo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
        </div>
        <div>
          <label>Conteúdo:</label>
          <textarea value={conteudo} onChange={(e) => setConteudo(e.target.value)} required />
        </div>
        <div>
          <label>Nova Imagem (opcional):</label>
          <input type="file" onChange={(e) => setImagem(e.target.files?.[0] ?? null)} />
        </div>
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
};

export default EditArticle;
