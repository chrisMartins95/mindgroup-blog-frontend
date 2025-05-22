import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

type Artigo = {
  id: number;
  titulo: string;
  conteudo: string;
  usuario_id: number;
  imagem?: string;
};

const MyArticles = () => {
  const [artigos, setArtigos] = useState<Artigo[]>([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchMyArticles = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/articles/meus", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setArtigos(response.data);
      } catch (error) {
        alert("Erro ao buscar seus artigos.");
      }
    };

    fetchMyArticles();
  }, [token]);

  return (
    <div>
      <h2>🧑‍💼 Meus Artigos</h2>
      {artigos.length === 0 ? (
        <p>Você ainda não criou nenhum artigo.</p>
      ) : (
        artigos.map((artigo) => (
          <div key={artigo.id} style={{ border: "1px solid #ccc", margin: "1rem 0", padding: "1rem" }}>
            <h3>{artigo.titulo}</h3>
            <p>{artigo.conteudo}</p>
            <Link to={`/articles/${artigo.id}/edit`}>✏️ Editar</Link>
            {" | "}
            <Link to={`/articles/${artigo.id}`}>👁️ Ver</Link>
          </div>
        ))
      )}
    </div>
  );
};

export default MyArticles;
