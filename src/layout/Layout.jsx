import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import logo from "../assets/logo/logo.svg";
import menu from "../assets/icons/menu.svg";
import close from "../assets/icons/close.svg";
import "./style.scss";

const Layout = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="navigation">
        <div className="wrapper">
          <Link to="/">
            <img className="logo" src={logo} />
          </Link>
          <div className="links">
            <Link to="/art-handling">Art handling</Link>
            <Link to="/packing">Packing</Link>
            <Link to="/transport">Transport</Link>
            <Link to="/art-storage">Art storage</Link>
            <Link to="/more-services">More services</Link>
          </div>
          <Link to="/free-estimate" className="free-estimate-nav-link">
            <div className="free-estimate-nav">Free estimate</div>
          </Link>
          <div className="open-menu" onClick={() => setMenuOpen(!menuOpen)}>
            <img src={!menuOpen ? menu : close} />
          </div>
          <div className="blur-wrap" style={{ display: menuOpen ? "block" : "none" }}>
            <div className="links-list">
              <Link to="/art-handling">Art handling</Link>
              <Link to="/packing">Packing</Link>
              <Link to="/transport">Transport</Link>
              <Link to="/art-storage">Art storage</Link>
              <Link to="/more-services">More services</Link>
            </div>
            <div className="copyright">
              <div className="spearator" />
              <p>CFL art services Copyright © 2025 All Rights Reserved</p>
            </div>
          </div>
        </div>
      </div>
      <main style={{ minHeight: "90vh" }}>
        <Outlet />
      </main>
      <div className="footer">
        <div className="wrapper">
          <div className="wrap">
            <div className="links-title">Contact</div>
            <div className="links-footer">
              <Link to="/about">About us</Link>
              <p>4325 38th St.</p>
              <p>Long Island City, NY 11101</p>
              <Link className="marked" to="tel:+1-718-392-2500">
                Phone: +1 (718) 392-2500
              </Link>
              <Link className="marked" to="mailto:contact@cflartservices.com">
                contact@cflartservices.com
              </Link>
            </div>
          </div>
          <div className="wrap">
            <div className="links-title">Services</div>
            <div className="links-footer">
              <Link to="/transport">Transport</Link>
              <Link to="/art-storage">Art storage</Link>
              <Link to="/packing">Packing</Link>
              <Link to="/art-handling">Art handling</Link>
              <Link to="/more-services">Additional services</Link>
            </div>
          </div>
          <div className="wrap">
            <div className="links-title">Legal</div>
            <div className="links-footer">
              <Link to="/terms.pdf" target="_blank" rel="noopener noreferrer">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
        <div className="separator" />
        <p className="copyright">CFL art services • Copyright © 2025 All Rights Reserved</p>
      </div>
    </>
  );
};

export default Layout;
