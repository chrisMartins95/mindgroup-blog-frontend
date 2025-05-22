// Importa o Axios, uma biblioteca para fazer requisições HTTP
import axios from 'axios';

// Cria uma instância do Axios já configurada para ser usada em toda a aplicação
export const api = axios.create({
  // Define a URL base para todas as requisições (aponta para o backend local)
  baseURL: 'http://localhost:3000', // Altere se o backend estiver em outra porta ou endereço
  headers: {
    // Define o tipo de conteúdo padrão das requisições como JSON
    'Content-Type': 'application/json',
  },
});