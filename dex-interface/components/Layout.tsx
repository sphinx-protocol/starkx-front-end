import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Layout({ children }: any) {
  return (
    <div>
      <NavBar />
      {children}
      <Footer />
    </div>
  );
}
