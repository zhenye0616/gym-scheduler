import "../styles/ChangeMembership.css";

import { checkSignedIn, getUserData, refreshCookie } from "../utils/auth";
import { useEffect, useState } from "react";

import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const ChangeMembership = () => {
  const navigate = useNavigate();

  useEffect(() => {
    checkSignedIn(navigate);
  }, []);

  const userData = getUserData();

  const [currentPlan, setCurrentPlan] = useState(userData?.membership);

  const changeMembership = (membership) => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/membership`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        membership,
      }),
      credentials: "include",
      mode: "cors",
    }).then(async (response) => {
      if (response.ok) {
        refreshCookie();
        setCurrentPlan(membership);
        alert("Membership changed successfully!");
      } else {
        const error = await response.json();
        alert("Membership change failed. Error:\n" + error);
      }
    });
  };

  return (
    <div className="change-membership">
      <Header />
      <h2 className="title">Change My Membership</h2>
      <p className="current-plan">
        <b>Current Plan:</b> {currentPlan}
      </p>
      <div className="plan-buttons">
        <div
          className="guest"
          style={{
            border: currentPlan === "Guest" ? "3px solid black" : "none",
          }}
          onClick={() => changeMembership("Guest")}
        >
          <h3>Guest</h3>
          <p className="price">$0 / month</p>
          <p className="benefits-title">Benefits</p>
          <ul>
            <li>Limited access to gym facilities</li>
            <li>Limited access to classes</li>
          </ul>
        </div>
        <div
          className="member"
          style={{
            border: currentPlan === "Member" ? "3px solid black" : "none",
          }}
          onClick={() => changeMembership("Member")}
        >
          <h3>Member</h3>
          <p className="price">$15 / month</p>
          <p className="benefits-title">Benefits</p>
          <ul>
            <li>Full access to gym facilities</li>
            <li>Full access to classes</li>
            <li>Discounts on rentals</li>
            <li>Discounts on personal training</li>
            <li>
              <i>And all benefits from the Guest tier</i>
            </li>
          </ul>
        </div>
        <div
          className="supermember"
          style={{
            border: currentPlan === "Super Member" ? "3px solid black" : "none",
          }}
          onClick={() => changeMembership("Super Member")}
        >
          <h3>Super Member</h3>
          <p className="price">$25 / month</p>
          <p className="benefits-title">Benefits</p>
          <ul>
            <li>Priority access to gym facilities</li>
            <li>Priority access to classes</li>
            <li>Free guest passes</li>
            <li>
              <i>And all benefits from the Member tier</i>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChangeMembership;
