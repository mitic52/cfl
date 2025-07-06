import mainBg from "../../assets/images/art-storage/artstorageimg1.webp";
import artstorageimg1 from "../../assets/images/art-storage/artstorageimg2.webp";
import circlecheck from "../../assets/icons/circle-check2.svg";
import cctv from "../../assets/icons/cctv.svg";
import "./style.scss";

const Artstorage = () => {
  return (
    <section>
      <div className="hero-art-storage">
        <div className="bg-wrapper">
          <img className="background" src={mainBg} />
        </div>
        <div className="text-wrapper">
          <h1>
            Safeguard art.
            <br />
            Maintain charm.
          </h1>
          <p>Our expert storage ensures every artwork is preserved in pristine condition, maintaining its cultural and financial value over time.</p>
        </div>
      </div>
      <div className="about-storage">
        <div className="wrap">
          <img src={artstorageimg1} />
          <div className="texts">
            <h1 className="title">Art storage</h1>
            <p className="description">
              Located just minutes from JFK Airport, our facility offers both secure fine art storage and a dedicated viewing space for collections.
              Designed with top-tier security in mind, the warehouse is monitored 24/7 and equipped with a state-of-the-art surveillance and
              protection system. <br />
              <br />{" "}
              <span className="none-mobile">
                Our in-house team includes experienced fine art handlers and a professional registrar to ensure expert care and accurate
                documentation.{" "}
              </span>
              A custom-built digital inventory system allows clients quick and seamless access to every item in their collection. We are fully
              committed to keeping your artwork safe, secure, and always accessible.
            </p>
          </div>
        </div>
      </div>
      <div className="storage-services">
        <div className="wrap">
          <h1>Safe and secure <br className="breakpoint-mobile" /> storage includes</h1>
          <div className="table">
            <div className="col col1">
              <div className="row-wrap">
                <img src={circlecheck} />
                Secure Warehouse
              </div>
              <div className="row-wrap">
                <img src={circlecheck} />
                Easy access to your collection
              </div>
              <div className="row-wrap">
                <img src={circlecheck} />
                24-hour video surveillence
              </div>
              <div className="row-wrap">
                <img src={circlecheck} />
                Key-card access
              </div>
              <div className="row-wrap">
                <img src={circlecheck} />
                Short or Long Terms
              </div>
              <div className="row-wrap">
                <img src={circlecheck} />
                Discretion
              </div>
              <div className="row-wrap">
                <img src={circlecheck} />
                Collection/Delivery in hours
              </div>
              <div className="row-wrap">
                <img src={circlecheck} />
                Backup generator
              </div>
            </div>
            <div className="col col2">
              <div className="row-wrap">
                <img src={circlecheck} />
                Temperature control 70°± 4°
              </div>
              <div className="row-wrap">
                <img src={circlecheck} />
                Humidity control 50% RH
              </div>
              <div className="row-wrap">
                <img src={circlecheck} />
                UV filtered light
              </div>
              <div className="row-wrap">
                <img src={circlecheck} />
                Fire supperssion
              </div>
              <div className="row-wrap">
                <img src={circlecheck} />
                Integrated pest management
              </div>
              <div className="row-wrap">
                <img src={circlecheck} />
                Customized private rooms
              </div>
              <div className="row-wrap">
                <img src={circlecheck} />
                Third-party security (armed)
              </div>
              <div className="row-wrap">
                <img src={circlecheck} />
                Viewing rooms available
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="title-text-storage">
        <div className="icon-wrap">
          <img src={cctv} />
        </div>
        <h3>
          We are committed to keeping each artwork <br className="breakpoint-mobile" /> safe, secure and accessible to the client.
        </h3>
      </div>
    </section>
  );
};

export default Artstorage;
