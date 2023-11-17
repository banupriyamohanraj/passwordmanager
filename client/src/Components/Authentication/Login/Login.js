import React, { useContext } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import UserContext from "../../UserContext/UserContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";

function Login() {
  let [email, setemail] = useState("");
  let [password, setpassword] = useState("");

  const navigate = useNavigate();
  let userData = useContext(UserContext);

  //Login Button Action

  let Submit = async (e) => {
    e.preventDefault();

    if (email.length > 0 && password.length > 0) {
      await fetch("http://localhost:9000/user/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          userData.setuserlist(data);

          userData.setisUserloggedIn(true);

          if (data.message === "Login Sucessfull") {
            alert("Login Sucessful");
            navigate("/dashboard");
          } else {
            alert("please login");
          }
        });
    } else {
      alert("please provide the correct credentials");
    }
  };

  return (
    <>
      <Navbar />

      <div className="Login_Container m-0">
        <div className="row m-0">
          <div className="card mx-auto shadow-lg p-3 mb-5 bg-white rounded border-0">
            <div className="card-body">
              <h2 style={{ textAlign: "center" }}>USER LOGIN</h2>
              <form style={{ margin: "3px" }}>
                <div className="form-group">
                  <label for="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    required
                    onChange={(e) => {
                      setpassword(e.target.value);
                    }}
                  />
                </div>
                <div className="form-group text-center">
                  <button
                    type="submit"
                    className="btn btn-dark m-3"
                    onClick={Submit}
                  >
                    Login with masterpassword
                  </button>
                </div>
              </form>

              <h6 style={{ textAlign: "center", color: "black" }}>
                New User ?{" "}
                <Link to="/signup">
                  <button className="bg-dark text-light rounded-lg">
                    SignUp
                  </button>
                </Link>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
