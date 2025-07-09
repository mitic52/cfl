import mainBg from "../../assets/images/contact/contactimg1.webp";
import "./style.scss";

const Contact = () => {
  const submitEnquiry = () => {
    const inputs = document.querySelectorAll(".input-field");
    const message = document.querySelector(".enquiry").value;

    const showError = () => {
      const errel = document.querySelector(".error");
      errel.style.display = "block";
      setTimeout(() => {
        errel.style.display = "none";
      }, 3000);
    };

    Array.from(inputs).map((el) => {
      if (el.value.length === 0) {
        showError();
        return;
      }
    });

    if (message.length === 0) {
      showError();
      return;
    }

    document.querySelector(".wrap-div").style.display = "none";
    document.querySelector(".thanks-note").style.display = "block";

    const obj = {
      nameSurname: `${inputs[0].value} ${inputs[1].value}`,
      email: `${inputs[2].value}`,
      phone: `${inputs[3].value}`,
      message: `${message}`,
    };

    console.log(obj);

    fetch("https://cfsl-app.vercel.app/enquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((data) => {});
  };

  return (
    <section>
      <div className="hero-contact">
        <div className="bg-wrapper">
          <img className="background" src={mainBg} />
        </div>
        <div className="wrap-div">
          <div className="text">
            <h1>Get in Touch</h1>
            <p className="description">Contact us for a quote today. Whatever the challenge, we're here to help.</p>
            <div className="mobile-none">
              <p className="italic italic1">Monday - Friday 8am - 5pm</p>
              <p className="italic italic2">After hours and weekend services can be provided on request.</p>
            </div>
          </div>
          <div className="inputs">
            <div className="row">
              <input className="input-field" type="text" placeholder="Name" />
              <input className="input-field" type="text" placeholder="Surname" />
            </div>
            <input className="input-field" type="text" placeholder="Email address" />
            <input className="input-field" type="text" placeholder="Phone number" />
            <textarea className="enquiry" placeholder="Your enquiry"></textarea>
            <p className="error">*Fill out all fields to proceed.</p>
            <button className="submit-enquiry" onClick={submitEnquiry}>
              Submit
            </button>
          </div>
        </div>
        <div className="thanks-note">
          <h1>Thanks for your submission.</h1>
          <p>We'll reply as soon as possible.</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
