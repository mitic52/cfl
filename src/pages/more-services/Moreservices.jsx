import mainBg from "../../assets/images/more-services/moreservicesimg1.webp";
import moreservicesimg1 from "../../assets/images/more-services/moreservicesimg2.webp";
import wrench from "../../assets/icons/wrench.svg";
import waves from "../../assets/icons/waves.svg";
import "./style.scss";

const Moreservices = () => {
  return (
    <section>
      <div className="hero-more-services">
        <div className="bg-wrapper">
          <img className="background" src={mainBg} />
        </div>
        <div className="text-wrapper">
          <h1>
            Always by your side.
            <br />
            Here when needed.
          </h1>
          <p>
            If you need assistance beyond the standard service, simply request extra support. Our team is always here to ensure your needs are met
            promptly and professionally.
          </p>
        </div>
      </div>
      <div className="extra-services">
        <div className="icon-wrap">
          <img src={wrench} />
        </div>
        <p>
          We are dedicated to providing comprehensive and reliable support across every stage of your logistics and art handling needs, offering a
          full range of specialized services to ensure safe, efficient, and professional care:
        </p>
        <ul>
          <li>Door to Door Logistics</li>
          <li>Air Freight and Ocean Freight</li>
          <li>Ground Transportation</li>
          <li>Free Estimates</li>
          <li>Logistics Planning</li>
          <li>US Customs Brokerage and Bonding</li>
          <li>International Presence</li>
          <li>A Network of Field Agents</li>
          <li>Shipment Tracking</li>
          <li>Consultation</li>
          <li>On-site Art Handling and Supervision</li>
          <li>Condition Reporting</li>
          <li>Coordination of Traveling Exhibitions</li>
          <li>Collection Management</li>
          <li>Insurance</li>
          <li>ATA Carnets</li>
          <li>Restoration, Framing, and Related Services</li>
          <li>On-call 24/7 Service</li>
          <li>Security screening at our TSA Certified Cargo Screening Facility</li>
          <li>Customs brokerage services</li>
          <li>Carnet, Fish & Wildlife, and CITES documentation</li>
          <li>Container packing and bracing</li>
          <li>Airport and tarmac supervision</li>
          <li>Domestic and International couriers</li>
          <li>Follow car and armed guard escorts</li>
        </ul>
      </div>
      <div className="overseas-exhibitions">
        <div className="wrap">
          <img src={moreservicesimg1} className="image" />
          <div className="texts">
            <h1 className="title">
              <img src={waves} /> Overseas exhibitions
            </h1>
            <p className="description">
              We specialize in coordinating consolidated shipments for dealers attending international exhibitions and art fairs abroad. <br />
              <br /> Our comprehensive round-trip services cover every aspect of the logistics process, including all Customs clearances, professional
              installation at the event, and careful repacking for the return journey. <br />
              <br /> By managing these complex details, we ensure a seamless and efficient experience, allowing dealers to focus on showcasing their
              artworks with confidence and ease.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Moreservices;
