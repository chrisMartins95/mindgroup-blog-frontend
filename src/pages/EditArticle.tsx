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

  if (loading) return <p style={{ textAlign: "center" }}>Carregando...</p>;

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
      <h2 style={{ fontSize: "22px", marginBottom: "20px", textAlign: "center" }}>
        ✏️ Editar Artigo
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
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
            Nova Imagem (opcional)
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
            placeholder="Edite o título"
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
            placeholder="Edite seu artigo"
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
          Salvar Alterações
        </button>
      </form>
    </div>
  );
};

export default EditArticle;
