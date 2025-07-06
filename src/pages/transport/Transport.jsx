import mainBg from "../../assets/images/transport/transportimg1.webp";
import transportimg1 from "../../assets/images/transport/transportimg2.webp";
import transportimg2 from "../../assets/images/transport/transportimg3.webp";
import transportimg3 from "../../assets/images/transport/transportimg4.webp";
import document from "../../assets/icons/document.svg";
import "./style.scss";

const Transport = () => {
  return (
    <section>
      <div className="hero-transport">
        <div className="bg-wrapper">
          <img className="background" src={mainBg} />
        </div>
        <div className="text-wrapper">
          <h1>
            Expert art transport.
            <br />
            Trusted logistics team.
          </h1>
          <p>Trust experts for precise art handling and safe transport. Our logistics network ensures artworks arrive perfectly worldwide.</p>
        </div>
      </div>
      <div className="info-txt">
        <p>Whether across town or across the country, we have a fine art transportation option that fits your needs! Safe and economical option.</p>
      </div>
      <div className="transport-types">
        <div className="wrap">
          <div className="type type1">
            <img src={transportimg1} />
            <div className="text">
              <h2 className="title">
                Local Delivery <br className="mobile-bpoint1" /> & Road Shipping
              </h2>
              <p className="description">
                Our fleet is designed to meet museum-quality standards, ensuring the safe and secure transport of valuable artworks. Each truck
                features air-ride suspension and climate control, maintaining ideal conditions for delicate pieces.{" "}
                <span className="mobile-short">
                  Every vehicle is staffed by two qualified technicians who are both skilled drivers and trained art handlers, capable of handling
                  packing and unpacking on-site when needed.
                </span>{" "}
                <br />
                <br />
                Our trucks are equipped with GPS tracking, alarm systems, and remote disable capability for added security. A 6' x 8' lift gate allows
                safe handling of oversized artworks. Optional transit insurance provides extra protection.{" "}
                <span className="mobile-short">
                  {" "}
                  We operate weekly shuttle services throughout the continental United States, though, to maintain strict security, we do not post our
                  shuttle schedules online.
                </span>
              </p>
            </div>
          </div>
          <div className="type type1">
            <img src={transportimg2} />
            <div className="text">
              <h2 className="title">Air Shipping</h2>
              <p className="description">
                It is always our goal to find the most efficient solutions for our clients, and whenever possible—and with your agreement—we aim to
                consolidate shipments to help reduce costs and streamline logistics.{" "}
                <span className="mobile-short">
                  {" "}
                  Consolidation services are available through many of our offices, depending on shipment volume and specific service requirements.
                </span>{" "}
                <br /> <br />{" "}
                <span className="mobile-short">
                  {" "}
                  For air transportation, we provide a seamless air freight service that covers every aspect of the process.{" "}
                </span>{" "}
                This includes careful handling, customs brokerage, and the availability of witness loading supervisors and courier escort services to
                ensure your valuable shipments are transported securely and arrive safely at their destination.
              </p>
            </div>
          </div>
          <div className="type type1">
            <img src={transportimg3} />
            <div className="text">
              <h2 className="title">Ocean Shipping</h2>
              <p className="description">
                We also offer sea transportation for monumental works, or for large collections where there is more time available and container
                shipping is suitable. This is often a more economical method of transportation than air freight. <br />
                <br /> We have relationships with established international shipping companies to offer you the most cost-effective and time-efficient
                routing options to your destination.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="customs">
        <div className="wrap">
          <div className="icon-wrap">
            <img src={document} />
          </div>
          <h1 className="title">Customs and legal procedures</h1>
          <p>
            For international shipments, we offers a complete service, taking care of any customs procedures for both import and export shipments.We
            will arrange all the necessary paperwork and, if required, supervise inspections.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Transport;
