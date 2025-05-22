import { useEffect, useState } from "react";
import axios from "axios";

interface Artigo {
  id: number;
  titulo: string;
  conteudo: string;
  usuario: {
    nome: string;
  };
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
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>📰 Todos os Artigos</h1>

      {artigos.map((artigo) => (
        <div key={artigo.id} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
          <h2>{artigo.titulo}</h2>
          <p>{artigo.conteudo}</p>
          <p><strong>Autor:</strong> {artigo.usuario?.nome || "Desconhecido"}</p>
          <p><strong>Data:</strong> {new Date(artigo.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
