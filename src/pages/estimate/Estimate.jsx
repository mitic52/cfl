import { Input } from "@heroui/input";
import "./style.scss";

const Estimate = () => {
  return (
    <section>
      <div className="text-wrap-div">
        <h1>We pride ourselves in our personalized approach, so if it's easier for you, feel free to call us directly.</h1>
      </div>
      <div className="inputs-wrapper">
        <div className="innerWrap">
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input label="Name" type="text" />
            <Input label="Surname" type="text" />
          </div>
          <Input label="Company name / Organization" type="text" />
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input label="Street address" type="text" />
            <Input label="City" type="text" />
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input label="State" type="text" />
            <Input label="Apt, Room, Office (optional)" type="text" />
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input label="ZIP code" type="text" />
            <Input label="Phone number" type="text" />
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input label="Email" type="email" />
            <Input label="Fax (optional)" type="text" />
          </div>
          <div className="separator" />
          <div></div>
          <div className="separator" />
        </div>
      </div>
    </section>
  );
};

export default Estimate;
