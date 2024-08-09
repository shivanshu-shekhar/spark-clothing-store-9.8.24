import React from "react";
import Header from "./components/Header/Header";
import AppRoutes from "./routes/appRoutes";
import Footer from "./components/Footer/Footer";
import { HashRouter } from 'react-router-dom';
import './App.css';

function App() {
  return (
    //hashrouter for the SPA # without page refresh
    <HashRouter>
      <div>
        {/* header part */}
        <Header />
        {/* main content part */}
        <main data-testid="app-main" className="container mt-5 pt-3">
          <AppRoutes />
        </main>
        <hr />
        {/* footer part */}
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
