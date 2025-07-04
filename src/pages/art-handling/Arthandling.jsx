import { useRef, useState } from "react";
import mainBg from "../../assets/images/art-handling/arthandlingimg1.webp";
import skillsimg1 from "../../assets/images/art-handling/arthandlingimg2.webp";
import skillsimg2 from "../../assets/images/art-handling/arthandlingimg3.webp";
import chevronIcon from "../../assets/icons/chevron.svg";
import handshake from "../../assets/icons/handshake.svg";
import "./style.scss";

import ScrollContainer from "react-indiana-drag-scroll";

const Arthandling = () => {
  const scrollRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDown(false);
  const handleMouseUp = () => setIsDown(false);

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section>
      <div className="hero-art-handling">
        <div className="bg-wrapper">
          <img className="background" src={mainBg} />
        </div>
        <div className="text-wrapper">
          <h1>
            Precise care always.
            <br />
            Treasures stay safe.
          </h1>
          <p>With meticulous handling and expert care, we ensure your most valuable artworks and collectibles remain secure at every step. </p>
        </div>
      </div>
      <div className="skills">
        <div className="wrap wrap1">
          <img src={skillsimg1} />
          <p>
            Our extensive technical expertise in handling works of art makes us the trusted partner for installations of any scale or complexity.
            Whether it's planning the layout of hundreds of paintings at an art fair, orchestrating the outdoor placement of a monumental sculpture,
            or executing delicate residential installations, we approach every project with precision and care.
          </p>
        </div>
        <div className="wrap wrap2">
          <img src={skillsimg2} />
          <p>
            Our highly skilled team is equipped to manage technical installations safely and appropriately, adapting to the unique requirements of
            each artwork and location. When traditional methods prove insufficient, we draw on our experience and innovative thinking to devise custom
            solutions that protect the integrity and value of every piece.
          </p>
        </div>
      </div>
      <div className="handling-services">
        <div className="wrap">
          <h1>
            We offer a range
            <br /> of installation services
          </h1>
          <div className="handling-services-list">
            <div className="wrap-list">
              <div className="chevron-icon">
                <img src={chevronIcon} />
              </div>
              <h3>Private installations</h3>
            </div>
            <div className="wrap-list">
              <div className="chevron-icon">
                <img src={chevronIcon} />
              </div>
              <h3>Corporate installations</h3>
            </div>
            <div className="wrap-list">
              <div className="chevron-icon">
                <img src={chevronIcon} />
              </div>
              <h3>Picture hanging</h3>
            </div>
            <div className="wrap-list">
              <div className="chevron-icon">
                <img src={chevronIcon} />
              </div>
              <h3>Sculpture placement (indoor/outdoor)</h3>
            </div>
            <div className="wrap-list">
              <div className="chevron-icon">
                <img src={chevronIcon} />
              </div>
              <h3>Antique mirror installations</h3>
            </div>
            <div className="wrap-list">
              <div className="chevron-icon">
                <img src={chevronIcon} />
              </div>
              <h3>Condition reports</h3>
            </div>
            <div className="wrap-list">
              <div className="chevron-icon">
                <img src={chevronIcon} />
              </div>
              <h3>Assembly</h3>
            </div>
            <div className="wrap-list">
              <div className="chevron-icon">
                <img src={chevronIcon} />
              </div>
              <h3>Neon and video installations</h3>
            </div>
            <div className="wrap-list">
              <div className="chevron-icon">
                <img src={chevronIcon} />
              </div>
              <h3>Exhibit management</h3>
            </div>
            <div className="wrap-list">
              <div className="chevron-icon">
                <img src={chevronIcon} />
              </div>
              <h3>Crews of all sizes</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="other-handling-services">
        <div className="wrap">
          <h1>Our additional <br className="breakpoint-mobile"/> services include</h1>
          <ScrollContainer className="scroll-container">
            <div
              className="elements"
              ref={scrollRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
              <div className="service">
                <h2 className="title-service">Residential Art Installations</h2>
                <p className="description">Whether it's a single piece or an entire collection, we handle installations with precision and care.</p>
              </div>
              <div className="service">
                <h2 className="title-service">Corporate Art Installations & Relocations</h2>
                <p className="description">Tailored solutions for office environments, including safe transport and placement</p>
              </div>
              <div className="service">
                <h2 className="title-service">Custom Installation Solutions</h2>
                <p className="description">Expert handling of complex or challenging installation scenarios.</p>
              </div>
              <div className="service">
                <h2 className="title-service">Professional Rigging Services</h2>
                <p className="description">Competent rigging for indoor, outdoor, and public spaces.</p>
              </div>
              <div className="service">
                <h2 className="title-service">Sculpture Installations</h2>
                <p className="description">Including custom fabrication of pedestals, supports, and specialized mounting hardware.</p>
              </div>
            </div>
          </ScrollContainer>
          {/* <div className="container">
          </div> */}
        </div>
      </div>
      <div className="title-text-1">
        <div className="icon-wrap">
          <img src={handshake} />
        </div>
        <h3>
          We strive to meet the needs of every <br className="breakpoint-mobile" /> client, always at a competitive price.
        </h3>
      </div>
    </section>
  );
};

export default Arthandling;
