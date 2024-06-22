import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/EventCalendar.css";
import "../styles/ScheduleSpace.css";

import { Calendar, momentLocalizer } from "react-big-calendar";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Input from "../components/Input";
import { checkSignedIn } from "../utils/auth";
import moment from "moment";

const EventCalendar = () => {
  const navigate = useNavigate();

  useEffect(() => {
    checkSignedIn(navigate);
  }, []);

  const [weatherData, setWeatherData] = useState(null);
  const [existingReservations, setExistingReservations] = useState(null);

  const localizer = momentLocalizer(moment); // for calendar
  const location = useLocation();

  const [selectedSpace, setSelectedSpace] = useState("");
  const [newEvent, setNewEvent] = useState({
    date: new Date().toISOString().split("T")[0], // preset to current date
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/weather`).then(
      async (response) => {
        if (response.ok) {
          const w = await response.json();
          setWeatherData(w);
        }
      }
    );
  }, []);

  useEffect(() => {
    if (!selectedSpace) return;

    fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/reservations/${selectedSpace}`
    ).then(async (response) => {
      if (response.ok) {
        const w = await response.json();
        setExistingReservations(w);
      }
    });
  }, [selectedSpace]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const paramValue = queryParams.get("space");
    if (paramValue) {
      setSelectedSpace(paramValue);
    }
  }, [location.search]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleReserve = () => {
    const { date, startTime, endTime } = newEvent;
    console.log("Date:", date);
    console.log("Start Time:", startTime);
    console.log("End Time:", endTime);
    if (!date || !startTime || !endTime) {
      alert("Please fill in all fields");
      return;
    }

    const [year, month, day] = date.split("-");
    const start = new Date(year, month - 1, day);
    const end = new Date(year, month - 1, day);
    const [startHour, startMinute] = startTime.split(":");
    const [endHour, endMinute] = endTime.split(":");

    start.setHours(startHour, startMinute, 0, 0);
    end.setHours(endHour, endMinute, 0, 0);

    if (end <= start) {
      alert("End time must be after start time");
      return;
    }

    const newEventObj = {
      title: selectedSpace,
      start,
      end,
    };

    setNewEvent(newEventObj);

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/reservations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        space: selectedSpace,
        start_date: start.toISOString(),
        end_date: end.toISOString(),
      }),
      credentials: "include",
      mode: "cors",
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setExistingReservations(data);
        alert("Reservation successful!");
      } else {
        const error = await response.json();
        alert("Reservation failed. Error:\n" + error);
      }
    });
  };

  return (
    <div className="schedule-event">
      <Header />
      <h2>Availability for {selectedSpace}:</h2>
      {weatherData && (
        <p>
          Current Weather in {weatherData.city}:{" "}
          <b>
            {weatherData.weather},{" "}
            {Math.round(weatherData.temperature * 1.8 + 32)}°
          </b>
        </p>
      )}
      <div className="schedule-event-container">
        <div className="calendar" style={{ height: "700px", width: "1000px" }}>
          <Calendar
            localizer={localizer}
            events={
              existingReservations
                ? existingReservations.map((r) => ({
                    title: r[2],
                    start: new Date(r[3]),
                    end: new Date(r[4]),
                  }))
                : []
            }
            startAccessor="start"
            endAccessor="end"
            style={{ margin: "auto", width: "80%" }}
            defaultView="week"
          />
        </div>
        <div className="add-event">
          <h3>Reservation Details</h3>
          <div className="event-details">
            <Input
              label="Date:"
              type="date"
              name="date"
              value={newEvent.date}
              onChange={handleInputChange}
            />
            <Input
              label="Start Time:"
              type="time"
              name="startTime"
              value={newEvent.startTime}
              onChange={handleInputChange}
            />
            <Input
              label="End Time:"
              type="time"
              name="endTime"
              value={newEvent.endTime}
              onChange={handleInputChange}
            />
            <button className="reserve" onClick={handleReserve}>
              Reserve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;
