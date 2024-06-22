import "../styles/ManageRentals.css";

import { useEffect, useState } from "react";

import Input from "./Input";

const ManageRentals = () => {
  const [equipment, setEquipment] = useState();
  const [equipmentRentals, setEquipmentRentals] = useState();

  const refreshEquipment = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/equipment`).then(
      async (response) => {
        if (response.ok) {
          const e = await response.json();
          setEquipment(e);
        }
      }
    );
  };

  const refreshRentals = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/equipment/rentals`).then(
      async (response) => {
        if (response.ok) {
          const r = await response.json();
          setEquipmentRentals(r);
        }
      }
    );
  };

  const updateEquipment = (id, stock) => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/equipment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, stock }),
    }).then(() => {
      refreshEquipment();
    });
  };

  useEffect(() => {
    refreshEquipment();
    refreshRentals();
  }, []);

  const filterEquipment = (equipment_list) =>
    equipment_list.filter((e) =>
      e[1].toLowerCase().includes(search.toLowerCase())
    );

  const [search, setSearch] = useState("");

  const handleIncrement = (id) => {
    const equipmentItem = equipment.find((e) => e[0] === id);
    const stock = equipmentItem[2] + 1;
    updateEquipment(id, stock);
  };

  const handleDecrement = (id) => {
    const equipmentItem = equipment.find((e) => e[0] === id);
    const stock = equipmentItem[2] - 1;

    if (stock < 0) return;

    updateEquipment(id, stock);
  };

  return (
    <div className="manage-equipment-container">
      <h1>Manage Equipment</h1>
      <Input
        className="rental-search"
        label="Search"
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "600px" }}
      />
      <h2>Active Rentals</h2>
      <div className="equipment-rentals">
        <div className="equipment-list-label">
          <p>Item</p>
          <p>Quantity</p>
          <p>User</p>
          <p>Return Item</p>
        </div>
        {!equipmentRentals && <p>Loading...</p>}
        {equipmentRentals &&
          filterEquipment(equipmentRentals).map(
            ([id, name, quantity, user]) => (
              <div key={id} className="equipment-item-container">
                <div className="equipment-item">
                  <p className="equipment-name">{name}</p>
                  <p>{quantity}</p>
                  <p>{user}</p>
                  <div>
                    <button
                      className="return-button"
                      onClick={() => {
                        fetch(
                          `${
                            import.meta.env.VITE_BACKEND_URL
                          }/equipment/rentals`,
                          {
                            method: "DELETE",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ id, user }),
                          }
                        ).then(() => {
                          refreshRentals();
                          refreshEquipment();
                        });
                      }}
                    >
                      Return
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
      </div>
      <h2>Equipment Stock</h2>
      <div className="equipment-list">
        <div className="equipment-list-label">
          <p>ID</p>
          <p>Name</p>
          <p>Total Stock</p>
          <p>Available</p>
        </div>
        {!equipment && <p>Loading...</p>}
        {equipment &&
          filterEquipment(equipment).map(([id, name, stock, available]) => (
            <div key={id} className="equipment-item-container">
              <div className="equipment-item">
                <p className="equipment-id">{id}</p>
                <p className="equipment-name">{name}</p>
                <div className="equipment-stock">
                  <button onClick={() => handleDecrement(id)}>-</button>
                  <span>{stock}</span>
                  <button onClick={() => handleIncrement(id)}>+</button>
                </div>
                <p
                  style={{
                    color: available > 0 ? "green" : "red",
                  }}
                >
                  {available}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ManageRentals;
