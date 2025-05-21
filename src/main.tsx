import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

import App from './App.tsx';
import Login from './pages/Login';
import Register from './pages/Register';
import NewArticle from './pages/NewArticle'; // exemplo de rota protegida


createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        <Route
          path="/new-article"
          element={
            <PrivateRoute>
              <NewArticle />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
</StrictMode>

);
