import backgroundImage from "../../assets/images/home/homebg.webp";
import carryMan from "../../assets/icons/home-carry.svg";
import serviceimg1 from "../../assets/images/home/homeimg2.webp";
import serviceimg2 from "../../assets/images/home/homeimg3.webp";
import transportBg from "../../assets/images/home/homeimg4.webp";
import transportBgMobile from "../../assets/images/home/homeimg4-mobile.webp";
import truck from "../../assets/icons/truck.svg";
import plane from "../../assets/icons/plane.svg";
import ship from "../../assets/icons/ship.svg";
import packingBg from "../../assets/images/home/homeimg5.webp";
import arrowright from "../../assets/icons/arrow.svg";
import circlecheck from "../../assets/icons/circle-check.svg";
import contactBg from "../../assets/images/home/homeimg6.webp";
import send from "../../assets/icons/send.svg";
import "./style.scss";

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section>
      <div className="hero">
        <div className="bg-wrapper">
          <img className="background" src={backgroundImage} />
        </div>
        <div className="text-wrapper">
          <h1>
            Guardians of Art.
            <br />
            Architects of Movement.
          </h1>
          <p>Bespoke Solutions in Fine Art Logistics, Collection Care & Global Handling — Crafted for the Irreplaceable</p>
          <Link to="/free-estimate">
            <button>Free estimate</button>
          </Link>
        </div>
      </div>
      <div className="our-mission">
        <img className="icon" src={carryMan} />
        <h2 className="text">
          We specialize in expertly handling and installing artworks of all sizes, from a single piece in a home to large-scale sculptures in public
          spaces. With deep technical experience, our team ensures safe, precise placement—indoors or out. We offer exhibit management, rigging,
          labeling, sculpture placement, video installations, and more. Whether using cranes, forklifts, or helicopters, we find solutions for even
          the most complex projects.
        </h2>
      </div>
      <div className="services">
        <div className="wrap wrap1">
          <img src={serviceimg1} />
          <p className="text">From paintings to monuments, we install art of any scale with precision and care.</p>
        </div>
        <div className="wrap wrap2">
          <img src={serviceimg2} />
          <p className="text">When needed, we employ cranes, forklifts, or helicopters to ensure safe placement — no matter the challenge.</p>
        </div>
      </div>
      <div className="transport">
        <div className="bg-wrapper-transport">
          <img src={transportBg} className="desktop-bg" />
          <img src={transportBgMobile} className="mobile-bg" />
        </div>
        <div className="text-wrap">
          <h1 className="main-title">We've covered everything for you.</h1>
          <div className="descriptions">
            <div className="wrap-icon-text transport-text-1">
              <img src={truck} />
              <div className="title-text title-text-1">
                <h2>Local Delivery & Road Shipping</h2>
                <p>
                  Reliable local delivery and road shipping for artworks of all sizes. We ensure safe, timely transport with expert handling, tailored
                  logistics, and specialized vehicles for every type of artwork.
                </p>
              </div>
            </div>
            <div className="wrap-icon-text transport-text-2">
              <img src={plane} />
              <div className="title-text title-text-2">
                <h2>Air Shipping</h2>
                <p>
                  Secure and efficient air shipping for valuable artworks. We provide expert packing, customs handling, and global logistics to ensure
                  your pieces arrive safely, on time, and in perfect condition.
                </p>
              </div>
            </div>
            <div className="wrap-icon-text transport-text-3">
              <img src={ship} />
              <div className="title-text title-text-3">
                <h2>Ocean Shipping</h2>
                <p>
                  Specialized ocean shipping for artworks with expert packing, climate control, and secure crating. We manage all logistics and
                  customs to ensure safe, stable transport across international waters.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="packing">
        <div className="wrap">
          <img src={packingBg} />
          <div className="text-wrap">
            <h1>
              Packing <br className="mobile-breakpoint" /> <span>&#38;&#8203;</span> Crating
            </h1>
            <p>
              Our expert team designs customized packing and crating solutions tailored to the unique requirements of each artwork. All crates are
              constructed from heat-treated, fumigated wood compliant with IPPC standards{" "}
              <span className="mobile-hidden">
                and lined with archival, waterproof materials to safeguard against shock, vibration, and climate fluctuations. Check out our free
                estimate tool.
              </span>
            </p>
            <Link to="/free-estimate">
              <button>
                Free estimate <img src={arrowright} />
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="storage">
        <div className="wrap">
          <h1 className="title">Art storage</h1>
          <p className="description">
            Located minutes from JFK Airport, our secure warehouse offers premier storage for fine art and valuable collections.{" "}
            <span className="mobile-hidden">
              Protected by 24-hour video surveillance, armed response security, and key-card access, the facility ensures utmost safety and
              discretion.
            </span>
          </p>
          <div className="table">
            <div className="col col1">
              <div className="row-wrap">
                <img src={circlecheck} />
                24-hour video surveillance
              </div>
              <div className="row-wrap">
                <img src={circlecheck} />
                UV-filtered light
              </div>
              <div className="row-wrap">
                <img src={circlecheck} />
                Customized private rooms
              </div>
              <div className="row-wrap">
                <img src={circlecheck} />
                Temperature control 70°± 4°
              </div>
            </div>
            <div className="col col2">
              <div className="row-wrap">
                <img src={circlecheck} />
                Humidity control 50% RH
              </div>
              <div className="row-wrap">
                <img src={circlecheck} />
                Customized private rooms
              </div>
              <div className="row-wrap">
                <img src={circlecheck} />
                Fire supperssion
              </div>
              <div className="row-wrap">
                <img src={circlecheck} />
                Integrated pest management
              </div>
            </div>
          </div>
          <Link to="/art-storage">
            <button className="view-more-benefits">
              See all benefits <img src={arrowright} />
            </button>
          </Link>
        </div>
      </div>
      <div className="contact">
        <div className="bg-wrapper">
          <img src={contactBg} />
        </div>
        <div className="text-wrap">
          <h2>Get in Touch</h2>
          <p>
            Whether you're looking for more details about our services, need personalized advice, or have specific questions, we're here to help. Our
            team will respond promptly with the information and support you need.
          </p>
          <Link to="/contact">
            <button className="contact-button">
              Make an Enquiry <img src={send} />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
