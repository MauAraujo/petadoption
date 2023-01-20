import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "antd/dist/antd.css";
import "./assets/scss/global.scss";
import "@fontsource/open-sans";
import "typeface-montserrat";
import AppNavigation from "./pages/navigation";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  require("dotenv").config();

  return (
    <Router>
      <ScrollToTop />
      <AppNavigation />
    </Router>
  );
}

export default App;
