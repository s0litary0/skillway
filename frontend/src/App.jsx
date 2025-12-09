import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Registration from "./components/pages/Registration/Registration.jsx";
import Login from "./components/pages/Login/Login.jsx";
import Home from "./components/pages/Home/Home.jsx"
import Profile from "./components/pages/Profile/Profile.jsx"
import Nav from "./components/layouts/Nav/Nav.jsx";


const App = () => {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
