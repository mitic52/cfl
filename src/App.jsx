import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout.jsx";
import Notfound from "./pages/not-found/Notfound.jsx";
import Home from "./pages/home/Home.jsx";
import Arthandling from "./pages/art-handling/Arthandling.jsx";
import Packing from "./pages/packing/Packing.jsx";
import Transport from "./pages/transport/Transport.jsx";
import Artstorage from "./pages/art-storage/Artstorage.jsx";
import ScrollToTop from "./ScrollToTop.jsx";
import "./style.scss";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/art-handling" element={<Arthandling />} />
          <Route path="/packing" element={<Packing />} />
          <Route path="/transport" element={<Transport />} />
          <Route path="/art-storage" element={<Artstorage />} />
          <Route path="/contact" element={<div>Contact</div>} />
          <Route path="*" element={<Notfound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
