// Importa o tipo ReactNode e o componente Navbar
import { ReactNode } from "react";
import Navbar from "./Navbar";

// Componente de layout padrão para páginas privadas
const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {/* Navbar fixa no topo da aplicação */}
      <Navbar />
      {/* Área principal onde o conteúdo da página é exibido */}
      <main style={{ padding: "2rem" }}>{children}</main>
    </>
  );
};

export default Layout;
