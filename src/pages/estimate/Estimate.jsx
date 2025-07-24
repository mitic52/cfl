import { Input } from "@heroui/input";
import { RadioGroup, Radio } from "@heroui/radio";
import { DatePicker } from "@heroui/date-picker";
import { TimeInput } from "@heroui/date-input";
import { Time } from "@internationalized/date";
import { CheckboxGroup, Checkbox } from "@heroui/react";
import { Select, SelectSection, SelectItem } from "@heroui/select";
import { Textarea } from "@heroui/input";
import plus from "../../assets/icons/plus.svg";
import airplane from "../../assets/icons/airplane.svg";
import "./style.scss";
import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";

const typeofart = [
  { key: "painting", label: "Painting" },
  { key: "sculpture", label: "Sculpture" },
  { key: "furniture", label: "Furniture" },
  { key: "antiques", label: "Antiques" },
  { key: "other", label: "Other" },
];
const medium = [
  { key: "marble", label: "Marble" },
  { key: "plastic", label: "Plastic" },
  { key: "bronze", label: "Bronze" },
  { key: "wood", label: "Wood" },
  { key: "other", label: "Other" },
];

const showEstimateError = (text) => {
  const errorElement = document.querySelector(".error-estimate");
  errorElement.innerHTML = `${text}`;
  errorElement.style.display = "block";
  setTimeout(() => {
    errorElement.style.display = "none";
  }, 2500);
};

const calculateEstimate = () => {
  const inventoryElements = document.querySelectorAll(".inventory-wrap");

  if (inventoryElements.length === 0) {
    showEstimateError("There are no items to estimate. Please add at least one inventory item.");
    return;
  }

  const data = [];
  let totalWeight = 0;
  let totalVolume = 0;
  let totalItems = 0;

  for (const el of inventoryElements) {
    const selects = el.querySelectorAll("select");
    const inputs = el.querySelectorAll("input");

    const type = selects[0]?.value;
    const medium = selects[1]?.value;

    const quantity = parseInt(inputs[0]?.value);
    const width = parseFloat(inputs[1]?.value);
    const length = parseFloat(inputs[2]?.value);
    const height = parseFloat(inputs[3]?.value);
    const weight = parseFloat(inputs[4]?.value);

    if (!type || !medium || isNaN(quantity) || isNaN(width) || isNaN(length) || isNaN(height) || isNaN(weight)) {
      showEstimateError("Please fill out all required inventory fields.");
      return;
    }

    if (quantity <= 0) continue;

    const volume = width * length * height * quantity;
    const totalItemWeight = weight * quantity;

    totalItems += quantity;
    totalWeight += totalItemWeight;
    totalVolume += volume;

    data.push([
      type.charAt(0).toUpperCase() + type.slice(1),
      medium.charAt(0).toUpperCase() + medium.slice(1),
      `x${quantity}`,
      `${width} cm`,
      `${length} cm`,
      `${height} cm`,
      `${totalItemWeight} kg`,
    ]);
  }

  if (totalItems === 0) {
    showEstimateError("Error: All inventory items have 0 quantity. Please enter at least one item with quantity.");
    return;
  }

  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text("Table of Inventory", 14, 20);

  autoTable(doc, {
    head: [["Type", "Medium", "Qnt.", "Width", "Length", "Height", "Weight"]],
    body: data,
    startY: 30,
  });

  doc.text(`Total items: ${totalItems}`, 14, doc.lastAutoTable.finalY + 10);
  doc.text(`Estimated weight: ${totalWeight} kg`, 14, doc.lastAutoTable.finalY + 20);
  doc.text(`Total volume: ${totalVolume.toLocaleString()} cubic cm`, 14, doc.lastAutoTable.finalY + 30);
  doc.text(``, 14, doc.lastAutoTable.finalY + 40);
  doc.text(`Date: ${new Date().toLocaleString()}`, 14, doc.lastAutoTable.finalY + 50);

  const pdfBlob = doc.output("blob");
  const url = URL.createObjectURL(pdfBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "CFL art services estimate.pdf";
  link.innerHTML = `Download Inventory Estimate PDF <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 2.5H6C5.46957 2.5 4.96086 2.71071 4.58579 3.08579C4.21071 3.46086 4 3.96957 4 4.5V20.5C4 21.0304 4.21071 21.5391 4.58579 21.9142C4.96086 22.2893 5.46957 22.5 6 22.5H18C18.5304 22.5 19.0391 22.2893 19.4142 21.9142C19.7893 21.5391 20 21.0304 20 20.5V7.5L15 2.5Z" stroke="#9A9A9A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14 2.5V6.5C14 7.03043 14.2107 7.53914 14.5858 7.91421C14.9609 8.28929 15.4696 8.5 16 8.5H20" stroke="#9A9A9A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
  link.style.marginTop = "1rem";
  link.style.display = "flex";

  const container = document.querySelector(".estimate-table-download-link");
  container.innerHTML = "";
  container.appendChild(link);
};

const InventoryBox = ({ onRemove }) => {
  return (
    <div className="inventory-wrap">
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <Select label="Type of art" isRequired>
          {typeofart.map((art) => (
            <SelectItem key={art.key}>{art.label}</SelectItem>
          ))}
        </Select>
        <Select label="Medium" isRequired>
          {medium.map((mediumtype) => (
            <SelectItem key={mediumtype.key}>{mediumtype.label}</SelectItem>
          ))}
        </Select>
        <Input label="Quantity" type="text" isRequired />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <Input isRequired label="Width (cm)" type="number" />
        <Input isRequired label="Length (cm)" type="number" />
        <Input isRequired label="Height (cm)" type="number" />
        <Input isRequired label="Weight (kg)" type="number" />
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <Textarea label="Description" placeholder="Enter your description" />
      </div>
      <div>
        <button className="remove-item-inventory" onClick={onRemove}>
          Remove item
        </button>
      </div>
    </div>
  );
};

const Estimate = () => {
  const [selectedTransport, setSelectedTransport] = useState("");
  const [selectedExtraStop, setSelectedExtraStop] = useState("");
  const [selectedOperatingHours, setSelectedOperatingHours] = useState("");
  const [selectedTransportInsurance, setSelectedTransportInsurance] = useState("");
  const [selectedStorageInsurance, setSelectedStorageInsurance] = useState("");
  const [inventory, setInventory] = useState([]);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    // Fixed: Added parameter 'e'
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const addComponent = () => {
    setInventory((prev) => [...prev, Date.now()]);
  };

  const removeComponent = (idToRemove) => {
    setInventory((prev) => prev.filter((id) => id !== idToRemove));
  };

  // const validateAndCollectData = () => {
  //   const formData = {
  //     customerInfo: {},
  //     transportation: {
  //       isRequired: false,
  //       pickupLocation: {},
  //       deliveryLocation: {},
  //       extraStop: {
  //         isRequired: false,
  //         location: {},
  //       },
  //       schedule: {},
  //       insurance: {},
  //     },
  //     services: [],
  //     inventory: [],
  //     storageInsurance: {},
  //     uploadedFile: null,
  //   };

  //   let firstInvalid = null;

  //   document.querySelectorAll(".input-error").forEach((el) => el.classList.remove("input-error"));

  //   const isElementVisible = (element) => {
  //     const rect = element.getBoundingClientRect();
  //     const style = window.getComputedStyle(element);
  //     return rect.width > 0 && rect.height > 0 && style.display !== "none" && style.visibility !== "hidden" && style.opacity !== "0";
  //   };

  //   const labelToKey = (label) =>
  //     label
  //       .toLowerCase()
  //       .replace(/[^a-z0-9]+/g, " ")
  //       .trim()
  //       .replace(/\s+/g, "_");

  //   const validateField = (field, section = null) => {
  //     if (field.type === "hidden" || field.type === "file" || field.type === "radio") return;
  //     if (!isElementVisible(field)) return;

  //     const wrapper = field.closest("[data-slot='base']") || field.closest(".flex") || field.parentElement;
  //     const label = wrapper?.querySelector("label")?.textContent?.trim();
  //     const isRequired =
  //       field.hasAttribute("required") || field.getAttribute("aria-required") === "true" || wrapper?.querySelector("[aria-required='true']");

  //     if (isRequired && !field.value.trim()) {
  //       field.classList.add("input-error");
  //       if (!firstInvalid) firstInvalid = field;
  //       return false;
  //     } else if (field.value.trim() && label) {
  //       const key = labelToKey(label);
  //       if (section) section[key] = field.value.trim();
  //     }

  //     return true;
  //   };

  //   const getAllRadioSelections = (container, targetObject) => {
  //     const groups = container.querySelectorAll('[role="radiogroup"]');
  //     groups.forEach((group) => {
  //       const legend = group.querySelector("legend")?.textContent?.trim();
  //       const selected = group.querySelector('input[type="radio"]:checked');
  //       if (legend && selected) {
  //         const key = labelToKey(legend);
  //         targetObject[key] = selected.value;
  //       }
  //     });
  //   };

  //   // Customer Info
  //   const customerSection = document.querySelector(".customer-info-title").parentElement;
  //   const customerInputs = customerSection.querySelectorAll('input[type="text"], input[type="email"]');
  //   customerInputs.forEach((input) => {
  //     if (input.closest(".transport-wrapper")) return;
  //     validateField(input, formData.customerInfo);
  //   });
  //   getAllRadioSelections(customerSection, formData.customerInfo);

  //   // Transport radio
  //   const transportRadioGroup = document.querySelector('[role="radiogroup"]');
  //   if (transportRadioGroup) {
  //     const selected = transportRadioGroup.querySelector('input[type="radio"]:checked');
  //     if (selected) formData.transportation.isRequired = selected.value === "true";
  //   }

  //   if (formData.transportation.isRequired) {
  //     const transportWrapper = document.querySelector(".transport-wrapper");

  //     // Pickup
  //     const pickupSection = transportWrapper.querySelector(".pickup-title");
  //     if (pickupSection) {
  //       let current = pickupSection.nextElementSibling;
  //       const inputs = [];
  //       while (current && !current.classList.contains("separator")) {
  //         if (current.tagName === "DIV" && current.classList.contains("flex")) inputs.push(...current.querySelectorAll("input"));
  //         current = current.nextElementSibling;
  //       }
  //       inputs.forEach((input) => validateField(input, formData.transportation.pickupLocation));
  //       getAllRadioSelections(pickupSection.parentElement, formData.transportation.pickupLocation);
  //     }

  //     // Delivery
  //     const deliveryTitles = transportWrapper.querySelectorAll(".pickup-title");
  //     const deliverySection = deliveryTitles[1];
  //     if (deliverySection) {
  //       let current = deliverySection.nextElementSibling;
  //       const inputs = [];
  //       while (current && !current.classList.contains("separator")) {
  //         if (current.tagName === "DIV" && current.classList.contains("flex")) inputs.push(...current.querySelectorAll("input"));
  //         current = current.nextElementSibling;
  //       }
  //       inputs.forEach((input) => validateField(input, formData.transportation.deliveryLocation));
  //       getAllRadioSelections(deliverySection.parentElement, formData.transportation.deliveryLocation);
  //     }

  //     // Extra stop
  //     const stopGroup = [...transportWrapper.querySelectorAll('[role="radiogroup"]')].find((group) =>
  //       group.querySelector("legend")?.textContent?.toLowerCase().includes("other stops")
  //     );
  //     if (stopGroup) {
  //       const selected = stopGroup.querySelector('input[type="radio"]:checked');
  //       if (selected?.value === "true") {
  //         formData.transportation.extraStop.isRequired = true;
  //         const stopSection = document.querySelector(".extra-stop");
  //         const inputs = stopSection.querySelectorAll("input");
  //         inputs.forEach((input) => validateField(input, formData.transportation.extraStop.location));
  //         getAllRadioSelections(stopSection, formData.transportation.extraStop.location);
  //       }
  //     }

  //     // Schedule
  //     const dateInputs = transportWrapper.querySelectorAll('input[type="date"], input[aria-label*="date"]');
  //     dateInputs.forEach((input) => {
  //       if (isElementVisible(input)) {
  //         const label = input.closest("[data-slot='base']")?.querySelector("label")?.textContent?.trim();
  //         if (label) formData.transportation.schedule[labelToKey(label)] = input.value;
  //       }
  //     });

  //     const timeInputs = transportWrapper.querySelectorAll('input[type="time"], input[aria-label*="time"]');
  //     timeInputs.forEach((input, index) => {
  //       if (!formData.transportation.schedule.operatingHours) formData.transportation.schedule.operatingHours = {};
  //       if (index === 0) formData.transportation.schedule.operatingHours.start = input.value;
  //       else formData.transportation.schedule.operatingHours.end = input.value;
  //     });

  //     // Transit insurance
  //     const insuranceGroup = [...transportWrapper.querySelectorAll('[role="radiogroup"]')].find((group) =>
  //       group.querySelector("legend")?.textContent?.toLowerCase().includes("transit insurance")
  //     );
  //     if (insuranceGroup) {
  //       const selected = insuranceGroup.querySelector('input[type="radio"]:checked');
  //       if (selected) {
  //         formData.transportation.insurance.isRequired = selected.value === "true";
  //         if (formData.transportation.insurance.isRequired) {
  //           const input = transportWrapper.querySelector('input[type="number"]');
  //           if (input && isElementVisible(input)) formData.transportation.insurance.declaredValue = input.value;
  //         }
  //       }
  //     }
  //   }

  //   // Services
  //   const checkboxes = document.querySelectorAll('[role="group"] input[type="checkbox"]:checked');
  //   formData.services = Array.from(checkboxes).map((cb) => ({
  //     value: cb.value,
  //     label: cb.nextElementSibling?.textContent?.trim(),
  //   }));

  //   // Inventory
  //   const inventoryElements = document.querySelectorAll(".inventory-wrap");
  //   inventoryElements.forEach((element) => {
  //     const selects = element.querySelectorAll("select");
  //     const inputs = element.querySelectorAll("input");
  //     const textarea = element.querySelector("textarea");

  //     const inventoryItem = {
  //       type: selects[0]?.value || "",
  //       medium: selects[1]?.value || "",
  //       quantity: inputs[0]?.value || "",
  //       dimensions: {
  //         width: inputs[1]?.value || "",
  //         length: inputs[2]?.value || "",
  //         height: inputs[3]?.value || "",
  //       },
  //       weight: inputs[4]?.value || "",
  //       description: textarea?.value || "",
  //     };

  //     if (inventoryItem.type || inventoryItem.medium || inventoryItem.quantity) formData.inventory.push(inventoryItem);
  //   });

  //   // Storage insurance
  //   const allGroups = document.querySelectorAll('[role="radiogroup"]');
  //   const storageGroup = [...allGroups].find((group) => group.querySelector("legend")?.textContent?.toLowerCase().includes("storage insurance"));
  //   if (storageGroup) {
  //     const selected = storageGroup.querySelector('input[type="radio"]:checked');
  //     if (selected) {
  //       formData.storageInsurance.isRequired = selected.value === "true";
  //       if (formData.storageInsurance.isRequired) {
  //         const block = storageGroup.closest("div").parentElement.querySelector('div[style*="block"]');
  //         const input = block?.querySelector('input[type="number"]');
  //         if (input && isElementVisible(input)) formData.storageInsurance.declaredValue = input.value;
  //       }
  //     }
  //   }

  //   // File
  //   if (file) formData.uploadedFile = file;

  //   if (firstInvalid) {
  //     firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
  //     setTimeout(() => firstInvalid.focus(), 300);
  //     return null;
  //   }

  //   return formData;
  // };

  const [pickupThisIs, setPickupThisIs] = useState("");
  const [pickupTypeOfBuilding, setPickupTypeOfBuilding] = useState("");
  const [pickupLoadingDock, setPickupLoadingDock] = useState("");
  const [pickupParkingOnSide, setPickupParkingOnSide] = useState("");

  const [deliveryThisIs, setDeliveryThisIs] = useState("");
  const [deliveryTypeOfBuilding, setDeliveryTypeOfBuilding] = useState("");

  const [extrastopThisIs, setExtrastopThisIs] = useState("");
  const [extrastopTypeOfBuilding, setExtrastopTypeOfBuilding] = useState("");

  const [datePickupAvailable, setDatePickupAvailable] = useState("");
  const [dateDeadline, setDateDeadline] = useState("");

  const [startOperatingHours, setStartOperatingHours] = useState("");
  const [endOperatingHours, setEndOperatingHours] = useState("");

  const [additionalServices, setAdditionalServices] = useState("");

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Remove the data:mime;base64, prefix
        const base64 = reader.result.split(",")[1];
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const validateAndCollectData = async () => {
    const formData = {
      clientsInfo: {},
      uploadedFile: null,
    };

    formData.clientsInfo.name = document.querySelector(".client-name").querySelector("input").value;
    formData.clientsInfo.surname = document.querySelector(".client-surname").querySelector("input").value;
    formData.clientsInfo.company = document.querySelector(".client-company-org").querySelector("input").value;
    formData.clientsInfo.company = document.querySelector(".client-company-org").querySelector("input").value;
    formData.clientsInfo.streetAddress = document.querySelector(".client-street-address").querySelector("input").value;
    formData.clientsInfo.city = document.querySelector(".client-city").querySelector("input").value;
    formData.clientsInfo.state = document.querySelector(".client-state").querySelector("input").value;
    formData.clientsInfo.apt = document.querySelector(".client-apt").querySelector("input").value;
    formData.clientsInfo.zip = document.querySelector(".client-zip").querySelector("input").value;
    formData.clientsInfo.phone = document.querySelector(".client-phone").querySelector("input").value;
    formData.clientsInfo.email = document.querySelector(".client-email").querySelector("input").value;
    formData.clientsInfo.fax = document.querySelector(".client-fax").querySelector("input").value;

    formData.transportRequired = selectedTransport;

    if (selectedTransport == "true") {
      formData.transport = {};
      formData.transport.pickup = {};
      formData.transport.delivery = {};

      formData.transport.pickup.streetAddress = document.querySelector(".pickup-street-address").querySelector("input").value;
      formData.transport.pickup.city = document.querySelector(".pickup-city").querySelector("input").value;
      formData.transport.pickup.streetAddress2 = document.querySelector(".pickup-street-address-2").querySelector("input").value;
      formData.transport.pickup.state = document.querySelector(".pickup-state").querySelector("input").value;
      formData.transport.pickup.zip = document.querySelector(".pickup-zip").querySelector("input").value;
      formData.transport.pickup.thisis = pickupThisIs;
      formData.transport.pickup.typeofbuilding = pickupTypeOfBuilding;
      formData.transport.pickup.loadingdock = pickupLoadingDock;
      formData.transport.pickup.parkingonside = pickupParkingOnSide;

      formData.transport.delivery.streetAddress = document.querySelector(".delivery-street-address").querySelector("input").value;
      formData.transport.delivery.city = document.querySelector(".delivery-city").querySelector("input").value;
      formData.transport.delivery.streetAddress2 = document.querySelector(".delivery-street-address-2").querySelector("input").value;
      formData.transport.delivery.state = document.querySelector(".delivery-state").querySelector("input").value;
      formData.transport.delivery.zip = document.querySelector(".delivery-zip").querySelector("input").value;
      formData.transport.delivery.thisis = deliveryThisIs;
      formData.transport.delivery.typeofbuilding = deliveryTypeOfBuilding;

      formData.transport.extraStopRequired = selectedExtraStop;

      if (selectedExtraStop == "true") {
        formData.transport.extrastop = {};

        formData.transport.extrastop.streetAddress = document.querySelector(".extrastop-street-address").querySelector("input").value;
        formData.transport.extrastop.city = document.querySelector(".extrastop-city").querySelector("input").value;
        formData.transport.extrastop.streetAddress2 = document.querySelector(".extrastop-street-address-2").querySelector("input").value;
        formData.transport.extrastop.state = document.querySelector(".extrastop-state").querySelector("input").value;
        formData.transport.extrastop.zip = document.querySelector(".extrastop-zip").querySelector("input").value;
        formData.transport.extrastop.thisis = extrastopThisIs;
        formData.transport.extrastop.typeofbuilding = extrastopTypeOfBuilding;
      }

      formData.transport.datepickup = datePickupAvailable;
      formData.transport.datedelivery = dateDeadline;

      formData.transport.specificoperatehours = selectedOperatingHours;

      if (selectedOperatingHours) {
        formData.transport.operatinghours = {};
        console.log(startOperatingHours, endOperatingHours);
        formData.transport.operatinghours.start = startOperatingHours;
        formData.transport.operatinghours.end = endOperatingHours;
      }

      formData.transport.transitInsurance = selectedTransportInsurance;
      if (selectedTransportInsurance == "true") {
        formData.transport.declaredTransitValue = document.querySelector(".declaredvalue-transit").querySelector("input").value;
      }
    }

    formData.services = additionalServices;

    formData.inventory = [];

    const inventoryElements = document.querySelectorAll(".inventory-wrap");
    inventoryElements.forEach((element) => {
      const selects = element.querySelectorAll("select");
      const inputs = element.querySelectorAll("input");
      const textarea = element.querySelector("textarea");

      const inventoryItem = {
        type: selects[0]?.value || "",
        medium: selects[1]?.value || "",
        quantity: inputs[0]?.value || "",
        dimensions: {
          width: inputs[1]?.value || "",
          length: inputs[2]?.value || "",
          height: inputs[3]?.value || "",
        },
        weight: inputs[4]?.value || "",
        description: textarea?.value || "",
      };

      if (inventoryItem.type || inventoryItem.medium || inventoryItem.quantity) formData.inventory.push(inventoryItem);
    });

    formData.storageInsurance = selectedStorageInsurance;
    if (selectedStorageInsurance == "true") {
      formData.declaredStorageValue = document.querySelector(".declaredvalue-storage").querySelector("input").value;
    }

    let fileData = null;

    if (file) {
      const base64Content = await fileToBase64(file);
      fileData = {
        name: file.name,
        content: base64Content,
        type: file.type,
      };
    }

    try {
      document.querySelector(".submitFormBtn").style.display = "none";
      document.querySelector(".loader-circle").style.display = "block";
      setTimeout(() => {
        document.querySelector(".loader-circle").style.display = "none";
        document.querySelector(".form-submitted-text").style.display = "block";
      }, 1500);

      const requestBody = {
        data: formData,
        file: fileData,
      };

      const response = await fetch("https://cflas-app.vercel.app/estimate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();
      console.log(result);
    } catch (err) {
      console.error("Error sending form data", err);
    }
  };

  const labelToKey = (label) =>
    label
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim()
      .replace(/\s+/g, "_");

  function formatTime(hours, minutes) {
    hours = parseInt(hours, 10);
    minutes = parseInt(minutes, 10);

    const ampm = hours >= 12 ? "pm" : "am";
    let hour12 = hours % 12;
    if (hour12 === 0) hour12 = 12;

    const paddedHours = hour12.toString().padStart(2, "0");
    const paddedMinutes = minutes.toString().padStart(2, "0");

    return `${paddedHours}:${paddedMinutes} ${ampm}`;
  }

  return (
    <section>
      <div className="text-wrap-div">
        <h1>We pride ourselves in our personalized approach, so if it's easier for you, feel free to call us directly.</h1>
      </div>
      <div className="inputs-wrapper">
        <div className="innerWrap">
          <h1 className="customer-info-title">Customer's info</h1>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input label="Name" type="text" isRequired className="client-name" />
            <Input label="Surname" type="text" isRequired className="client-surname" />
          </div>
          <Input label="Company name / Organization" type="text" isRequired className="client-company-org" />
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input label="Street address" type="text" isRequired className="client-street-address" />
            <Input label="City" type="text" isRequired className="client-city" />
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input label="State" type="text" isRequired className="client-state" />
            <Input label="Apt, Room, Office (optional)" type="text" className="client-apt" />
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input label="ZIP code" type="text" isRequired className="client-zip" />
            <Input label="Phone number" type="text" isRequired className="client-phone" />
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input label="Email" type="email" isRequired className="client-email" />
            <Input label="Fax (optional)" type="text" className="client-fax" />
          </div>
          <div className="separator" />
          <RadioGroup
            label="Is there anything you need transported?"
            isRequired
            value={selectedTransport}
            onChange={(e) => setSelectedTransport(e.target.value)}
          >
            <Radio value="true">Yes</Radio>
            <Radio value="false">No</Radio>
          </RadioGroup>

          <div className="transport-wrapper" style={{ display: `${selectedTransport == "true" ? "flex" : "none"}` }}>
            <div className="separator" />
            <h1 className="pickup-title">Pick-up Location</h1>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Input label="Street address" type="text" isRequired={selectedTransport === "true"} className="pickup-street-address" />
              <Input label="City" type="text" isRequired={selectedTransport === "true"} className="pickup-city" />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Input label="Street address 2" type="text" className="pickup-street-address-2" />
              <Input label="State" type="text" isRequired={selectedTransport === "true"} className="pickup-state" />
            </div>
            <Input label="ZIP code" type="text" isRequired={selectedTransport === "true"} className="pickup-zip" />
            <RadioGroup
              label="This is a:"
              isRequired={selectedTransport === "true"}
              value={pickupThisIs}
              onChange={(e) => setPickupThisIs(e.target.value)}
            >
              <Radio value="Residence">Residence</Radio>
              <Radio value="Commercial/Office">Commercial/Office</Radio>
              <Radio value="Warehouse">Warehouse</Radio>
            </RadioGroup>
            <RadioGroup
              label="Type of building:"
              isRequired={selectedTransport === "true"}
              value={pickupTypeOfBuilding}
              onChange={(e) => setPickupTypeOfBuilding(e.target.value)}
            >
              <Radio value="Ground Floor">Ground floor</Radio>
              <Radio value="Walk Up">Walk up</Radio>
              <Radio value="Elevator">Elevator</Radio>
            </RadioGroup>
            <RadioGroup
              label="Loading dock:"
              isRequired={selectedTransport === "true"}
              value={pickupLoadingDock}
              onChange={(e) => setPickupLoadingDock(e.target.value)}
            >
              <Radio value="Yes">Yes</Radio>
              <Radio value="No">No</Radio>
            </RadioGroup>
            <RadioGroup
              label="Parking on side:"
              isRequired={selectedTransport === "true"}
              value={pickupParkingOnSide}
              onChange={(e) => setPickupParkingOnSide(e.target.value)}
            >
              <Radio value="Yes">Yes</Radio>
              <Radio value="No">No</Radio>
            </RadioGroup>
            <div className="separator" />
            <h1 className="pickup-title">Primary Delivery Location</h1>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Input label="Street address" type="text" isRequired={selectedTransport === "true"} className="delivery-street-address" />
              <Input label="City" type="text" isRequired={selectedTransport === "true"} className="delivery-city" />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Input label="Street address 2" type="text" className="delivery-street-address-2" />
              <Input label="State" type="text" isRequired={selectedTransport === "true"} className="delivery-state" />
            </div>
            <Input label="ZIP code" type="text" isRequired={selectedTransport === "true"} className="delivery-zip" />
            <RadioGroup
              label="This is a:"
              isRequired={selectedTransport === "true"}
              value={deliveryThisIs}
              onChange={(e) => setDeliveryThisIs(e.target.value)}
            >
              <Radio value="Residence">Residence</Radio>
              <Radio value="Commercial/Office">Commercial/Office</Radio>
              <Radio value="Warehouse">Warehouse</Radio>
            </RadioGroup>
            <RadioGroup
              label="Type of building:"
              isRequired={selectedTransport === "true"}
              value={deliveryTypeOfBuilding}
              onChange={(e) => setDeliveryTypeOfBuilding(e.target.value)}
            >
              <Radio value="Ground floor">Ground floor</Radio>
              <Radio value="Walk up">Walk up</Radio>
              <Radio value="Elevator">Elevator</Radio>
            </RadioGroup>
            <div className="separator" />
            <RadioGroup
              label="Are there any other stops along the way?"
              isRequired={selectedTransport === "true"}
              value={selectedExtraStop}
              onChange={(e) => setSelectedExtraStop(e.target.value)}
            >
              <Radio value="true">Yes</Radio>
              <Radio value="false">No</Radio>
            </RadioGroup>
            <div className="extra-stop" style={{ display: `${selectedExtraStop == "true" ? "flex" : "none"}` }}>
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input label="Street address" type="text" isRequired={selectedExtraStop === "true"} className="extrastop-street-address" />
                <Input label="City" type="text" isRequired={selectedExtraStop === "true"} className="extrastop-city" />
              </div>
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input label="Street address 2" type="text" className="extrastop-street-address-2" />
                <Input label="State" type="text" isRequired={selectedExtraStop === "true"} className="extrastop-state" />
              </div>
              <Input label="ZIP code" type="text" isRequired={selectedExtraStop === "true"} className="extrastop-zip" />
              <RadioGroup
                label="This is a:"
                isRequired={selectedExtraStop === "true"}
                value={extrastopThisIs}
                onChange={(e) => {
                  setExtrastopThisIs(e.target.value);
                }}
              >
                <Radio value="Residence">Residence</Radio>
                <Radio value="Commercial/Office">Commercial/Office</Radio>
                <Radio value="Warehouse">Warehouse</Radio>
              </RadioGroup>
              <RadioGroup
                label="Type of building:"
                isRequired={selectedExtraStop === "true"}
                value={extrastopTypeOfBuilding}
                onChange={(e) => {
                  setExtrastopTypeOfBuilding(e.target.value);
                }}
              >
                <Radio value="Ground floor">Ground floor</Radio>
                <Radio value="Walk up">Walk up</Radio>
                <Radio value="Elevator">Elevator</Radio>
              </RadioGroup>
            </div>
            <div className="separator" />
            <div>
              <p style={{ marginBottom: "1rem", color: "#a1a1aa" }}>When will the items be available for collection?</p>
              <DatePicker
                className="max-w-[284px]"
                label="Available date"
                isRequired={selectedTransport === "true"}
                onChange={(e) => setDatePickupAvailable(`${e.month}/${e.day}/${e.year}`)}
              />
            </div>
            <div>
              <p style={{ marginBottom: "1rem", color: "#a1a1aa" }}>Do you have a required delivery deadline? (leave empty if not)</p>
              <DatePicker className="max-w-[284px]" label="Deadline date" onChange={(e) => setDateDeadline(`${e.month}/${e.day}/${e.year}`)} />
            </div>
            <div className="separator" />
            <RadioGroup
              label="Specific operating hours"
              isRequired={selectedTransport === "true"}
              value={selectedOperatingHours}
              onChange={(e) => setSelectedOperatingHours(e.target.value)}
            >
              <Radio value="true">Yes</Radio>
              <Radio value="false">No</Radio>
            </RadioGroup>
            <div
              style={{
                display: `${selectedOperatingHours == "true" ? "flex" : "none"}`,
                justifyContent: "center",
                alignItems: "center",
                gap: ".8rem",
              }}
            >
              <TimeInput
                label="Operating hours"
                isRequired={selectedOperatingHours === "true"}
                onChange={(e) => setStartOperatingHours(formatTime(e.hour, e.minute))}
              />
              till
              <TimeInput
                label="Operating hours"
                isRequired={selectedOperatingHours === "true"}
                onChange={(e) => setEndOperatingHours(formatTime(e.hour, e.minute))}
              />
            </div>
            <div>
              <RadioGroup
                label="Would you like to purchase transit insurance?"
                value={selectedTransportInsurance}
                onChange={(e) => setSelectedTransportInsurance(e.target.value)}
                isRequired={selectedTransport === "true"}
              >
                <Radio value="true">Yes</Radio>
                <Radio value="false">No</Radio>
              </RadioGroup>
              <div style={{ marginTop: "1.2rem", display: `${selectedTransportInsurance == "true" ? "block" : "none"}` }}>
                <p style={{ marginBottom: ".75rem" }}>Could you please provide the declared value?</p>
                <Input
                  label="Declared value ($)"
                  type="number"
                  prefix="$"
                  isRequired={selectedTransportInsurance === "true"}
                  min={0}
                  className="declaredvalue-transit"
                />
              </div>
            </div>
          </div>
          <div className="separator" />
          <CheckboxGroup label="Please select the service(s) you require:" onChange={(e) => setAdditionalServices(e)}>
            <Checkbox value="Unpacking">Unpacking</Checkbox>
            <Checkbox value="Installation">Installation</Checkbox>
            <Checkbox value="Crate disposal">Crate disposal</Checkbox>
            <Checkbox value="Storage">Storage</Checkbox>
            <Checkbox value="Pedestal fabrication">Pedestal fabrication</Checkbox>
            <Checkbox value="Packing">Packing</Checkbox>
            <Checkbox value="Un-installation">Un-installation</Checkbox>
            <Checkbox value="Crating">Crating</Checkbox>
          </CheckboxGroup>
          <div className="separator" />
          <div className="inventory">
            <h1>Inventory</h1>
            <p className="description-alert">
              *Please provide a description of item. Include condition, transit orientation requirement, and any special considerations that must be
              attended by the art handlers.
            </p>
            <div className="inventory-items">
              {inventory.map((id) => (
                <InventoryBox key={id} onRemove={() => removeComponent(id)} />
              ))}
            </div>
            <button className="add-new-item" onClick={addComponent}>
              Add new item <img src={plus} />
            </button>
          </div>
          <div className="separator" />
          <div>
            <RadioGroup
              label="Would you like to purchase storage insurance?"
              value={selectedStorageInsurance}
              onChange={(e) => setSelectedStorageInsurance(e.target.value)}
              isRequired
            >
              <Radio value="true">Yes</Radio>
              <Radio value="false">No</Radio>
            </RadioGroup>
            <div style={{ marginTop: "1.2rem", display: `${selectedStorageInsurance == "true" ? "block" : "none"}` }}>
              <p style={{ marginBottom: ".75rem" }}>Could you please provide the declared value?</p>
              <Input label="Declared value ($)" type="number" prefix="$" className="declaredvalue-storage" />
            </div>
          </div>
          <div className="separator" />
          <p className="estimate-info">
            * The estimate is based on the accuracy of the information provided and any revisions will affect pricing. Our estimates are valid for 30
            days. With CFL Art Services all estimates and all services are clearly communicated. There are no unexpected charges.
          </p>
          <div className="separator" />
          <div className="files">
            <p>* Please attach any images and/or documents that provide additional details about the items included in this estimate.</p>
            <input id="file" type="file" onChange={handleFileChange} className="fileinputfield" />
          </div>
          <button className="calculate-estimate" onClick={calculateEstimate}>
            Calculate estimate
          </button>
          <p className="error-estimate"></p>
          <div className="estimate-table-download-link"></div>
          <div className="separator" />
          <div className="sendFormToMail">
            <button
              onClick={() => {
                const data = validateAndCollectData();
                if (data) {
                  console.log("All form data:", data);
                  // You can now send `data` to your backend, etc.
                }
              }}
              className="submitFormBtn"
            >
              <img src={airplane} /> Submit form
            </button>
            <div className="loader-circle">
              <Ring size="30" stroke="3.5" bgOpacity="0" speed="1.5" color="white" />
            </div>
            <p className="form-submitted-text">Your form has been submitted. You can expect a response shortly. Thank you!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Estimate;
