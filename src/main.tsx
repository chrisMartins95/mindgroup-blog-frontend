// Importa o StrictMode do React para ajudar a identificar problemas na aplicação durante o desenvolvimento
import { StrictMode } from 'react';
// Importa a função para criar a raiz da aplicação React
import { createRoot } from 'react-dom/client';
// Importa os componentes de roteamento do React Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importa o contexto de autenticação para gerenciar o login do usuário em toda a aplicação
import { AuthProvider } from './context/AuthContext';
// Importa o componente de rota privada, que protege rotas que exigem autenticação
import PrivateRoute from './components/PrivateRoute';

// Importa as páginas principais da aplicação
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import NewArticle from './pages/NewArticle';
import ArticlesList from './pages/ArticlesList';
import ArticleView from './pages/ArticleView';
import EditArticle from './pages/EditArticle';
import MyArticles from './pages/MyArticles'; // Página para listar artigos do usuário logado
import Layout from './components/Layout'; // Componente de layout comum (navbar, etc)
import Perfil from './pages/Perfil'; // Página de perfil do usuário
import ForgotPassword from "./pages/ForgotPassword"; // Página de recuperação de senha

// Cria a raiz da aplicação e renderiza todos os componentes dentro dela
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* BrowserRouter permite navegação entre páginas sem recarregar o site */}
    <BrowserRouter>
      {/* AuthProvider fornece o contexto de autenticação para todos os componentes filhos */}
      <AuthProvider>
        {/* Define todas as rotas da aplicação */}
        <Routes>
          {/* Rotas públicas: acessíveis sem login */}
          <Route path="/" element={<Login />} /> {/* Página inicial: tela de login */}
          <Route path="/login" element={<Login />} /> {/* Rota alternativa para login */}
          <Route path="/cadastro" element={<Register />} /> {/* Tela de cadastro de usuário */}
          <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Recuperação de senha */}

          {/* Rotas privadas: só acessíveis para usuários autenticados */}
          {/* Todas as rotas privadas usam o componente Layout para manter a navegação e visual padrão */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Layout>
                  <Home /> {/* Página inicial após login */}
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/articles"
            element={
              <PrivateRoute>
                <Layout>
                  <ArticlesList /> {/* Lista todos os artigos do sistema */}
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/my-articles"
            element={
              <PrivateRoute>
                <Layout>
                  <MyArticles /> {/* Lista apenas os artigos do usuário logado */}
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/new-article"
            element={
              <PrivateRoute>
                <Layout>
                  <NewArticle /> {/* Página para criar um novo artigo */}
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/articles/:id"
            element={
              <PrivateRoute>
                <Layout>
                  <ArticleView /> {/* Visualiza um artigo específico */}
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/articles/:id/edit"
            element={
              <PrivateRoute>
                <Layout>
                  <EditArticle /> {/* Edita um artigo específico */}
                </Layout>
              </PrivateRoute>
            }
          />

          {/* Página de perfil do usuário logado */}
          <Route
            path="/perfil"
            element={
              <PrivateRoute>
                <Layout>
                  <Perfil /> {/* Exibe e permite editar dados do perfil */}
                </Layout>
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
