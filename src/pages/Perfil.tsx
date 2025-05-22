// Importa hooks do React, biblioteca axios para requisições HTTP e hooks de autenticação/navegação
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "../styles/Perfil.css";

const Perfil = () => {
  // Obtém o usuário autenticado e o token do contexto de autenticação
  const { user, token } = useAuth();
  const navigate = useNavigate();

  // Se não houver usuário logado, exibe mensagem de restrição
  if (!user) {
    return (
      <p className="perfil-restrito">
        Você precisa estar logado para ver o perfil.
      </p>
    );
  }

  // Estados locais para os campos do formulário de perfil
  const [nome, setNome] = useState(user.nome || "");
  const [email] = useState(user.email || "");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  // Estado para o nome do arquivo do avatar (imagem de perfil)
  const [avatarFilename, setAvatarFilename] = useState("imagem-de-perfil123.png");

  // Função para salvar as alterações do perfil
  const handleSalvar = async () => {
    // Validação: senha e confirmação precisam ser iguais
    if (senha !== confirmarSenha) {
      alert("Senha e confirmar senha não coincidem.");
      return;
    }

    try {
      // Envia requisição para atualizar os dados do usuário na API
      await axios.put(
        `http://localhost:3000/api/users/${user.id}`,
        {
          nome,
          senha: senha || undefined, // Só envia senha se o campo não estiver vazio
          avatarFilename,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Envia o token JWT para autenticação
          },
        }
      );

      alert("Perfil atualizado com sucesso!");
      // Redireciona para a própria página de perfil após salvar
      navigate("/perfil");
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar perfil.");
    }
  };

  return (
    // Container principal da página de perfil
    <div className="perfil-container">
      <h2 className="perfil-titulo">👤 Meu Perfil</h2>

      {/* Bloco do avatar do usuário */}
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

      {/* Campo para editar o nome */}
      <div className="perfil-campo">
        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>

      {/* Campo de email (apenas leitura) */}
      <div className="perfil-campo">
        <label>Email:</label>
        <input type="email" value={email} readOnly className="readonly" />
      </div>

      {/* Campo para nova senha */}
      <div className="perfil-campo">
        <label>Nova Senha:</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Digite uma nova senha"
        />
      </div>

      {/* Campo para confirmar nova senha */}
      <div className="perfil-campo">
        <label>Confirmar Senha:</label>
        <input
          type="password"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          placeholder="Confirme a nova senha"
        />
      </div>

      {/* Botão para salvar as alterações */}
      <button onClick={handleSalvar} className="perfil-botao">
        💾 Salvar Alterações
      </button>
    </div>
  );
};

export default Perfil;
