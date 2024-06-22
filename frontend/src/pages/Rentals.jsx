import "../styles/Rentals.css";

import { useEffect, useState } from "react";

import Header from "../components/Header";
import Input from "../components/Input";
import { checkSignedIn } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const equipmentImages = {
  "Tennis Racket": (
    <svg viewBox="0 -960 960 960">
      <path d="m137-160-57-56 164-164q31-31 42.5-77.5T298-600q0-58 26-114t74-104q91-91 201-103t181 61q72 72 60 182T738-478q-48 48-104 74t-114 26q-97 0-142 11t-77 43L137-160Zm275-334q47 46 127 34t143-75q64-64 76.5-143.5T724-803q-48-48-125.5-36T456-763q-63 63-76.5 142.5T412-494ZM720-40q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113T720-40Z" />
    </svg>
  ),
  Basketball: (
    <svg viewBox="0 -960 960 960">
      <path d="M82-521q5-51 21-96.5t44-85.5q35 36 58.5 83.5T236-521H82Zm642 0q7-51 30-98t59-83q28 39 44 85t21 96H724ZM147-258q-28-39-44-84.5T82-439h154q-7 51-30.5 98T147-258Zm666 0q-36-36-59-83t-30-98h154q-5 50-21 96t-44 85ZM317-521q-8-72-39-133t-81-110q48-48 109.5-77T439-878v357H317Zm204 0v-357q71 8 132.5 37T763-764q-51 48-81.5 109.5T643-521H521ZM439-82q-72-8-133-37.5T197-197q51-48 81.5-109T317-439h122v357Zm82 0v-357h122q8 72 38.5 133.5T763-196q-48 48-109.5 77T521-82Z" />
    </svg>
  ),
  Volleyball: (
    <svg viewBox="0 -960 960 960">
      <path d="M864-592 520-791v-87q123 12 216 90.5T864-592ZM270-404v-416q39-23 82-38t89-20v375l-171 99Zm-154 89q-18-38-27-79.5T80-480q0-77 28-147.5T190-754v395l-74 44Zm176 187q-42-20-76-50t-60-68l325-188 171 99-360 207Zm189 48q-23 0-47-2.5T388-91l344-198 74 41q-57 78-142.5 123T481-80Zm364-236L520-503v-197l360 209q0 46-8 90t-27 85Z" />
    </svg>
  ),
  Football: (
    <svg viewBox="0 -960 960 960">
      <path d="M363-121q-47 5-113.5-2.5T148-148q-14-32-23.5-100T120-364l243 243Zm95-16L136-459q17-75 49.5-136.5T261-701q43-43 104.5-74.5T498-823l324 324q-16 74-47 136t-74 105q-45 44-107.5 75.5T458-137Zm-82-183 264-264-56-56-264 264 56 56Zm462-274L595-839q48-6 118 2t99 25q18 40 25 103.5t1 114.5Z" />
    </svg>
  ),
  "Soccer Ball": (
    <svg viewBox="0 -960 960 960">
      <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm200-500 54-18 16-54q-32-48-77-82.5T574-786l-54 38v56l160 112Zm-400 0 160-112v-56l-54-38q-54 17-99 51.5T210-652l16 54 54 18Zm-42 308 46-4 30-54-58-174-56-20-40 30q0 65 18 118.5T238-272Zm242 112q26 0 51-4t49-12l28-60-26-44H378l-26 44 28 60q24 8 49 12t51 4Zm-90-200h180l56-160-146-102-144 102 54 160Zm332 88q42-50 60-103.5T800-494l-40-28-56 18-58 174 30 54 46 4Z" />
    </svg>
  ),
  "Hockey Stick": (
    <svg viewBox="0 -960 960 960">
      <path d="M80-160v-120q0-17 11.5-28.5T120-320h40v160H80Zm120 0v-160h160l34-78 64 140-34 76q-5 11-15 16.5t-21 5.5H200Zm600 0v-160h40q17 0 28.5 11.5T880-280v120h-80Zm-40 0H572q-11 0-21-5.5T536-182L254-800h134l92 208 92-208h134L544-446l56 126h160v160Z" />
    </svg>
  ),
  Baseball: (
    <svg viewBox="0 -960 960 960">
      <path d="M167-231q-42-54-64.5-117.5T80-480q0-68 22.5-131.5T167-729q58 45 91 110.5T291-480q0 73-33 138.5T167-231ZM480-80q-72 0-137.5-24T223-174q69-57 108-136.5T370-480q0-90-39-169.5T223-786q54-46 119.5-70T480-880q72 0 137.5 24T737-786q-69 57-108 136.5T590-480q0 90 39 169.5T737-174q-54 46-119.5 70T480-80Zm313-151q-58-45-91-110.5T669-480q0-73 33-138.5T793-729q42 54 64.5 117.5T880-480q0 68-22.5 131.5T793-231Z" />
    </svg>
  ),
};

const Rentals = () => {
  const navigate = useNavigate();

  useEffect(() => {
    checkSignedIn(navigate);
  }, []);

  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [equipment, setEquipment] = useState();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/equipment`).then(
      async (response) => {
        if (response.ok) {
          const e = await response.json();
          setEquipment(e);
        }
      }
    );
  }, []);

  const filterEquipment = (equipment_list) =>
    equipment_list.filter((e) =>
      e[1].toLowerCase().includes(search.toLowerCase())
    );

  const handleItemClick = (eName) => {
    if (equipment.find((e) => e[1] === eName)[3] <= 0) {
      alert("This item is not available.");
      return;
    }

    setSelectedItem(eName);
    setShowConfirmation(true);
  };

  const handleConfirmClose = () => {
    setShowConfirmation(false);
  };

  const handleConfirmClick = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/equipment/checkout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          equipment_id: equipment.filter((e) => e[1] === selectedItem)[0][0],
          quantity: selectedQuantity,
        }),
        credentials: "include",
        mode: "cors",
      }
    );

    if (response.ok) {
      alert("Equipment reserved!");
      setShowConfirmation(false);
      updateEquipmentList();
    } else {
      alert("An error occurred. Please try again.");
    }
  };

  const updateEquipmentList = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/equipment`).then(
      async (response) => {
        if (response.ok) {
          const e = await response.json();
          setEquipment(e);
        }
      }
    );
  };

  return (
    <div className="equipment-rentals">
      <Header />
      <h2 className="title">Rent Equipment</h2>
      <Input
        className="rental-search"
        label="Search"
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="rental-list">
        {!equipment && <p>Loading...</p>}
        {equipment &&
          filterEquipment(equipment).map((e) => (
            <div key={e[0]} onClick={() => handleItemClick(e[1])}>
              <h3>{e[1]}</h3>
              {equipmentImages[e[1]]}
              <p
                className="stock"
                style={{
                  color: e[3] > 0 ? "blue" : "gray",
                }}
              >
                {e[3] > 0 ? "Available Now" : "Not Available"}
              </p>
              <p
                className="stock-amount"
                style={{
                  color: e[3] > 0 ? "green" : "gray",
                }}
              >
                In Stock: {e[3]}
              </p>
            </div>
          ))}
      </div>
      {showConfirmation && (
        <div className="rental-confirmation">
          <svg
            onClick={handleConfirmClose}
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="20"
            height="20"
            viewBox="0 0 32 32"
          >
            <path d="M 16 3 C 8.832031 3 3 8.832031 3 16 C 3 23.167969 8.832031 29 16 29 C 23.167969 29 29 23.167969 29 16 C 29 8.832031 23.167969 3 16 3 Z M 16 5 C 22.085938 5 27 9.914063 27 16 C 27 22.085938 22.085938 27 16 27 C 9.914063 27 5 22.085938 5 16 C 5 9.914063 9.914063 5 16 5 Z M 12.21875 10.78125 L 10.78125 12.21875 L 14.5625 16 L 10.78125 19.78125 L 12.21875 21.21875 L 16 17.4375 L 19.78125 21.21875 L 21.21875 19.78125 L 17.4375 16 L 21.21875 12.21875 L 19.78125 10.78125 L 16 14.5625 Z"></path>
          </svg>
          <h3>Selected Item: {selectedItem}</h3>
          <div>
            <label htmlFor="quan">Quantity: </label>
            <input
              type="number"
              id="quan"
              min={1}
              max={equipment.filter((e) => e[1] === selectedItem)[0][3]}
              value={selectedQuantity}
              onChange={(e) => setSelectedQuantity(e.target.value)}
            />
          </div>
          <button onClick={handleConfirmClick}>Reserve</button>
        </div>
      )}
    </div>
  );
};

export default Rentals;
