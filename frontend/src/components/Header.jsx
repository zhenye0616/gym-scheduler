import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";

const Header = () => {
  const [isHovered, setIsHovered] = useState(false);

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0px",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "black",
  };

  const buttonStyle = {
    fontSize: "16px",
    borderRadius: "60px",
    backgroundColor: isHovered ? "#1a1f2b" : "#273144",
    color: "white",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
  };

  const navigate = useNavigate();

  const signOut = () => {
    document.cookie =
      "user_data=; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax; Secure; Path=/;";
    navigate("/signin");
  };

  return (
    <div style={headerStyle} className="header">
      <h1>
        <Link to="/" style={linkStyle}>
          Gym
        </Link>
      </h1>
      <button
        style={buttonStyle}
        onClick={signOut}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        sign out
      </button>
    </div>
  );
};

export default Header;
