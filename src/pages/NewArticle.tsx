import { useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';

const NewArticle = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [imagem, setImagem] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("conteudo", conteudo);
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
      navigate("/"); // redireciona após criação
    } catch (err) {
      console.error(err);
      alert("Erro ao criar artigo.");
    }
  };

  return (
    
    <div>
      <Navbar /> {/* 👈 Navbar aparece no topo da página */}
      <h2>Criar novo artigo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Conteúdo:</label>
          <textarea
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Imagem:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImagem(e.target.files?.[0] || null)}
          />
        </div>

        <button type="submit">Publicar</button>
      </form>
    </div>
  );
};

export default NewArticle;
