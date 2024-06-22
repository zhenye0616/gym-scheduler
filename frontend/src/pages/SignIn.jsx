import "../styles/SignIn.css";

import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        const user_data = data.user;
        document.cookie = `user_data=${JSON.stringify(
          user_data
        )}; SameSite=Lax; Secure;`;
        navigate("/");
      } else {
        const error = await response.json();
        alert("Sign in failed, please try again. Error:\n" + error);
      }
    });
  };

  return (
    <div className="signin-container">
      <h1 className="signin-title">Sign In</h1>
      <form className="signin-form" onSubmit={handleSignIn}>
        <div className="signin-input-container">
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
        <div className="signin-input-container">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span className="forgot-password">
            <a href="#">Forgot Password?</a>
          </span>
        </div>
        <button type="submit" className="signin-button">
          Sign In
        </button>
      </form>
      <span className="join">
        New here? <Link to="/signup">Join Now</Link>
      </span>
    </div>
  );
};

export default SignIn;
