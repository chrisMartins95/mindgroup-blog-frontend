import { useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "../styles/NewArticle.css";

const NewArticle = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [imagem, setImagem] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("Usuário não autenticado.");
      return;
    }

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("conteudo", conteudo);
    formData.append("autor_id", String(user.id));
    if (imagem) {
      formData.append("imagem", imagem);
    }

    try {
      await axios.post("http://localhost:3000/api/articles", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Artigo criado com sucesso!");
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Erro ao criar artigo.");
    }
  };

  return (
    <div className="new-article-container">
      <h2 className="new-article-title">Novo Artigo</h2>

      <form className="new-article-form" onSubmit={handleSubmit}>
        {/* Campo imagem */}
        <div className="form-group">
          <label className="form-label">Banner</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImagem(e.target.files?.[0] || null)}
            className="form-input"
          />
        </div>

        {/* Campo título */}
        <div className="form-group">
          <label className="form-label">Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            placeholder="Adicione um título"
            className="form-input"
          />
        </div>

        {/* Campo conteúdo */}
        <div className="form-group">
          <label className="form-label">Texto</label>
          <textarea
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
            required
            placeholder="Escreva seu artigo"
            className="form-textarea"
          />
        </div>

        {/* Botão */}
        <button type="submit" className="submit-button">
          Publicar
        </button>
      </form>
    </div>
  );
};

export default NewArticle;
