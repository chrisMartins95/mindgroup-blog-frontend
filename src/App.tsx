import { Link } from 'react-router-dom';

function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>📚 Bem-vindo ao Blog</h1>
      <p>Faça login ou crie uma conta para começar a publicar artigos.</p>

      <div style={{ marginTop: '1.5rem' }}>
        <Link to="/login" style={{ marginRight: '1rem' }}>
          🔐 Login
        </Link>
        <Link to="/cadastro">
          📝 Cadastro
        </Link>
      </div>
    </div>
  );
}

export default App;
