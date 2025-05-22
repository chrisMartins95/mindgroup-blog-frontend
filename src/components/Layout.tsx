import { ReactNode } from "react";
import Navbar from "./Navbar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <main style={{ padding: "2rem" }}>{children}</main>
    </>
  );
};

export default Layout;
