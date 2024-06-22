import "../styles/AccountSettings.css";

import { Link, useNavigate } from "react-router-dom";
import { checkSignedIn, getUserData, refreshCookie } from "../utils/auth";
import { useEffect, useState } from "react";

import Header from "../components/Header";

const AccountSettings = () => {
  const navigate = useNavigate();

  useEffect(() => {
    checkSignedIn(navigate);
  }, []);

  const userData = getUserData();

  const [firstName, setFirstName] = useState(userData?.name.split(" ")[0]);
  const [lastName, setLastName] = useState(userData?.name.split(" ")[1]);
  const [email, setEmail] = useState(userData?.email);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const saveChanges = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/me`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`,
          email: email,
        }),
        credentials: "include",
        mode: "cors",
      }
    );

    if (response.ok) {
      alert("Account settings saved!");
      refreshCookie();
    } else {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="account-settings">
      <Header />
      <div className="settings-container">
        <h1>Account Settings</h1>
        <div className="field">
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </div>
        <div className="field">
          <label>Last Name</label>
          <input type="text" value={lastName} onChange={handleLastNameChange} />
        </div>
        <div className="field">
          <label>Email</label>
          <input type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div className="field">
          <label>Current Membership</label>
          <input
            type="text"
            value={userData?.membership}
            readOnly
            style={{
              cursor: "not-allowed",
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>
        <div className="actions">
          <button>
            <Link
              to="/membership"
              style={{ textDecoration: "none", color: "white" }}
            >
              Change Membership
            </Link>
          </button>
          <button onClick={saveChanges}>Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
