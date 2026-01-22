import { useNavigate, useParams } from "react-router-dom";
import Button from "../../UI/Button/Button";
import { useState, useEffect } from "react";
import CourseListService from "../../../services/CoursesListService";
import AuthService from "../../../services/AuthService";
import Spinner from "../../UI/Spinner/Spinner";
import "./CourseEnroll.css";
import EnrollService from "../../../services/EnrollService";
import { useAuth, useEnrollments } from "../../../hooks";

export default function CourseEnroll() {

  const { user } = useAuth()

  const [course, setCourse] = useState(null);
  const params = useParams();
  const courseId = params.courseId;
  const [author, setAuthor] = useState(null);
  const [enrolled, setEnrolled] = useState(false) 
  const [enrollments, checkEnrollment] = useEnrollments(courseId);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCourse = async (courseId) => {
      const data = await CourseListService.getCourse(courseId);
      setCourse(data);
    };
    fetchCourse(courseId);
  }, [courseId]);

  useEffect(() => {
    console.log("Fetching author");
    if (!course) return;
    console.log(course.author);
    AuthService.getUser(course.author).then((authorData) =>
      setAuthor(authorData),
    );
  }, [course]);

  useEffect(() => {
    if (!user || !course) return;
    checkEnrollment(user.id, course.id).then((res) => setEnrolled(res));
  }, [course, user]);

  const enroll = async (userId, courseId) => {

    try {
      const enrollments = await EnrollService.getEnrollmentsByUser(userId)
      const isEnrolled = enrollments.some(
        enrollment => enrollment.course === courseId
      );
      if(isEnrolled) {
        navigate("/dashboard")
      } else {
        try {
          await EnrollService.enroll(userId, courseId);
          console.log("enrolled");
          navigate("/dashboard")
        } catch (err) {
          console.log(err.message);
        }
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  if (!author || !course || !user) {
    return <Spinner />;
  }

  console.log(course)

  return (
    <div className="course-enroll-page">
      <div className="enroll-container">
        <h1 className="course-title">{course.name}</h1>
        <p className="course-description">{course.description}</p>
        <div className="course-instructors-list">
          <p>Instructor: </p>
          <p className="instructor">
            <img
              className="instructor-avatar"
              src={author.profile.avatar_base64}
              alt="avatar-icon"
            />{" "}
            <span>{author.user.username}</span>
          </p>
        </div>
        <Button
          onClick={() => enroll(user.id, course.id)}
          className="enroll-btn"
        >
          {enrolled ? "Go to dashboard" : "Enroll now"}
        </Button>
        <p className="already-enrolled">{enrollments} already enrolled</p>
      </div>
      <img src={"/" + course.image_base64} className="course-img"/>
      <div className="detailed-info-container">
        {/* <p> {} Lessons </p>
        <p> {} Level </p>
        <p> {} Created at </p> */}
      </div>
    </div>
  );
}
