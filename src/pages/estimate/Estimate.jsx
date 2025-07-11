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

  // Create PDF
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("Table of Inventory", 14, 20);

  autoTable(doc, {
    head: [["Type", "Medium", "Qnt.", "Width", "Length", "Height", "Weight"]],
    body: data,
    startY: 30,
  });

  doc.text(`Total items: ${totalItems}`, 14, doc.lastAutoTable.finalY + 10);
  doc.text(`Estimated weight: ${totalWeight} kg`, 14, doc.lastAutoTable.finalY + 20);
  doc.text(`Total volume: ${totalVolume.toLocaleString()} cubic cm`, 14, doc.lastAutoTable.finalY + 30);

  // Create download link
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

  const validateAndCollectData = () => {
    const formData = {
      customerInfo: {},
      transportation: {
        isRequired: false,
        pickupLocation: {},
        deliveryLocation: {},
        extraStop: {
          isRequired: false,
          location: {},
        },
        schedule: {},
        insurance: {},
      },
      services: [],
      inventory: [],
      storageInsurance: {},
      uploadedFile: null,
    };

    let firstInvalid = null;

    // Clear previous errors
    document.querySelectorAll(".input-error").forEach((el) => el.classList.remove("input-error"));

    // Helper function to check if element is visible
    const isElementVisible = (element) => {
      const rect = element.getBoundingClientRect();
      const style = window.getComputedStyle(element);
      return rect.width > 0 && rect.height > 0 && style.display !== "none" && style.visibility !== "hidden" && style.opacity !== "0";
    };

    // Helper function to validate and collect field data
    const validateField = (field, section = null) => {
      if (field.type === "hidden" || field.type === "file" || field.type === "radio") return;
      if (!isElementVisible(field)) return;

      const wrapper = field.closest("[data-slot='base']") || field.closest(".flex") || field.parentElement;
      const label = wrapper?.querySelector("label")?.textContent?.trim();
      const isRequired =
        field.hasAttribute("required") || field.getAttribute("aria-required") === "true" || wrapper?.querySelector("[aria-required='true']");

      if (isRequired && !field.value.trim()) {
        field.classList.add("input-error");
        if (!firstInvalid) firstInvalid = field;
        return false;
      } else if (field.value.trim() && label) {
        const key = labelToKey(label);
        if (section) {
          section[key] = field.value.trim();
        }
        return true;
      }
      return true;
    };

    // Collect Customer Info
    const customerSection = document.querySelector(".customer-info-title").parentElement;
    const customerInputs = customerSection.querySelectorAll('input[type="text"], input[type="email"]');
    customerInputs.forEach((input) => {
      if (input.closest(".transport-wrapper")) return; // Skip transport fields
      validateField(input, formData.customerInfo);
    });

    // Handle Transportation Radio Group
    const transportRadioGroup = document.querySelector('[role="radiogroup"]');
    if (transportRadioGroup) {
      const selectedTransport = transportRadioGroup.querySelector('input[type="radio"]:checked');
      if (selectedTransport) {
        formData.transportation.isRequired = selectedTransport.value === "true";
      }
    }

    // If transportation is required, collect transportation data
    if (formData.transportation.isRequired) {
      const transportWrapper = document.querySelector(".transport-wrapper");

      // Pickup Location
      const pickupSection = transportWrapper.querySelector(".pickup-title");
      if (pickupSection) {
        const pickupInputs = [];
        let currentElement = pickupSection.nextElementSibling;

        while (currentElement && !currentElement.classList.contains("separator")) {
          if (currentElement.tagName === "DIV" && currentElement.classList.contains("flex")) {
            pickupInputs.push(...currentElement.querySelectorAll("input"));
          } else if (currentElement.tagName === "INPUT") {
            pickupInputs.push(currentElement);
          } else if (currentElement.getAttribute("role") === "radiogroup") {
            const selectedRadio = currentElement.querySelector('input[type="radio"]:checked');
            if (selectedRadio) {
              const legend = currentElement.querySelector("legend");
              if (legend) {
                const key = labelToKey(legend.textContent.trim());
                formData.transportation.pickupLocation[key] = selectedRadio.value;
              }
            }
          }
          currentElement = currentElement.nextElementSibling;
        }

        pickupInputs.forEach((input) => validateField(input, formData.transportation.pickupLocation));
      }

      // Delivery Location
      const deliveryTitles = transportWrapper.querySelectorAll(".pickup-title");
      const deliverySection = deliveryTitles[1]; // Second title is delivery
      if (deliverySection) {
        const deliveryInputs = [];
        let currentElement = deliverySection.nextElementSibling;

        while (currentElement && !currentElement.classList.contains("separator")) {
          if (currentElement.tagName === "DIV" && currentElement.classList.contains("flex")) {
            deliveryInputs.push(...currentElement.querySelectorAll("input"));
          } else if (currentElement.tagName === "INPUT") {
            deliveryInputs.push(currentElement);
          } else if (currentElement.getAttribute("role") === "radiogroup") {
            const selectedRadio = currentElement.querySelector('input[type="radio"]:checked');
            if (selectedRadio) {
              const legend = currentElement.querySelector("legend");
              if (legend) {
                const key = labelToKey(legend.textContent.trim());
                formData.transportation.deliveryLocation[key] = selectedRadio.value;
              }
            }
          }
          currentElement = currentElement.nextElementSibling;
        }

        deliveryInputs.forEach((input) => validateField(input, formData.transportation.deliveryLocation));
      }

      // Extra Stop
      const extraStopRadioGroups = transportWrapper.querySelectorAll('[role="radiogroup"]');
      let extraStopRadioGroup = null;

      extraStopRadioGroups.forEach((group) => {
        const legend = group.querySelector("legend");
        if (legend && legend.textContent.toLowerCase().includes("other stops")) {
          extraStopRadioGroup = group;
        }
      });

      if (extraStopRadioGroup) {
        const selectedExtraStop = extraStopRadioGroup.querySelector('input[type="radio"]:checked');
        if (selectedExtraStop) {
          formData.transportation.extraStop.isRequired = selectedExtraStop.value === "true";

          if (formData.transportation.extraStop.isRequired) {
            const extraStopSection = document.querySelector(".extra-stop");
            if (extraStopSection && isElementVisible(extraStopSection)) {
              const extraStopInputs = extraStopSection.querySelectorAll("input");
              extraStopInputs.forEach((input) => validateField(input, formData.transportation.extraStop.location));

              const extraStopRadios = extraStopSection.querySelectorAll('[role="radiogroup"]');
              extraStopRadios.forEach((radioGroup) => {
                const selectedRadio = radioGroup.querySelector('input[type="radio"]:checked');
                if (selectedRadio) {
                  const legend = radioGroup.querySelector("legend");
                  if (legend) {
                    const key = labelToKey(legend.textContent.trim());
                    formData.transportation.extraStop.location[key] = selectedRadio.value;
                  }
                }
              });
            }
          }
        }
      }

      // Schedule (Dates and Times)
      const datePickers = transportWrapper.querySelectorAll('input[type="date"], input[aria-label*="date"], input[placeholder*="date"]');
      datePickers.forEach((dateInput) => {
        if (isElementVisible(dateInput)) {
          const wrapper = dateInput.closest("[data-slot='base']") || dateInput.parentElement;
          const label = wrapper?.querySelector("label")?.textContent?.trim();
          if (label) {
            const key = labelToKey(label);
            formData.transportation.schedule[key] = dateInput.value;
          }
        }
      });

      const timeInputs = transportWrapper.querySelectorAll('input[type="time"], input[aria-label*="time"], input[placeholder*="time"]');
      timeInputs.forEach((timeInput) => {
        if (isElementVisible(timeInput)) {
          const wrapper = timeInput.closest("[data-slot='base']") || timeInput.parentElement;
          const label = wrapper?.querySelector("label")?.textContent?.trim();
          if (label) {
            const key = labelToKey(label);
            if (!formData.transportation.schedule.operatingHours) {
              formData.transportation.schedule.operatingHours = {};
            }

            // Determine if it's start or end time based on position
            const timeContainer = timeInput.closest('div[style*="flex"]');
            const timeInputs = timeContainer?.querySelectorAll('input[type="time"]');
            const index = Array.from(timeInputs || []).indexOf(timeInput);

            if (index === 0) {
              formData.transportation.schedule.operatingHours.start = timeInput.value;
            } else if (index === 1) {
              formData.transportation.schedule.operatingHours.end = timeInput.value;
            }
          }
        }
      });

      // Transportation Insurance
      const transportRadioGroups = transportWrapper.querySelectorAll('[role="radiogroup"]');
      let transportInsuranceRadio = null;

      transportRadioGroups.forEach((group) => {
        const legend = group.querySelector("legend");
        if (legend && legend.textContent.toLowerCase().includes("transit insurance")) {
          transportInsuranceRadio = group;
        }
      });

      if (transportInsuranceRadio) {
        const selectedInsurance = transportInsuranceRadio.querySelector('input[type="radio"]:checked');
        if (selectedInsurance) {
          formData.transportation.insurance.isRequired = selectedInsurance.value === "true";

          if (formData.transportation.insurance.isRequired) {
            const declaredValueInput = transportWrapper.querySelector('input[type="number"]');
            if (declaredValueInput && isElementVisible(declaredValueInput)) {
              formData.transportation.insurance.declaredValue = declaredValueInput.value;
            }
          }
        }
      }
    }

    // Collect Services (Checkboxes)
    const serviceCheckboxGroup = document.querySelector('[role="group"]');
    if (serviceCheckboxGroup) {
      const selectedServices = serviceCheckboxGroup.querySelectorAll('input[type="checkbox"]:checked');
      formData.services = Array.from(selectedServices).map((checkbox) => ({
        value: checkbox.value,
        label: checkbox.nextElementSibling?.textContent?.trim(),
      }));
    }

    // Collect Inventory Data
    const inventoryElements = document.querySelectorAll(".inventory-wrap");
    inventoryElements.forEach((element, index) => {
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

      // Only add if at least some fields are filled
      if (inventoryItem.type || inventoryItem.medium || inventoryItem.quantity) {
        formData.inventory.push(inventoryItem);
      }
    });

    // Storage Insurance
    const allRadioGroups = document.querySelectorAll('[role="radiogroup"]');
    let storageInsuranceRadio = null;

    allRadioGroups.forEach((group) => {
      const legend = group.querySelector("legend");
      if (legend && legend.textContent.toLowerCase().includes("storage insurance")) {
        storageInsuranceRadio = group;
      }
    });

    if (storageInsuranceRadio) {
      const selectedStorageInsurance = storageInsuranceRadio.querySelector('input[type="radio"]:checked');
      if (selectedStorageInsurance) {
        formData.storageInsurance.isRequired = selectedStorageInsurance.value === "true";

        if (formData.storageInsurance.isRequired) {
          // Find the storage insurance declared value input (should be after the storage insurance radio group)
          let currentElement = storageInsuranceRadio.nextElementSibling;
          while (currentElement) {
            const storageValueInput = currentElement.querySelector('input[type="number"]');
            if (storageValueInput && isElementVisible(storageValueInput)) {
              formData.storageInsurance.declaredValue = storageValueInput.value;
              break;
            }
            currentElement = currentElement.nextElementSibling;
          }
        }
      }
    }

    // File Upload
    if (file) {
      formData.uploadedFile = {
        name: file.name,
        size: file.size,
        type: file.type,
      };
    }

    // Scroll to first invalid field if any
    if (firstInvalid) {
      firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => {
        firstInvalid.focus();
      }, 300);
      return null;
    }

    return formData;
  };

  // Helper function remains the same
  const labelToKey = (label) =>
    label
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim()
      .replace(/\s+/g, "_");

  return (
    <section>
      <div className="text-wrap-div">
        <h1>We pride ourselves in our personalized approach, so if it's easier for you, feel free to call us directly.</h1>
      </div>
      <div className="inputs-wrapper">
        <div className="innerWrap">
          <h1 className="customer-info-title">Customer's info</h1>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input label="Name" type="text" isRequired />
            <Input label="Surname" type="text" isRequired />
          </div>
          <Input label="Company name / Organization" type="text" isRequired />
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input label="Street address" type="text" isRequired />
            <Input label="City" type="text" isRequired />
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input label="State" type="text" isRequired />
            <Input label="Apt, Room, Office (optional)" type="text" />
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input label="ZIP code" type="text" isRequired />
            <Input label="Phone number" type="text" isRequired />
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input label="Email" type="email" isRequired />
            <Input label="Fax (optional)" type="text" />
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
              <Input label="Street address" type="text" isRequired={selectedTransport === "true"} />
              <Input label="City" type="text" isRequired={selectedTransport === "true"} />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Input label="Street address 2" type="text" />
              <Input label="State" type="text" isRequired={selectedTransport === "true"} />
            </div>
            <Input label="ZIP code" type="text" isRequired={selectedTransport === "true"} />
            <RadioGroup label="This is a:" isRequired={selectedTransport === "true"}>
              <Radio value="1">Residence</Radio>
              <Radio value="2">Commercial/Office</Radio>
              <Radio value="3">Warehouse</Radio>
            </RadioGroup>
            <RadioGroup label="Type of building:" isRequired={selectedTransport === "true"}>
              <Radio value="1">Ground floor</Radio>
              <Radio value="2">Walk up</Radio>
              <Radio value="3">Elevator</Radio>
            </RadioGroup>
            <RadioGroup label="Loading dock:" isRequired={selectedTransport === "true"}>
              <Radio value="1">Yes</Radio>
              <Radio value="2">No</Radio>
            </RadioGroup>
            <RadioGroup label="Parking on side:" isRequired={selectedTransport === "true"}>
              <Radio value="1">Yes</Radio>
              <Radio value="2">No</Radio>
            </RadioGroup>
            <div className="separator" />
            <h1 className="pickup-title">Primary Delivery Location</h1>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Input label="Street address" type="text" isRequired={selectedTransport === "true"} />
              <Input label="City" type="text" isRequired={selectedTransport === "true"} />
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Input label="Street address 2" type="text" />
              <Input label="State" type="text" isRequired={selectedTransport === "true"} />
            </div>
            <Input label="ZIP code" type="text" isRequired={selectedTransport === "true"} />
            <RadioGroup label="This is a:" isRequired={selectedTransport === "true"}>
              <Radio value="1">Residence</Radio>
              <Radio value="2">Commercial/Office</Radio>
              <Radio value="3">Warehouse</Radio>
            </RadioGroup>
            <RadioGroup label="Type of building:" isRequired={selectedTransport === "true"}>
              <Radio value="1">Ground floor</Radio>
              <Radio value="2">Walk up</Radio>
              <Radio value="3">Elevator</Radio>
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
                <Input label="Street address" type="text" isRequired={selectedExtraStop === "true"} />
                <Input label="City" type="text" isRequired={selectedExtraStop === "true"} />
              </div>
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input label="Street address 2" type="text" />
                <Input label="State" type="text" isRequired={selectedExtraStop === "true"} />
              </div>
              <Input label="ZIP code" type="text" isRequired={selectedExtraStop === "true"} />
              <RadioGroup label="This is a:" isRequired={selectedExtraStop === "true"}>
                <Radio value="1">Residence</Radio>
                <Radio value="2">Commercial/Office</Radio>
                <Radio value="3">Warehouse</Radio>
              </RadioGroup>
              <RadioGroup label="Type of building:" isRequired={selectedExtraStop === "true"}>
                <Radio value="1">Ground floor</Radio>
                <Radio value="2">Walk up</Radio>
                <Radio value="3">Elevator</Radio>
              </RadioGroup>
            </div>
            <div className="separator" />
            <div>
              <p style={{ marginBottom: "1rem", color: "#a1a1aa" }}>When will the items be available for collection?</p>
              <DatePicker className="max-w-[284px]" label="Available date" isRequired={selectedTransport === "true"} />
            </div>
            <div>
              <p style={{ marginBottom: "1rem", color: "#a1a1aa" }}>Do you have a required delivery deadline? (leave empty if not)</p>
              <DatePicker className="max-w-[284px]" label="Deadline date" />
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
              <TimeInput label="Operating hours" isRequired={selectedOperatingHours === "true"} />
              till
              <TimeInput label="Operating hours" isRequired={selectedOperatingHours === "true"} />
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
                <Input label="Declared value ($)" type="number" prefix="$" isRequired={selectedTransportInsurance === "true"} />
              </div>
            </div>
          </div>
          <div className="separator" />
          <CheckboxGroup label="Please select the service(s) you require:" isRequired>
            <Checkbox value="buenos-aires">Unpacking</Checkbox>
            <Checkbox value="sydney">Installation</Checkbox>
            <Checkbox value="san-francisco">Crate disposal</Checkbox>
            <Checkbox value="london">Storage</Checkbox>
            <Checkbox value="tokyo">Pedestal fabrication</Checkbox>
            <Checkbox value="packing">Packing</Checkbox>
            <Checkbox value="uninstallaion">Un-installation</Checkbox>
            <Checkbox value="crating">Crating</Checkbox>
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
              <Input label="Declared value ($)" type="number" prefix="$" />
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
            <input id="file" type="file" onChange={handleFileChange} />
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
            >
              <img src={airplane} /> Submit form
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Estimate;
