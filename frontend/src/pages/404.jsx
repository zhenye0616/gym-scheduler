import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <h2 className="not-found-title">Error 404</h2>
      <p className="not-found-text">This page could not be found</p>
      <Link to="/">
        <button>Return Home</button>
      </Link>
    </div>
  );
};

export default NotFound;
