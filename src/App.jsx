import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout.jsx";
import Notfound from "./pages/not-found/Notfound.jsx";
import Home from "./pages/home/Home.jsx";
import Arthandling from "./pages/art-handling/Arthandling.jsx";
import Packing from "./pages/packing/Packing.jsx";
import Transport from "./pages/transport/Transport.jsx";
import Artstorage from "./pages/art-storage/Artstorage.jsx";
import Moreservices from "./pages/more-services/Moreservices.jsx";
import About from "./pages/about/About.jsx";
import Contact from "./pages/contact/Contact.jsx";
import Estimate from "./pages/estimate/Estimate.jsx";
import ScrollToTop from "./ScrollToTop.jsx";
import { HeroUIProvider } from "@heroui/react";
import "./style.scss";

function App() {
  return (
    <HeroUIProvider theme="dark">
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/art-handling" element={<Arthandling />} />
            <Route path="/packing" element={<Packing />} />
            <Route path="/transport" element={<Transport />} />
            <Route path="/art-storage" element={<Artstorage />} />
            <Route path="/more-services" element={<Moreservices />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/free-estimate" element={<Estimate />} />
            <Route path="*" element={<Notfound />} />
          </Route>
        </Routes>
      </Router>
    </HeroUIProvider>
  );
}

export default App;
