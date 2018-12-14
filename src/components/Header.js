import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo right">
          Sobot
        </Link>
        <ul id="nav-mobile">
          <li>
            <Link to="/hotels">Hotels</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
