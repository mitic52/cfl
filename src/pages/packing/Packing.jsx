import mainBg from "../../assets/images/packing/packingimg1.webp";
import globe from "../../assets/icons/globe.svg";
import fire from "../../assets/icons/fire.svg";
import droplets from "../../assets/icons/droplets.svg";
import grip from "../../assets/icons/grip.svg";
import crate from "../../assets/images/packing/packingimg2.webp";
import dotlist from "../../assets/icons/list.svg";
import arrow from "../../assets/icons/arrow.svg";
import { Link } from "react-router-dom";
import "./style.scss";

const Packing = () => {
  return (
    <section>
      <div className="hero-art-packing">
        <div className="bg-wrapper">
          <img className="background" src={mainBg} />
        </div>
        <div className="text-wrapper">
          <h1>
            Packing protects.
            <br />
            Crating secures.
          </h1>
          <p>
            We use premium materials and proven techniques to provide maximum protection, ensuring every shipment arrives safely and securely, no
            matter the distance.
          </p>
        </div>
      </div>
      <div className="text-title-wrap-packing">
        <div className="wrap">
          <h1>
            Packing <span>&</span> Crating
          </h1>
          <p>
            Experienced specialists design tailored packing and crating systems to suit the specific needs of each artwork. The facility fabricates
            custom crates, travel frames, slat crates, and high-end museum-quality shipping containers. <br />
            <br /> Highly skilled fine art technicians carefully pack every item, guaranteeing secure handling throughout its time in care. Options
            include museum-quality travel crates, single-use shipping crates, and soft packing solutions for objects of all shapes and sizes. <br />
            <br /> Crates are constructed from fumigated wood, offering full cushioning against shock and vibration. Interiors are lined to prevent
            friction damage and sealed to protect against various climate conditions.
          </p>
        </div>
      </div>
      <div className="crate-specs">
        <div className="text-wrap">
          <h1 className="title">Crate specifications</h1>
          <div className="specs-list">
            <div className="wrap">
              <div className="icon">
                <img src={globe} />
              </div>
              Full Museum to economical One-Way, Full International Travel options
            </div>
            <div className="wrap">
              <div className="icon">
                <img src={fire} />
              </div>
              Heat-treated wood material made to meet IPPC standards.
            </div>
            <div className="wrap">
              <div className="icon">
                <img src={droplets} />
              </div>
              Crafted carefully using archival and waterproof materials.
            </div>
            <div className="wrap">
              <div className="icon">
                <img src={grip} />
              </div>
              Handles are incorporated to provide easy grip.
            </div>
          </div>
        </div>
        <img className="crate-img" src={crate} />
      </div>
      <div className="crate-types">
        <h1 className="title">Type of crates we provide</h1>
        <div className="box">
          <div className="col col1">
            <div className="wrap">
              <img src={dotlist} />
              Travel Crate
            </div>
            <div className="wrap">
              <img src={dotlist} />
              Multi-Use Crate
            </div>
            <div className="wrap">
              <img src={dotlist} />
              Simple Box
            </div>
            <div className="wrap">
              <img src={dotlist} />
              Travel Frame
            </div>
            <div className="wrap">
              <img src={dotlist} />
              Slate Crate
            </div>
          </div>
          <div className="col col2">
            <div className="wrap">
              <img src={dotlist} />
              Economy Crate
            </div>
            <div className="wrap">
              <img src={dotlist} />
              Simple Collar Pack
            </div>
            <div className="wrap">
              <img src={dotlist} />
              HD Crate
            </div>
            <div className="wrap">
              <img src={dotlist} />
              Standard Crate
            </div>
            <div className="wrap">
              <img src={dotlist} />
              Museum Crate
            </div>
          </div>
        </div>
      </div>
      <div className="free-estimate-link">
        <p>Explore our tool to estimate crate weight and volume.</p>
        <Link to="/free-estimate">
          <button>
            Free estimate <img src={arrow} />
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Packing;
