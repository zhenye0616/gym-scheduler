import "../styles/SignUp.css";

import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";

const SignUp = () => {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    if (password !== cPassword) {
      alert("Passwords do not match");
      return;
    }

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${fName} ${lName}`,
        email,
        password,
      }),
    }).then(async (response) => {
      if (response.ok) {
        alert("Sign up successful!");

        const data = await response.json();
        const user_data = data.user;
        document.cookie = `user_data=${JSON.stringify(
          user_data
        )}; SameSite=Lax; Secure; Path=/;`;
        navigate("/");
      } else {
        const error = await response.json();

        alert("Sign up failed, please try again. Error:\n" + error);
      }
    });
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Sign Up</h1>
      <form className="signup-form" onSubmit={handleSignUp}>
        <div className="signup-input-group">
          <div className="signup-input-container">
            <label>First Name</label>
            <input
              name="fname"
              placeholder="Peter"
              value={fName}
              onChange={(e) => setFName(e.target.value)}
              required
            />
          </div>
          <div className="signup-input-container">
            <label>Last Name</label>
            <input
              name="lname"
              placeholder="Anteater"
              value={lName}
              onChange={(e) => setLName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="signup-input-container">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="peter_anteater@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="signup-input-container">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="signup-input-container">
          <label>Confirm Password</label>
          <input
            type="password"
            name="cpassword"
            value={cPassword}
            onChange={(e) => setCPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
      <span className="signin-label">
        Already have an account? <Link to="/signin">Sign In</Link>
      </span>
    </div>
  );
};

export default SignUp;
