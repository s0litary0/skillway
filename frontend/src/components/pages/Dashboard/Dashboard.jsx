import { useState, useEffect } from "react";
import "./Dashboard.css";
import EnrollService from "../../../services/EnrollService";
import { useAuth } from "../../../hooks";
import CourseListService from "../../../services/CoursesListService";
import Spinner from "../../UI/Spinner/Spinner";
import Block from "../../UI/Block/Block";
import Button from "../../UI/Button/Button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const fetchMyCourses = async () => {
      try {
        const enrollments = await EnrollService.getEnrollmentsByUser(user.id);

        if (!enrollments || enrollments.length === 0) {
          setMyCourses([]);
          setLoading(false);
          return;
        }

        const coursesData = await Promise.all(
          enrollments.map(async (enrollment) => {
            const course = await CourseListService.getCourse(enrollment.course);
            return { course, enrollment };
          }),
        );

        setMyCourses(coursesData);
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, [user]);

  const resume = (courseId) => {
    navigate(`/courses/${courseId}/learn`);
  };

  const dropCourse = async (enrollmentId) => {
    await EnrollService.dropCourse(enrollmentId);
    setMyCourses([]);
  };

  if (!user || loading) {
    return <Spinner />;
  }

  return (
    <div className="dashboard-page">
      <h1>{t("keep_learning")}</h1>
      {myCourses.length === 0 && <h3>{t("no_enrolled_courses")}</h3>}
      <div className="dashboard__courses-list">
        {myCourses.map(({ course, enrollment }) => (
          <Block key={course.id} className="dashboard-course-card">
            <div className="progress-container">
              <div className="progress-bar-fill" style={{ width: `${enrollment.progress}%` }}>
                <span className="progress-text">
                  {enrollment.progress}%
                </span>
              </div>
            </div>
            <div className="dashboard-course-info">
              <p>{t("course")}:</p>
              <h2>{course.name} &nbsp;&nbsp;&nbsp;&nbsp; &gt;</h2>
            </div>
            <Button className="drop-course-btn" onClick={() => dropCourse(enrollment.id)}>
              &gt; {t("drop_course")}
            </Button>
            <Button className="dashboard-resume-btn" onClick={() => resume(course.id)}>
              {t("resume")}
            </Button>
          </Block>
        ))}
      </div>
    </div>
  );
}
