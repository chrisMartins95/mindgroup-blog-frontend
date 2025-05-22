import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface Artigo {
  id: number;
  titulo: string;
  conteudo: string;
  nome: string;
  imagem?: string;      // <-- imagem opcional
  createdAt: string;
}

const Home = () => {
  const [artigos, setArtigos] = useState<Artigo[]>([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchArtigos() {
      try {
        const response = await axios.get("http://localhost:3000/api/articles", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setArtigos(response.data);
      } catch (error) {
        alert("Erro ao carregar artigos.");
      }
    }

    fetchArtigos();
  }, [token]);

  return (
    <div
      style={{
        position: "relative",
        width: "375px",
        height: "812px",
        margin: "0 auto",
        background: "#FFFFFF",
        padding: "16px 20px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
      }}
    >
      {/* Header */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ fontFamily: "Inter, sans-serif", fontSize: "20px", margin: 0 }}>
          📰 Todos os Artigos
        </h2>

        {/* Ícone do usuário */}
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "#E0E0E0",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: 600,
          }}
          onClick={() => alert("Menu de opções (Perfil, Meus Artigos, Criar Artigo)")}
        >
          👤
        </div>
      </div>

      {/* Lista de artigos */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {artigos.map((artigo) => (
          <Link
            to={`/articles/${artigo.id}`}
            key={artigo.id}
            style={{
              border: "1px solid #E0E0E0",
              borderRadius: "12px",
              padding: "16px",
              textDecoration: "none",
              color: "#1B1B1B",
              backgroundColor: "#FAFAFA",
              fontFamily: "Inter, sans-serif",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {/* Header do card: autor + coração */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {/* Simulação da imagem do autor */}
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: "#C4C4C4",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "#fff",
                  }}
                >
                  {artigo.nome?.charAt(0).toUpperCase() || "A"}
                </div>
                <span style={{ fontSize: "14px" }}>{artigo.nome || "Desconhecido"}</span>
              </div>

              <span style={{ fontSize: "18px", color: "#ff5a5f", cursor: "pointer" }}>♡</span>
            </div>

            {/* Imagem do artigo, se existir */}
            {artigo.imagem && (
              <img
                src={`http://localhost:3000/uploads/${artigo.imagem}`}
                alt={`Imagem do artigo ${artigo.titulo}`}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  marginBottom: "8px",
                }}
              />
            )}

            {/* Conteúdo */}
            <h3 style={{ fontSize: "16px", margin: 0 }}>{artigo.titulo}</h3>
            <p style={{ fontSize: "14px", margin: 0 }}>
              {artigo.conteudo.length > 100
                ? artigo.conteudo.substring(0, 100) + "..."
                : artigo.conteudo}
            </p>
            <p style={{ fontSize: "12px", color: "#888", margin: 0 }}>
              Publicado em {new Date(artigo.createdAt).toLocaleDateString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
