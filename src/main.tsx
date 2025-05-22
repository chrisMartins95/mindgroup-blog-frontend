import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import NewArticle from './pages/NewArticle';
import ArticlesList from './pages/ArticlesList';
import ArticleView from './pages/ArticleView';
import EditArticle from './pages/EditArticle';
import MyArticles from './pages/MyArticles'; // Importado
import Layout from './components/Layout';
import Perfil from './pages/Perfil'; // Importa a página Perfil
import ForgotPassword from "./pages/ForgotPassword";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Rotas privadas dentro do Layout (navbar, etc) */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Layout>
                  <Home />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/articles"
            element={
              <PrivateRoute>
                <Layout>
                  <ArticlesList />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/my-articles"
            element={
              <PrivateRoute>
                <Layout>
                  <MyArticles />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/new-article"
            element={
              <PrivateRoute>
                <Layout>
                  <NewArticle />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/articles/:id"
            element={
              <PrivateRoute>
                <Layout>
                  <ArticleView />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="/articles/:id/edit"
            element={
              <PrivateRoute>
                <Layout>
                  <EditArticle />
                </Layout>
              </PrivateRoute>
            }
          />

          {/* Rota nova: Perfil (apenas logados) */}
          <Route
            path="/perfil"
            element={
              <PrivateRoute>
                <Layout>
                  <Perfil />
                </Layout>
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
