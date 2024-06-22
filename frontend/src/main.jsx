import "./styles/index.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AccountSettings from "./pages/AccountSettings.jsx";
import ChangeMembership from "./pages/ChangeMembership.jsx";
import EventCalendar from "./pages/EventCalendar.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/404.jsx";
import React from "react";
import ReactDOM from "react-dom/client";
import Rentals from "./pages/Rentals.jsx";
import ScheduleSpace from "./pages/ScheduleSpace.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Staff from "./pages/Staff.jsx";

const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/settings",
    element: <AccountSettings />,
  },
  {
    path: "/membership",
    element: <ChangeMembership />,
  },
  {
    path: "/rentals",
    element: <Rentals />,
  },
  {
    path: "/schedule",
    element: <ScheduleSpace />,
  },
  {
    path: "/calendar",
    element: <EventCalendar />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/staff",
    element: <Staff />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
