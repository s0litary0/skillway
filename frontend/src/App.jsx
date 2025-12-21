import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./i18n"; 
import Registration from "./components/pages/Registration/Registration.jsx";
import Login from "./components/pages/Login/Login.jsx";
import Home from "./components/pages/Home/Home.jsx";
import Profile from "./components/pages/Profile/Profile.jsx";
import Layout from "./components/layouts/Layout/Layout.jsx";
import Protected from "./components/Protected/Protected.jsx";
import Courses from "./components/pages/Courses/Courses.jsx";
import CourseEnroll from "./components/pages/CourseEnroll/CourseEnroll.jsx"
import CourseLearning from "./components/pages/CourseLearning/CourseLearning.jsx"
import Dashboard from "./components/pages/Dashboard/Dashboard.jsx";
import Task from "./components/pages/Task/Task.jsx";
import Leaderboard from "./components/pages/Leaderboard/Leaderboard.jsx";
import About from "./components/pages/About/About.jsx";
import Groups from "./components/pages/Groups/Groups.jsx";


const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
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
                <Dashboard />
              </Protected>
            }
          />
          <Route
            path="/courses"
            element={
              <Protected>
                <Courses />
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
                <CourseLearning />
              </Protected>
            }
          />
          <Route
            path="/courses/:courseId/learn/task/:taskId"
            element={
              <Protected>
                <Task />
              </Protected>
            }
          />
          <Route
            path="/groups"
            element={
              <Protected>
                <Groups />
              </Protected>
            }
          />
          <Route
            path="/leaderboards"
            element={
              <Protected>
                <Leaderboard />
              </Protected>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
