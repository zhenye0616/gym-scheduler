import "react-big-calendar/lib/css/react-big-calendar.css";

import { Calendar, momentLocalizer } from "react-big-calendar";
import { useEffect, useState } from "react";

import moment from "moment";

const ManageEvents = () => {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/reservations`).then(
      async (response) => {
        if (response.ok) {
          const e = await response.json();
          setEvents(e);
        }
      }
    );
  }, []);

  const localizer = momentLocalizer(moment); // for calendar

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={
          events
            ? events.map((r) => ({
                title: r[1] + ` (${r[4]})`,
                start: new Date(r[2]),
                end: new Date(r[3]),
              }))
            : []
        }
        startAccessor="start"
        endAccessor="end"
        style={{ margin: "auto", width: "800px" }}
        defaultView="month"
      />
    </div>
  );
};

export default ManageEvents;
