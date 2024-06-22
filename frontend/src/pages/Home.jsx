import "../styles/Home.css";

import { Link, useNavigate } from "react-router-dom";
import { checkSignedIn, getUserData } from "../utils/auth";

import Header from "../components/Header";
import accountIcon from "../media/accountIcon.png";
import bg from "../media/home_background.png";
import rentalsIcon from "../media/rentalsIcon.png";
import scheduleIcon from "../media/scheduleIcon.png";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    checkSignedIn(navigate);
  }, []);
  const userData = getUserData();
  const isAdmin = userData?.admin === 1;

  return (
    <div className="home">
      <Header />
      <div className="bg-container">
        <img src={bg} className="home-bg"></img>
        <h2 className="greeting">
          Good Morning, <b>{userData?.name.split(" ")[0]}</b>
        </h2>
      </div>
      <div className="home-buttons">
        <div className="schedule">
          <img src={scheduleIcon} className="home-button-icon"></img>
          <div className="home-buttons-text-container">
            <h3>Schedule</h3>
            <p>Schedule a court or room today!</p>
            <Link to="/schedule">
              <button>select</button>
            </Link>
          </div>
        </div>

        <div className="rentals">
          <img src={rentalsIcon} className="home-button-icon"></img>
          <div className="home-buttons-text-container">
            <h3>Rentals</h3>
            <p>Rent equipment in advance</p>
            <Link to="/rentals">
              <button>select</button>
            </Link>
          </div>
        </div>

        <div className="settings">
          <img src={accountIcon} className="home-button-icon"></img>
          <div className="home-buttons-text-container">
            <h3>My Account</h3>
            <p>Update membership and personal settings</p>
            <Link to="/settings">
              <button>select</button>
            </Link>
          </div>
        </div>
      </div>
      {isAdmin && (
        <Link to="/staff">
          <svg className="admin-logo" viewBox="0 -960 960 960">
            <path d="M680-280q25 0 42.5-17.5T740-340q0-25-17.5-42.5T680-400q-25 0-42.5 17.5T620-340q0 25 17.5 42.5T680-280Zm0 120q31 0 57-14.5t42-38.5q-22-13-47-20t-52-7q-27 0-52 7t-47 20q16 24 42 38.5t57 14.5ZM480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v227q-19-8-39-14.5t-41-9.5v-147l-240-90-240 90v188q0 47 12.5 94t35 89.5Q310-290 342-254t71 60q11 32 29 61t41 52q-1 0-1.5.5t-1.5.5Zm200 0q-83 0-141.5-58.5T480-280q0-83 58.5-141.5T680-480q83 0 141.5 58.5T880-280q0 83-58.5 141.5T680-80ZM480-494Z" />
          </svg>
        </Link>
      )}
    </div>
  );
};

export default Home;
