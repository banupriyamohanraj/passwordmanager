import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Authentication/Login/Login";
import Signup from "./Components/Authentication/Signup/Signup";
import Home from "./Components/Dashboard/Home/Home";

import { UserProvider } from "./Components/UserContext/UserContext";

function App() {
  return (
    <Router>
      <div id="wrapper">
        <UserProvider>
          <Routes>
            <Route path="/" element={<Login />} exact={true}></Route>

            <Route path="/signup" element={<Signup />} exact={true}></Route>

            <Route path="/dashboard" element={<Home />} exact={true}></Route>
          </Routes>
        </UserProvider>
      </div>
    </Router>
  );
}

export default App;
