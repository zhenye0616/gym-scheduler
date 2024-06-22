import "../styles/ScheduleSpace.css";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "../components/Header";
import { checkSignedIn } from "../utils/auth";

const spaces = {
  rooms: [
    "Multipurpose Room",
    "Cycling Room",
    "Dance Studio",
    "Martial Arts Room",
  ],
  courts: ["Volleyball", "Basketball", "Tennis", "Table Tennis", "Badminton"],
};

const ScheduleSpace = () => {
  const navigate = useNavigate();

  useEffect(() => {
    checkSignedIn(navigate);
  }, []);

  const [roomsOpen, setRoomsOpen] = useState(false);
  const [courtsOpen, setCourtsOpen] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState("");

  const handleContinue = () => {
    if (selectedSpace) {
      navigate(`/calendar?space=${selectedSpace}`);
    }
  };

  return (
    <div className="schedule-space">
      <Header />
      <h1 className="title">Scheduling</h1>
      <div className="schedule-space-container">
        <p>Reserve a...</p>
        <div className="schedule-space-options">
          <div>
            <button
              className={
                spaces.rooms.includes(selectedSpace) ? "add-border" : ""
              }
              onClick={() => setRoomsOpen(!roomsOpen)}
            >
              Room
            </button>
            {roomsOpen && (
              <div className="court-types">
                <ul>
                  {spaces.rooms.map((roomName) => (
                    <button
                      key={roomName}
                      className={selectedSpace == roomName ? "add-border" : ""}
                      onClick={() => setSelectedSpace(roomName)}
                    >
                      <li>{roomName}</li>
                    </button>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div>
            <button
              className={
                spaces.courts.includes(selectedSpace) ? "add-border" : ""
              }
              onClick={() => setCourtsOpen(!courtsOpen)}
            >
              Court
            </button>
            {courtsOpen && (
              <div className="court-types">
                <ul>
                  {spaces.courts.map((courtName) => (
                    <button
                      key={courtName}
                      className={selectedSpace == courtName ? "add-border" : ""}
                      onClick={() => setSelectedSpace(courtName)}
                    >
                      <li>{courtName}</li>
                    </button>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <Link onClick={handleContinue}>
        <button className="continue-button">Continue</button>
      </Link>
    </div>
  );
};

export default ScheduleSpace;
