import { useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "../styles/Perfil.css";

const Perfil = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <p className="perfil-restrito">
        Você precisa estar logado para ver o perfil.
      </p>
    );
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
    <div className="perfil-container">
      <h2 className="perfil-titulo">👤 Meu Perfil</h2>

      <div className="perfil-avatar-bloco">
        <img
          src="https://c.animaapp.com/maysj1rlpFyWIb/img/avatar-1.png"
          alt="Avatar"
          width={72}
          height={72}
          className="perfil-avatar"
        />
        <div className="perfil-campo">
          <label>Arquivo da imagem:</label>
          <input
            type="text"
            value={avatarFilename}
            onChange={(e) => setAvatarFilename(e.target.value)}
          />
        </div>
      </div>

      <div className="perfil-campo">
        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>

      <div className="perfil-campo">
        <label>Email:</label>
        <input type="email" value={email} readOnly className="readonly" />
      </div>

      <div className="perfil-campo">
        <label>Nova Senha:</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Digite uma nova senha"
        />
      </div>

      <div className="perfil-campo">
        <label>Confirmar Senha:</label>
        <input
          type="password"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          placeholder="Confirme a nova senha"
        />
      </div>

      <button onClick={handleSalvar} className="perfil-botao">
        💾 Salvar Alterações
      </button>
    </div>
  );
};

export default Perfil;
