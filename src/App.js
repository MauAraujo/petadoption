import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import './assets/scss/global.scss';
import AppNavigation from './pages/app-navigation';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
      <Router>
        <ScrollToTop />
        <AppNavigation />
      </Router>
  );
}

export default App;
