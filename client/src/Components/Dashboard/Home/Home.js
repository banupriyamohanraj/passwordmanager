import React, { useContext, useEffect } from "react";
import Addpassword from "../Addpassword/Addpassword";
import Viewpassword from "../Viewpassword/Viewpassword";
import UserContext from "../../UserContext/UserContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";

function Home() {
  let userdata = useContext(UserContext);
  let navigate = useNavigate();
  useEffect(() => {
    console.log(userdata);
    if (!userdata.isUserloggedIn) {
      return navigate("/");
    }
  });

  return (
    <>
      <Navbar />

      <div className="row p-2">
        <div className="col-2">
          <div
            className="nav flex-column nav-pills  "
            id="v-pills-tab"
            role="tablist"
            aria-orientation="vertical"
          >
            <a
              className="nav-link active "
              style={{ backgroundColor: "white ", color: "black" }}
              id="v-pills-home-tab"
              data-toggle="pill"
              href="#v-pills-home"
              role="tab"
              aria-controls="v-pills-home "
              aria-selected="true"
            >
              Home&emsp;<i className="fa fa-home" aria-hidden="true"></i>
            </a>
            <a
              className="nav-link"
              style={{ backgroundColor: "white ", color: "black" }}
              id="v-pills-profile-tab"
              data-toggle="pill"
              href="#v-pills-profile"
              role="tab"
              aria-controls="v-pills-profile"
              aria-selected="false"
            >
              Stored Passwords&emsp;
              <i className="fa fa-unlock-alt" aria-hidden="true"></i>
            </a>
          </div>
        </div>
        <div className="col-9">
          <div className="tab-content" id="v-pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="v-pills-home"
              role="tabpanel"
              aria-labelledby="v-pills-home-tab"
            >
              <Addpassword />
            </div>
            <div
              className="tab-pane fade"
              id="v-pills-profile"
              role="tabpanel"
              aria-labelledby="v-pills-profile-tab"
            >
              <Viewpassword />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
