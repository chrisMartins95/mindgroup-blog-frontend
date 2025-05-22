import { useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Perfil = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <p style={{ textAlign: "center", padding: "2rem" }}>Você precisa estar logado para ver o perfil.</p>;
  }

  const [nome, setNome] = useState(user.nome || "");
  const [email] = useState(user.email || "");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [avatarFilename, setAvatarFilename] = useState("imagem-de-perfil123.png");

  const handleSalvar = async () => {
    if (senha !== confirmarSenha) {
      alert("Senha e confirmar senha não coincidem.");
      return;
    }

    try {
      await axios.put(
        `http://localhost:3000/api/users/${user.id}`,
        {
          nome,
          senha: senha || undefined,
          avatarFilename,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Perfil atualizado com sucesso!");
      navigate("/perfil");
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar perfil.");
    }
  };

  return (
    <div style={{
      padding: "2rem",
      maxWidth: "600px",
      margin: "0 auto",
      fontFamily: "Arial, sans-serif"
    }}>
      <h2 style={{
        marginBottom: "1.5rem",
        fontSize: "22px",
        textAlign: "center"
      }}>
        👤 Meu Perfil
      </h2>

      {/* Avatar e nome do arquivo */}
      <div style={{
        marginBottom: "1.5rem",
        display: "flex",
        alignItems: "center",
        gap: "1rem"
      }}>
        <img
          src="https://c.animaapp.com/maysj1rlpFyWIb/img/avatar-1.png"
          alt="Avatar"
          width={72}
          height={72}
          style={{ borderRadius: "50%" }}
        />
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", marginBottom: "0.25rem" }}>Arquivo da imagem:</label>
          <input
            type="text"
            value={avatarFilename}
            onChange={(e) => setAvatarFilename(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "6px",
              border: "1px solid #ccc"
            }}
          />
        </div>
      </div>

      {/* Nome */}
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", marginBottom: "0.25rem" }}>Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        />
      </div>

      {/* Email (readonly) */}
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", marginBottom: "0.25rem" }}>Email:</label>
        <input
          type="email"
          value={email}
          readOnly
          style={{
            width: "100%",
            padding: "0.5rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            backgroundColor: "#f9f9f9"
          }}
        />
      </div>

      {/* Senha */}
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", marginBottom: "0.25rem" }}>Nova Senha:</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
          placeholder="Digite uma nova senha"
        />
      </div>

      {/* Confirmar senha */}
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", marginBottom: "0.25rem" }}>Confirmar Senha:</label>
        <input
          type="password"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
          placeholder="Confirme a nova senha"
        />
      </div>

      {/* Botão salvar */}
      <button
        onClick={handleSalvar}
        style={{
          width: "100%",
          padding: "0.75rem",
          backgroundColor: "#1b1b1b",
          color: "#fff",
          fontWeight: "bold",
          border: "none",
          borderRadius: "10px",
          fontSize: "15px",
          cursor: "pointer",
          marginTop: "1rem"
        }}
      >
        💾 Salvar Alterações
      </button>
    </div>
  );
};

export default Perfil;
