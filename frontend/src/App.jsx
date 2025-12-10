import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Registration from "./components/pages/Registration/Registration.jsx";
import Login from "./components/pages/Login/Login.jsx";
import Home from "./components/pages/Home/Home.jsx";
import Profile from "./components/pages/Profile/Profile.jsx";
import Nav from "./components/layouts/Nav/Nav.jsx";
import Layout from "./components/layouts/Layout/Layout.jsx";
import Protected from "./components/Protected/Protected.jsx";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <Protected>
                <Profile />
              </Protected>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Protected>
                <Profile />
              </Protected>
            }
          />
          <Route
            path="/courses"
            element={
              <Protected>
                <Profile />
              </Protected>
            }
          />
          <Route
            path="/courses/:courseId/enroll"
            element={
              <Protected>
                <CourseEnroll />
              </Protected>
            }
          />
          <Route
            path="/courses/:courseId/learn"
            element={
              <Protected>
                <CourseLearn />
              </Protected>
            }
          />
          <Route
            path="/groups"
            element={
              <Protected>
                <Profile />
              </Protected>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
