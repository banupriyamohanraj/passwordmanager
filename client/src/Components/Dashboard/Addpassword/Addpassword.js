import React, { useContext } from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../../UserContext/UserContext";
import "./Addpassword.css";

function Addpassword() {
  let [Addbutton, setAddbutton] = useState(false);
  let [username, setUsername] = useState("");
  let [site, setSite] = useState("");
  let [sitepassword, setSitepassword] = useState("");

  let userdata = useContext(UserContext);

  let Addpassword = async (e) => {
    e.preventDefault();

    await fetch(
      `http://localhost:9000/vault/add/${userdata.userlist.user._id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          username,
          site,
          sitepassword,
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        alert(data.message);
      });
  };

  let Logout = () => {
    Navigate("/");
  };

  return (
    <div className="AddPassword_Container container-fluid">
      <div className="row m-4">
        <div className="col-lg-12 p-0">
          <div class="jumbotron jumbotron-fluid rounded-pill m-2">
            <div class="container">
              <h1
                class="display-4"
                style={{ textAlign: "center", fontWeight: "bold" }}
              >
                Password Manager
              </h1>
              <p
                class="lead"
                style={{ textAlign: "center", fontWeight: "bold" }}
              >
                Providing password managing facilities to manage all your
                passwords from one place.
              </p>
            </div>
          </div>

          <br />
          <div className="text-center">
            <button
              type="btn"
              className="btn btn-dark rounded-pill"
              onClick={() => {
                setAddbutton(true);
              }}
            >
              Add new Password <i className="fa fa-plus" aria-hidden="true"></i>
            </button>
            <div className="row">
              <div className="col-8">
                {Addbutton ? (
                  <>
                    <form className="form mt-5 ">
                      <div className="form-group row ">
                        <label
                          for="username"
                          className="col-sm-3 col-form-label"
                        >
                          Email/Username
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            className="form-control"
                            id="username"
                            onChange={(e) => setUsername(e.target.value)}
                            required={true}
                          />
                        </div>
                      </div>
                      <div className="form-group row ">
                        <label
                          for="inputwebsite"
                          className="col-sm-3 col-form-label"
                        >
                          Website
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="website"
                            className="form-control"
                            id="inputwebsite"
                            onChange={(e) => setSite(e.target.value)}
                            required={true}
                          />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label
                          for="inputpassword"
                          className="col-sm-3 col-form-label"
                        >
                          Password
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="password"
                            className="form-control"
                            id="inputpassword"
                            onChange={(e) => setSitepassword(e.target.value)}
                            required={true}
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-success "
                        onClick={Addpassword}
                      >
                        Add
                      </button>{" "}
                      &emsp;
                      <input
                        type="reset"
                        className="btn btn-warning"
                        value="reset"
                      />
                    </form>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addpassword;
