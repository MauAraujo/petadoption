import React from "react";
import Header from "./NavBar";
import Footer from "./Footer";

export default function Layout(props) {
  return (
    <div>
      <Header />
      <section className="pt-5 my-3 ">{props.children}</section>
      <Footer />
    </div>
  );
}
