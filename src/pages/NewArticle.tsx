import { useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

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
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
        width: "90%",
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          fontSize: "22px",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Novo Artigo
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {/* Campo imagem */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label
            style={{
              fontWeight: "bold",
              fontSize: "14px",
              marginBottom: "6px",
            }}
          >
            Banner
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImagem(e.target.files?.[0] || null)}
            style={{
              height: "40px",
              padding: "6px 10px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "14px",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Campo título */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label
            style={{
              fontWeight: "bold",
              fontSize: "14px",
              marginBottom: "6px",
            }}
          >
            Título
          </label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            placeholder="Adicione um título"
            style={{
              height: "40px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Campo conteúdo */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label
            style={{
              fontWeight: "bold",
              fontSize: "14px",
              marginBottom: "6px",
            }}
          >
            Texto
          </label>
          <textarea
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
            required
            placeholder="Escreva seu artigo"
            style={{
              minHeight: "140px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "16px",
              resize: "vertical",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Botão */}
        <button
          type="submit"
          style={{
            height: "45px",
            backgroundColor: "#1b1b1b",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) =>
            ((e.target as HTMLButtonElement).style.backgroundColor = "#333")
          }
          onMouseLeave={(e) =>
            ((e.target as HTMLButtonElement).style.backgroundColor = "#1b1b1b")
          }
        >
          Publicar
        </button>
      </form>
    </div>
  );
};

export default NewArticle;
