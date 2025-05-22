// Importa hooks do React, axios para requisições HTTP, hooks de autenticação/navegação e o CSS da página
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "../styles/NewArticle.css";

const NewArticle = () => {
  // Obtém o usuário autenticado e o token do contexto de autenticação
  const { user, token } = useAuth();
  const navigate = useNavigate();

  // Estados locais para os campos do formulário de novo artigo
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [imagem, setImagem] = useState<File | null>(null);

  // Função chamada ao enviar o formulário de novo artigo
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação: só permite criar artigo se estiver autenticado
    if (!user) {
      alert("Usuário não autenticado.");
      return;
    }

    // Cria um FormData para enviar dados e imagem juntos (multipart/form-data)
    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("conteudo", conteudo);
    formData.append("autor_id", String(user.id));
    if (imagem) {
      formData.append("imagem", imagem);
    }

    try {
      // Envia requisição para criar o artigo na API
      await axios.post("http://localhost:3000/api/articles", formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Token JWT para autenticação
          "Content-Type": "multipart/form-data", // Tipo de conteúdo para upload de arquivo
        },
      });

      alert("Artigo criado com sucesso!");
      // Redireciona para a página inicial após criar o artigo
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Erro ao criar artigo.");
    }
  };

  return (
    // Container principal da página de novo artigo
    <div className="new-article-container">
      <h2 className="new-article-title">Novo Artigo</h2>

      {/* Formulário para criar novo artigo */}
      <form className="new-article-form" onSubmit={handleSubmit}>
        {/* Campo para upload de imagem/banner */}
        <div className="form-group">
          <label className="form-label">Banner</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImagem(e.target.files?.[0] || null)}
            className="form-input"
          />
        </div>

        {/* Campo para título do artigo */}
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

        {/* Campo para conteúdo/texto do artigo */}
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

        {/* Botão para publicar o artigo */}
        <button type="submit" className="submit-button">
          Publicar
        </button>
      </form>
    </div>
  );
};

export default NewArticle;
