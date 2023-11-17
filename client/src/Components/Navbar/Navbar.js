import React, { useContext } from "react";
import "./Navbar.css";
import UserContext from "../UserContext/UserContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  let userdata = useContext(UserContext);
  const navigate = useNavigate();

  let Logout = () => {
    navigate("/");
  };

  return (
    <div>
      <nav class="navbar navbar-light bg-secondary">
        <span className="navbar-brand ">
          <i className="fa fa-key" aria-hidden="true"></i> Password Manager
        </span>
        {userdata.isUserloggedIn ? (
          <form className="form-inline">
            <button
              className="btn btn-dark my-2 my-sm-0 rounded-lg"
              type="submit"
              onClick={Logout}
            >
              Logout
            </button>
          </form>
        ) : null}
      </nav>
    </div>
  );
}

export default Navbar;
