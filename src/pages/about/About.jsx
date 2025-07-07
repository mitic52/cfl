import mainBg from "../../assets/images/about/aboutusimg1.webp";
import aboutusimg2 from "../../assets/images/about/aboutusimg2.webp";
import handling from "../../assets/icons/hand.svg";
import tools from "../../assets/icons/tools.svg";
import crate from "../../assets/icons/crate.svg";
import wind from "../../assets/icons/wind.svg";
import globe from "../../assets/icons/world.svg";
import trophy from "../../assets/icons/trophy.svg";
import "./style.scss";

const About = () => {
  return (
    <section>
      <div className="hero-about">
        <div className="bg-wrapper">
          <img className="background" src={mainBg} />
        </div>
        <div className="text-wrapper">
          <h1>
            Experienced.
            <br />
            Trusted. Discreet.
          </h1>
          <p>
            With a decade of industry experience, we provide expert art services tailored to the unique needs of collectors, galleries, and
            institutions.
          </p>
        </div>
      </div>
      <div className="company-experience">
        <h3>
          Premier full art services company. Fine art transport, storage, installation service and project management for collectors, galleries,
          museums and artists worldwide.
        </h3>
      </div>
      <div className="founded-in">
        <p>Founded in 2014. by Luc and Jenny</p>
      </div>
      <div className="stats">
        <div className="wrap">
          <div className="group group1">
            <h2>+20</h2>
            <p>Employees</p>
          </div>
          <div className="group group2">
            <h2>+100,000</h2>
            <p>Square feet facilities</p>
          </div>
        </div>
      </div>
      <div className="specializations">
        <div className="wrapper">
          <div className="wrap wrap1">
            <div className="group">
              <img src={tools} />
              Fine Art Un/Installations
            </div>
            <div className="group">
              <img src={wind} />
              Climate Controlled Storage
            </div>
          </div>
          <div className="wrap wrap2">
            <div className="group">
              <img src={handling} />
              Fine Art Handling Experts
            </div>
            <div className="group">
              <img src={crate} />
              Museum Quality Crating
            </div>
            <div className="group">
              <img src={globe} />
              World Wide Shipping
            </div>
          </div>
        </div>
      </div>
      <div className="art-value">
        <p>
          Our specialists are here to guide you on the most efficient, secure, and professional methods for storing, installing, or relocating your
          artwork.
          <br /> <br />
          With the experience and equipment to handle projects of any scale or complexity, we ensure flawless execution every time.
          <br /> <br /> <br />
          Because how your art is represented matters.
        </p>
        <img src={aboutusimg2} />
      </div>
      <div className="title-text-about">
        <div className="icon-wrap">
          <img src={trophy} />
        </div>
        <h3>
          Delivering art services
          <br className="breakpoint-mobile" /> at the highest standard.
        </h3>
      </div>
    </section>
  );
};

export default About;
