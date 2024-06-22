import "../styles/Staff.css";

import { checkSignedIn, getUserData } from "../utils/auth";
import { useEffect, useState } from "react";

import Header from "../components/Header";
import ManageEvents from "../components/ManageEvents";
import ManageRentals from "../components/ManageRentals";
import ManageUsers from "../components/ManageUsers";
import { useNavigate } from "react-router-dom";

const Staff = () => {
  const navigate = useNavigate();
  const isAdmin = getUserData().admin === 1;

  useEffect(() => {
    checkSignedIn(navigate);

    if (!isAdmin) {
      navigate("/");
    }
  }, []);

  const [activeComponent, setActiveComponent] = useState("users");

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  let componentToRender;

  switch (activeComponent) {
    case "users":
      componentToRender = <ManageUsers />;
      break;
    case "rentals":
      componentToRender = <ManageRentals />;
      break;
    case "events":
      componentToRender = <ManageEvents />;
      break;
    default:
      componentToRender = null;
  }

  return (
    <div className="staff-container">
      <Header />
      <div className="manage-container">
        <div className="staff-navigation-bar">
          <p>Manage:</p>
          <button
            className={activeComponent === "users" ? "active-button" : ""}
            onClick={() => handleComponentChange("users")}
          >
            Users
          </button>
          <button
            className={activeComponent === "rentals" ? "active-button" : ""}
            onClick={() => handleComponentChange("rentals")}
          >
            Rentals
          </button>
          <button
            className={activeComponent === "events" ? "active-button" : ""}
            onClick={() => handleComponentChange("events")}
          >
            Events
          </button>
        </div>
        <div className="manage-component-div">{componentToRender}</div>
      </div>
    </div>
  );
};

export default Staff;
